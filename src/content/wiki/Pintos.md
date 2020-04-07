---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:20:28 +0900
lastmod : 2020-04-07 20:20:31 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 0. The purpose of this article

이 글을 쓰고 있는 나에게는 영어로 글을 쓰는 연습을 하고 체계적으로 무언가를 정리하는 연습이 됬으면 한다. 그리고 이 글을 읽고있는 누군가 (아마도 Pintos과제를 학교에서 진행하는?)가 이 글을 읽으면서 문제를 해결해 나갔으면 한다.

그래서 일단 한글로 쓰고 영어로 번역하는 식으로 글을 쓸 예정이다. (지금 이 글을 쓰는 도중에는 이제 막 Project 3 - Virtual Memory 를 다했다. Project 3 까지는 어쩌다보니 반강제적으로 오로지 Pintos Project PDF와 소스코드만 가지고 작업했는데 죽을맛이었다. Project 4 인 Filesystem 은 학교 수업 당시에는 너무 대충 들어서 아마도 인터넷에 있는 자료와 운영체제 책을 참고해서 해결할 것같다.)

## 1. Configuration

지금 내 환경은 Surface Pro 4, Ubuntu 18.04, Kernel - 5.1.7-surface-linux-surface version이다.

내 생각에는 Ubuntu 18.04이기만 하면 큰 차이는 없을 것 같다.

또한 많은 사람들이 gcc-4.4로 gcc version을 낮추라고 작성한 글들이 많아 필자도 그렇게 해볼려고 했으나 버전을 못구해서 4.8.5 버전으로 실행했고, Project 3를 하고 있는 이 시점에서 큰 문제는 없다. 혹시나 해서 gcc version도 올려준다. paste friendly code는 `sudo apt install gcc-4.8` 이다.

    $ gcc --version
    gcc (Ubuntu 4.8.5-4ubuntu8) 4.8.5
    Copyright (C) 2015 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    
    $ apt list --installed | grep gcc
    ... skip ...
    gcc-4.8/bionic,now 4.8.5-4ubuntu8 amd64 [설치됨]
    gcc-4.8-base/bionic,now 4.8.5-4ubuntu8 amd64 [설치됨,자동]
    ... skip ...

프로젝트를 시작하기에 앞서 여러 글들을 읽었고, 시도해봤으나 가장 잘 작동했던건 

[kumardeepakr3/PINTOS-Ubuntu](https://github.com/kumardeepakr3/PINTOS-Ubuntu)

였다. 혹시나 누군가 이 글을 읽고 있을때 repo가 public이 아니게 될까봐 fork해놨다. 앞에 username부분만 makerdark로 바꿔주면 들어가질 것이다.

위의 repo를 다운 받은 뒤에 `bash pintos_ubuntu.sh && source ~/.bashrc`를 실행해주자 (물론 [README.md](http://readme.md) 에도 잘 나와있다.)

필자는 원래부터 Linux CLI 환경을 좋아했지만 굳이 pintos 때문에 vim과 기타 cli 툴을 익히는건 그리 추천하지는 않습니다. (특히 과제로 하는 도중이라면)

그냥 vscode를 이용해서 코딩하는걸 추천합니다. 굳이 개발환경을 말해주자면 zsh(+oh-my-zsh, powerline9k, d2coding), tmux(+tmuxinator), neovim (+ NERDTree, Tagbar, Airline,...), ctags, cscope, fzf, tig 등을 사용합니다. 개발환경만 나중에 따로 글로 써야겠네요.

---

### 1. Fix SIGVTALRM Bug

처음에 실행할때 SIGVTALRM 과 관련된 오류가 나온다. 여러 삽질을 한 결과

`src/util/pintos`를 열어서

    sub SIGVTALRM {
        use Config;
        my $i = 0;
        foreach my $name (split(' ', $Config{sig_name})) {
       return $i if $name eq 'VTALRM';
       $i++;
        }
        return 0;
    }

이 부분을 삭제해주면 된다.

### 2. Not shutdown Bug

`make check`를 이용해서 테스트하려고 하면 계속 시간초과로 실패할텐데 이때 단일 실행을 해보면 shutdown message가 나오고도 안꺼지는걸 볼수 있다. 이를 해결하려면 `device/shutdown.c`에서

    /* Powers down the machine we're running on,
       as long as we're running on Bochs or QEMU. */
    void
    shutdown_power_off (void)
    {
      // ... skip ...
      /* This is a special power-off sequence supported by Bochs and
         QEMU, but not by physical hardware. */
      for (p = s; *p != '\0'; p++)
        outb (0x8900, *p);
    
      outw (0x604, 0x0 | 0x2000); /*  Fix Power Off Bug */
      // ... skip ...
    }

106번 줄에 위처럼 `outw (0x504, 0x0 | 0x2000);`를 추가해주면 된다. 참고로 이부분은 왜그런지 못알아냈다. 한참 삽질하다가 도저히 모르겠어서 검색해봤다.

---

이 이외에는 필자는 따로 문제를 겪지 못했습니다. 검색을 통해서 해결하길 추천드립니다.

## 2. Sample Project

일단 무조건 

[Table of Contents](https://web.stanford.edu/class/cs140/projects/pintos/pintos.html)

에 가서 `A. Reference Guide`를 읽자. 필요한 내용들이다. 안 읽고 피보지 말자.

Sample Project를 해보자.

Sample Project는 thread_join 함수를 구현하는 것이다. 

Design Document를 써보자. 솔직히 내가 영어를 잘 못써서 그러지 나는 아직까지 Pintos에서 문서를 작성하고 짜지 않았다. 그러다가 내 뇌의 한계를 느꼇다. 그냥 문서화 해놓고 문서화 해둔대로 코딩하는게 최고라는 걸 깨달았다. 그러니 문서화 해놓고 시작하자.

---

# Project 1.

먼저 priority 별로 short-term scheduling 되도록 수정해주자.

    // thread.c
    static struct thread *
    next_thread_to_run (void)
    {
      struct list_elem *e;
    	
    	if (list_empty (&ready_list))
    		return idle_thread;
    	else
    	{
    		e = list_max (&ready_list, thread_compare_priority, NULL);
    		list_remove (e);
    		return list_entry (e, struct thread, elem);
    	}
    }
