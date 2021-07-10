---
layout  : wiki
title   : 아이엠루트 스터디 자료 정리
summary :
date    : 2021-07-10 19:09:59 +0900
lastmod : 2021-07-10 21:52:27 +0900
tags    : [linux, kernel]
draft   : false
parent  : linux-study
---

## instruction 참고
 * http://trace32.com/wiki/index.php/B,_BL,_BX_and_BLX
 * http://egloos.zum.com/rousalome/v/9973524
 * https://casionwoo.tistory.com/25

## head.S

```
_head:
	/*
	 * DO NOT MODIFY. Image header expected by Linux boot-loaders.
	 */
#ifdef CONFIG_EFI
	/*
	 * This add instruction has no meaningful effect except that
	 * its opcode forms the magic "MZ" signature required by UEFI.
	 */
	add	x13, x18, #0x16
	b	primary_entry
#else
	b	primary_entry			// branch to kernel start, magic
	.long	0				// reserved
#endif
```

 * add 는 `op{cond}{S} Rd, Rn, Operand2`로 `add x13, x18, #0x16` 은 `x13 = x18 + 0x16` 을 의미한다.
 * 하지만 여기서는 의미가 없는 연산이고 ascii로 번역하면 MZ가 되는 내용일 뿐이다.:
   * UEFI 를 지원하면 MZ가 적혀있게 된다.
 * 실제로 실행되는 것은 다음 코드부터 동작한다.
 * b 는 branch 를 의미하며, `primary_entry` 로 분기하라는 것을 의미한다. x86에서 jump ? 랑 비슷한 느낌인듯
 * 간략하게 써보자면
   ```c
   goto primary_entry;
   ```

### primary_entry

```
SYM_CODE_START(primary_entry)
	bl	preserve_boot_args
	bl	el2_setup			// Drop to EL1, w0=cpu_boot_mode
	adrp	x23, __PHYS_OFFSET
	and	x23, x23, MIN_KIMG_ALIGN - 1	// KASLR offset, defaults to 0
	bl	set_cpu_boot_mode_flag
	bl	__create_page_tables
	/*
	 * The following calls CPU setup code, see arch/arm64/mm/proc.S for
	 * details.
	 * On return, the CPU will be ready for the MMU to be turned on and
	 * the TCR will have been set.
	 */
	bl	__cpu_setup			// initialise processor
	b	__primary_switch
SYM_CODE_END(primary_entry)
```
 * bl 은 branch with link를 의미, r14 레지스터(링크 레지스터)에 돌아올 주소(pc + 2)를 남김
 * adrp는 약자는 못찾았는데 아마 address position ? 인 것으로 추정 x23에 __PHYS_OFFSET(KERNEL_START로 선언) 의 주소를 가져옴.
   ```c
   primary_entry() {
     preserve_boot_args();
     el2_setup();
     x23 = get_address(__PHYS_OFFSET);
     x23 = x23 & (MIN_KIMG_ALIGN - 1);
     set_cpu_boot_mode_flag();
     __create_page_tables();
     __cpu_setup();
     goto __primary_switch;
   }
   ```

 * 이런 느낌으로 보면 된다. (get_address 는 내멋대로 생각하기 편하게 만든 함수이다.)

