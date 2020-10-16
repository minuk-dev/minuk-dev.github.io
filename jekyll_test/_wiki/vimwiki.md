---
layout  : wiki
title   : vimwiki
summary : 
date    : 2020-04-08 22:51:20 +0900
lastmod : 2020-04-12 20:44:38 +0900
tags    : [vim, vimwiki]
draft   : false
parent  : 
---
## Vimwiki 설정
 * Vimwiki를 메인으로 쓰기로 결정한 이상, 훨씬 더 잘 활용해서 (예를 들어 단축키같이) 사용하고 싶어졋다.
 * 찾아보니 한국어 자료로는 기계인간님의 위키가 압도적으로 자료가 많아서 거기를 참고하기로 했다.
 * 설정도 그분이 그렇게 쓰는데에는 이유가 있다고 생각해서 그렇게 하기로 했다. ~~나보다는 훨씬 더 vim을 잘쓰실테니~~
### 단축키 설정
 * 기계 인간 님의 위키에 있는걸 그대로 따라하기로 했다. 겸사겸사 `FZF`도 설치만 해놓고 안썻는데 설정도 해봐야겠다.
``` 
" vimwiki conceallevel
let g:vimwiki_conceallevel = 0
"자주 사용하는 명령어에 단축키를 취향대로 매핑해둔다
" vimwiki
command! WikiIndex :VimwikiIndex
nmap <Leader>ww <Plug>VimwikiIndex
" F4 키를 누르면 커서가 놓인 단어를 위키에서 검색한다
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>
" Shift F4 키를 누르면 현재 문서를 링크한 모든 문서를 검색한다
nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>
```
