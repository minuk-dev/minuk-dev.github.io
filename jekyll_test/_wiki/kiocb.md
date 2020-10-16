---
layout  : wiki
title   : kiocb
summary : 
date    : 2020-07-03 20:30:47 +0900
lastmod : 2020-07-03 20:43:47 +0900
tags    : [linux, vfs, iocb, kiocb]
draft   : false
parent  : vfs
---

## 간략 설명
 * 동기/비동기 IO 함수에게 완료할때 실행할 콜백함수를 전달하기 위한 구조체?
 
## 매개변수 설명
 * `ki_filp` : 해당 파일
 * `ki_complete` : 상태가 완료가 될때 실행되는 콜백함수
 * 나머진 아직 모르겠네 알게되면 추가로 정리함
   * `private` 
   * `ki_flags`
   * `ki_hint`
   * `ki_ioprio`
   * `ki_cookie`

## 코드 
```c
struct kiocb {
	struct file		*ki_filp;

	/* The 'ki_filp' pointer is shared in a union for aio */
	randomized_struct_fields_start

	loff_t			ki_pos;
	void (*ki_complete)(struct kiocb *iocb, long ret, long ret2);
	void			*private;
	int			ki_flags;
	u16			ki_hint;
	u16			ki_ioprio; /* See linux/ioprio.h */
	unsigned int		ki_cookie; /* for ->iopoll */

	randomized_struct_fields_end
};
```