#### preserve_boot_args
```
/*
 * Preserve the arguments passed by the bootloader in x0 .. x3
 */
SYM_CODE_START_LOCAL(preserve_boot_args)
	mov	x21, x0				// x21=FDT

	adr_l	x0, boot_args			// record the contents of
	stp	x21, x1, [x0]			// x0 .. x3 at kernel entry
	stp	x2, x3, [x0, #16]

	dmb	sy				// needed before dc ivac with
						// MMU off

	mov	x1, #0x20			// 4 x 8 bytes
	b	__inval_dcache_area		// tail call
SYM_CODE_END(preserve_boot_args)
```
 * FDT:
   * 참고 사이트 : http://linuxfactory.or.kr/dokuwiki/doku.php?id=fdt
   * 하드웨어 구조를 기술하기 위한 데이터 구조
 * adr_l 은 https://lists.cs.columbia.edu/pipermail/kvmarm/2017-August/026672.html 에서 확인 가능한데, x0 에 boot_args 주소를 저장한다.
   * ?? adr_l과 adrp 는 무슨 차이지?
   * adrp 는 Address of 4KB page at a PC-relative offset. 라고 나와있어 상대주소로 찾는 거고
 * stp 은 store pair 라고 하는데 x0의 메모리 주소에 x21, x1 을 넣는다.:
   * ?? x1과 x21에 무슨 값이 들어있는거지?
   * 마찬가지로 x2, x3 에는 무슨 값이 들어있는거지?
 * dmb 는 data memory barrier의 약자
   * memory barrier는 실제로 적용되기까지 기다려주는? 동기화하는? 내용이다.
 * mov 는 뒤의 값을 앞으로 저장하는 개념
 ```c
 x21 = x0; /* x0 means FDT, x21 = FDT 아마도 x0를 파라메터 전달할 때 써야하는데 안에 들어 있는 값이 있어서 x21로 옴겨준것 같다. 아직까지 x0를 쓴적이 없기 때문에 FDT 가 들어 있다. */
 x0 = get_address(boot_args);
 boot_args[0] = x21;
 boot_args[1] = x1;
 boot_args[2] = x2;
 boot_args[3] = x3;
 memory_barrier();
 goto __inval_dcache_area;
 ```
 * 정도로 요약된다.
 * 다시말해서 부팅될때 파라메터를 4개가 전달되는데, 이를 boot_args 에 저장하는 내용이다.
 * 즉, preserve_boot_args 는 부팅할때 전달된 파라메터 4개가 코드를 실행하면서 날아가는 것을 방지하고자 메모리 영역에 넣어준다.
 * 또한 이때 메모리 영역에 넣는 내용이기 때문에 mb를 넣어준다.

#### __inval_dcache_area
```
/*
/*
 *	__inval_dcache_area(kaddr, size)
 *
 * 	Ensure that any D-cache lines for the interval [kaddr, kaddr+size)
 * 	are invalidated. Any partial lines at the ends of the interval are
 *	also cleaned to PoC to prevent data loss.
 *
 *	- kaddr   - kernel address
 *	- size    - size in question
 */
SYM_FUNC_START_LOCAL(__dma_inv_area)
SYM_FUNC_START_PI(__inval_dcache_area)
	/* FALLTHROUGH */

/*
 *	__dma_inv_area(start, size)
 *	- start   - virtual start address of region
 *	- size    - size in question
 */
	add	x1, x1, x0
	dcache_line_size x2, x3
	sub	x3, x2, #1
	tst	x1, x3				// end cache line aligned?
	bic	x1, x1, x3
	b.eq	1f
	dc	civac, x1			// clean & invalidate D / U line
1:	tst	x0, x3				// start cache line aligned?
	bic	x0, x0, x3
	b.eq	2f
	dc	civac, x0			// clean & invalidate D / U line
	b	3f
2:	dc	ivac, x0			// invalidate D / U line
3:	add	x0, x0, x2
	cmp	x0, x1
	b.lo	2b
	dsb	sy
	ret
SYM_FUNC_END_PI(__inval_dcache_area)
```
 * D-Cache는 Data Cache, I-Cache는 Instruction Cache를 의미
 * 이 함수는 D-cache의 특정 영역을 invalidate 처리해서 data loss를 방지하는 것이다.
 * ret 을 통해서 preserve_boot_args 를 호출한 primary_entry 로 돌아간다. :
   * 왜냐하면 처음 preserve_boot_args 만 bl, 나머지는 b 로 이동했기 때문이다.


