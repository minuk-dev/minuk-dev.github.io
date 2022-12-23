---
layout  : wiki
title   : vimwiki
summary : vimwiki 사용하면서 깨달은 것들
date    : 2020-04-08 22:51:20 +0900
lastmod : 2022-12-24 04:58:04 +0900
tags    : [vim, vimwiki]
draft   : false
parent  : vim
---
## Vimwiki 설정
-  Vimwiki를 메인으로 쓰기로 결정한 이상, 훨씬 더 잘 활용해서 (예를 들어 단축키같이) 사용하고 싶어졋다.
- 찾아보니 한국어 자료로는 기계인간님의 위키가 압도적으로 자료가 많아서 거기를 참고하기로 했다.

---
## 2년간 써보면서 고치거나 느낀점
### 설치
- 지금은 모든 vim plugin 들을 vim-plug 라는 방법을 사용해서 설치하고 있다:
  - 이유는 vim bootstrap을 통해서 기본적인 설정을하고 하나씩 고치는 방법을 선택해서 커스터마이징하고 있기 때문이다.

### 장단점과 보안책
- 장점 : ssh로 접속해도 사용가능하다.
- 단점 : 그림 삽입 및 문서 미리보기가 불편하다:
  - 해결책 : obsidian 과 함께 병행해서 사용하고 있다. markdown 문법을 사용하면 문법도 상호호환되어서 편하다.

### 문법
- vimwiki 기본 문법은 개인적으로 마음에 들진 않았다.
- 근데 [기계인간](https://johngrib.github.io/wiki/vimwiki/#%EC%8B%A0%ED%83%9D%EC%8A%A4-%ED%8C%8C%EC%9D%BC-%EC%9E%AC%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0) 블로그에서 사용하고 있는 걸 알게 되서 그냥 쓰고 있다.

### 이미지
- 이미지 삽입이 항상 귀찮았는데, [stackexchange](https://vi.stackexchange.com/questions/14114/paste-link-to-image-in-clipboard-when-editing-markdown) 에서 잘 작성된 스크립트를 찾아서, 변형해서 쓰고 있다.

```vim
nnoremap <silent> <buffer> p :call MarkdownClipboardImage()<cr>

function! MarkdownClipboardImage() abort
  " Create `img` directory if it doesn't exist
  let relative_img_dir = "images"
  let absolute_img_dir = getcwd() . "/" . relative_img_dir
  if !isdirectory(absolute_img_dir)
    silent call mkdir(absolute_img_dir)
  endif

  " First find out what filename to use
  let index = 1
  let base_name = "image"
  let file_name = base_name . index . "png"
  let relative_file_path = relative_img_dir . "/" . file_name
  let file_path = absolute_img_dir . "/" . file_name
  while filereadable(file_path)
    let index = index + 1
    let file_name = base_name . index . ".png"
    let relative_file_path = relative_img_dir . "/" . file_name
    let file_path = absolute_img_dir . "/" . file_name
  endwhile

  let clip_command = 'osascript'
  let clip_command .= ' -e "set png_data to the clipboard as «class PNGf»"'
  let clip_command .= ' -e "set referenceNumber to open for access POSIX path of'
  let clip_command .= ' (POSIX file \"' . file_path . '\") with write permission"'
  let clip_command .= ' -e "write png_data to referenceNumber"'

  silent call system(clip_command)
  if v:shell_error == 1
    normal! p
  else
    execute "normal! i[". file_name . "](" . relative_file_path . ")"
  endif
endfunction
```

- 그냥 `~/.config/nvim/plugged/vimwiki/ftplugin/vimwiki.vim` 에다가 vimwiki 가 활성화 되었을때 적용되도록 해서 사용하고 있다.
  - ![image2.png](/images/image2.png)
- TODO: 블로그가 아닌 vimwiki 상태에서 사진 미리보기를 어떻게 하면 편리하게 할지는 좀 고민해봐야한다.
- TODO: 복사는 cmd + c 로 하고, 붙여넣기는 p 로 하고 있는데 이걸 cmd + v 로 바꾸고 싶긴 한데 좀 고민 해봐야한다.
