---
layout  : wiki
title   : Pintos
summary : 
date    : 2020-04-07 20:20:28 +0900
lastmod : 2020-06-27 14:54:37 +0900
tags    : [pintos]
parent  : front page
---

## 설정하기 Configuration
### 프로젝트 기본 다운로드
* 대부분 우분투에서 설정할테니, 다른사람들이 잘 설정해좋은거 다운 받자
```bash
$ git clone https://github.com/kumardeepakr3/PINTOS-Ubuntu.git
$ cd PINTOS-Ubuntu
$ bash ./pintos_ubuntu.sh
```
* 여기서 9,10 작업은 필요가 없는 작업이니 다시 원복해주자
### vim 설정하기
* 나는 vim(정확히는 neovim)으로 코딩할꺼니 자동완성 같은걸 설정해주자
* 여기서는 [[coc]], [[tagbar]], [[ALE]], [[cscope]]를 사용해서 설정했다.
#### coc
* ccls 를 설치하고
* CocLocalConfig를 명령어로 친뒤
```json
{
    "languageserver": {
        "ccls": {
            "command": "ccls",
            "filetypes": [
                "c",
                "cpp",
                "objc",
                "objcpp"
            ],
            "rootPatterns": [
                ".ccls",
                "compile_commands.json",
                ".vim/",
                ".git/",
                ".hg/"
            ],
            "initializationOptions": {
                "cache": {
                    "directory": "/tmp/ccls"
                },
                "clang": {
                  "resourceDir": ".",
                  "extraArgs": ["-isystem./", "-isystem./lib/kernel", "-isystem./lib"]
                }
                
            }
        }
    }
}
```
#### tagbar, ale 설정
* local.vim(프로젝트 폴더에다가 두는 vimrc 설정, 자세한건 [[vim]] 참조)
```vimrc
let g:ale_linters= { 'c' : ['g++'], 'cpp' : ['g++'] }
let g:ale_c_gcc_options="-I. -I./lib/kernel -I./lib -Wall"
let g:ale_cpp_gcc_options="-I. -I./lib/kernel -I./lib -Wall"
function! LoadCscope()
  let db = findfile("cscope.out", ".;")
  if (!empty(db))
    let path = strpart(db, 0, match(db, "/cscope.out$"))
    set nocscopeverbose " suppress 'duplicate connection' error
    exe "cs add " . db . " " . path
    set cscopeverbose
  " else add the database pointed to by environment variable
  elseif $CSCOPE_DB != ""
    cs add $CSCOPE_DB
  endif
endfunction
au BufEnter /* call LoadCscope()
```
### shutdown 버그 수정
* pintos를 키면 계속 죽는다.
* `src/devices/shutdown.c` 에서 
```c
   /* This is a special power-off sequence supported by Bochs and
      QEMU, but not by physical hardware. */
   for (p = s; *p != '\0'; p++)
     outb (0x8900, *p);

+  outw (0x604, 0x0 | 0x2000); /* Fix shutdown */
+
   /* This will power off a VMware VM if "gui.exitOnCLIHLT = TRUE"
      is set in its configuration file.  (The "pintos" script does
      that automatically.)  */
   asm volatile ("cli; hlt" : : : "memory");

   /* None of those worked. */
```
로 추가해준다.
## `thread`