#### el2_setup
```
/*
 * If we're fortunate enough to boot at EL2, ensure that the world is
 * sane before dropping to EL1.
 *
 * Returns either BOOT_CPU_MODE_EL1 or BOOT_CPU_MODE_EL2 in w0 if
 * booted in EL1 or EL2 respectively.
 */
SYM_FUNC_START(el2_setup)
	msr	SPsel, #1			// We want to use SP_EL{1,2}
	mrs	x0, CurrentEL
	cmp	x0, #CurrentEL_EL2
	b.eq	1f
	mov_q	x0, (SCTLR_EL1_RES1 | ENDIAN_SET_EL1)
	msr	sctlr_el1, x0
	mov	w0, #BOOT_CPU_MODE_EL1		// This cpu booted in EL1
	isb
	ret

1:	mov_q	x0, (SCTLR_EL2_RES1 | ENDIAN_SET_EL2)
	msr	sctlr_el2, x0

#ifdef CONFIG_ARM64_VHE
	/*
	 * Check for VHE being present. For the rest of the EL2 setup,
	 * x2 being non-zero indicates that we do have VHE, and that the
	 * kernel is intended to run at EL2.
	 */
	mrs	x2, id_aa64mmfr1_el1
	ubfx	x2, x2, #ID_AA64MMFR1_VHE_SHIFT, #4
#else
	mov	x2, xzr
#endif

	/* Hyp configuration. */
	mov_q	x0, HCR_HOST_NVHE_FLAGS
	cbz	x2, set_hcr
	mov_q	x0, HCR_HOST_VHE_FLAGS
set_hcr:
	msr	hcr_el2, x0
	isb

	/*
	 * Allow Non-secure EL1 and EL0 to access physical timer and counter.
	 * This is not necessary for VHE, since the host kernel runs in EL2,
	 * and EL0 accesses are configured in the later stage of boot process.
	 * Note that when HCR_EL2.E2H == 1, CNTHCTL_EL2 has the same bit layout
	 * as CNTKCTL_EL1, and CNTKCTL_EL1 accessing instructions are redefined
	 * to access CNTHCTL_EL2. This allows the kernel designed to run at EL1
	 * to transparently mess with the EL0 bits via CNTKCTL_EL1 access in
	 * EL2.
	 */
	cbnz	x2, 1f
	mrs	x0, cnthctl_el2
	orr	x0, x0, #3			// Enable EL1 physical timers
	msr	cnthctl_el2, x0
1:
	msr	cntvoff_el2, xzr		// Clear virtual offset

#ifdef CONFIG_ARM_GIC_V3
	/* GICv3 system register access */
	mrs	x0, id_aa64pfr0_el1
	ubfx	x0, x0, #ID_AA64PFR0_GIC_SHIFT, #4
	cbz	x0, 3f

	mrs_s	x0, SYS_ICC_SRE_EL2
	orr	x0, x0, #ICC_SRE_EL2_SRE	// Set ICC_SRE_EL2.SRE==1
	orr	x0, x0, #ICC_SRE_EL2_ENABLE	// Set ICC_SRE_EL2.Enable==1
	msr_s	SYS_ICC_SRE_EL2, x0
	isb					// Make sure SRE is now set
	mrs_s	x0, SYS_ICC_SRE_EL2		// Read SRE back,
	tbz	x0, #0, 3f			// and check that it sticks
	msr_s	SYS_ICH_HCR_EL2, xzr		// Reset ICC_HCR_EL2 to defaults

3:
#endif

	/* Populate ID registers. */
	mrs	x0, midr_el1
	mrs	x1, mpidr_el1
	msr	vpidr_el2, x0
	msr	vmpidr_el2, x1

#ifdef CONFIG_COMPAT
	msr	hstr_el2, xzr			// Disable CP15 traps to EL2
#endif

	/* EL2 debug */
	mrs	x1, id_aa64dfr0_el1
	sbfx	x0, x1, #ID_AA64DFR0_PMUVER_SHIFT, #4
	cmp	x0, #1
	b.lt	4f				// Skip if no PMU present
	mrs	x0, pmcr_el0			// Disable debug access traps
	ubfx	x0, x0, #11, #5			// to EL2 and allow access to
4:
	csel	x3, xzr, x0, lt			// all PMU counters from EL1

	/* Statistical profiling */
	ubfx	x0, x1, #ID_AA64DFR0_PMSVER_SHIFT, #4
	cbz	x0, 7f				// Skip if SPE not present
	cbnz	x2, 6f				// VHE?
	mrs_s	x4, SYS_PMBIDR_EL1		// If SPE available at EL2,
	and	x4, x4, #(1 << SYS_PMBIDR_EL1_P_SHIFT)
	cbnz	x4, 5f				// then permit sampling of physical
	mov	x4, #(1 << SYS_PMSCR_EL2_PCT_SHIFT | \
		      1 << SYS_PMSCR_EL2_PA_SHIFT)
	msr_s	SYS_PMSCR_EL2, x4		// addresses and physical counter
5:
	mov	x1, #(MDCR_EL2_E2PB_MASK << MDCR_EL2_E2PB_SHIFT)
	orr	x3, x3, x1			// If we don't have VHE, then
	b	7f				// use EL1&0 translation.
6:						// For VHE, use EL2 translation
	orr	x3, x3, #MDCR_EL2_TPMS		// and disable access from EL1
7:
	msr	mdcr_el2, x3			// Configure debug traps

	/* LORegions */
	mrs	x1, id_aa64mmfr1_el1
	ubfx	x0, x1, #ID_AA64MMFR1_LOR_SHIFT, 4
	cbz	x0, 1f
	msr_s	SYS_LORC_EL1, xzr
1:

	/* Stage-2 translation */
	msr	vttbr_el2, xzr

	cbz	x2, install_el2_stub

	mov	w0, #BOOT_CPU_MODE_EL2		// This CPU booted in EL2
	isb
	ret

SYM_INNER_LABEL(install_el2_stub, SYM_L_LOCAL)
	/*
	 * When VHE is not in use, early init of EL2 and EL1 needs to be
	 * done here.
	 * When VHE _is_ in use, EL1 will not be used in the host and
	 * requires no configuration, and all non-hyp-specific EL2 setup
	 * will be done via the _EL1 system register aliases in __cpu_setup.
	 */
	mov_q	x0, (SCTLR_EL1_RES1 | ENDIAN_SET_EL1)
	msr	sctlr_el1, x0

	/* Coprocessor traps. */
	mov	x0, #0x33ff
	msr	cptr_el2, x0			// Disable copro. traps to EL2

	/* SVE register access */
	mrs	x1, id_aa64pfr0_el1
	ubfx	x1, x1, #ID_AA64PFR0_SVE_SHIFT, #4
	cbz	x1, 7f

	bic	x0, x0, #CPTR_EL2_TZ		// Also disable SVE traps
	msr	cptr_el2, x0			// Disable copro. traps to EL2
	isb
	mov	x1, #ZCR_ELx_LEN_MASK		// SVE: Enable full vector
	msr_s	SYS_ZCR_EL2, x1			// length for EL1.

	/* Hypervisor stub */
7:	adr_l	x0, __hyp_stub_vectors
	msr	vbar_el2, x0

	/* spsr */
	mov	x0, #(PSR_F_BIT | PSR_I_BIT | PSR_A_BIT | PSR_D_BIT |\
		      PSR_MODE_EL1h)
	msr	spsr_el2, x0
	msr	elr_el2, lr
	mov	w0, #BOOT_CPU_MODE_EL2		// This CPU booted in EL2
	eret
SYM_FUNC_END(el2_setup)
```
 * EL(Exception Level) 설명 참고 : http://egloos.zum.com/rousalome/v/9966116:
   * el0 : arm 의 user 모드, el1 : arm supervisor(커널코드), el2 : hypervisor, el3: secure
   * 따라서 guest OS 를 운영하는데 필요한 모드가 hypervisor 모드이고 이걸 설정해주는 것이다.

#### set_cpu_boot_mode_flag
```
/*
 * Sets the __boot_cpu_mode flag depending on the CPU boot mode passed
 * in w0. See arch/arm64/include/asm/virt.h for more info.
 */
SYM_FUNC_START_LOCAL(set_cpu_boot_mode_flag)
	adr_l	x1, __boot_cpu_mode
	cmp	w0, #BOOT_CPU_MODE_EL2
	b.ne	1f
	add	x1, x1, #4
1:	str	w0, [x1]			// This CPU has booted in EL1
	dmb	sy
	dc	ivac, x1			// Invalidate potentially stale cache line
	ret
SYM_FUNC_END(set_cpu_boot_mode_flag)
```
 * EL2 인지, EL1 인지 확인
 * TODO 여기서부터 다시 정리해야함.
