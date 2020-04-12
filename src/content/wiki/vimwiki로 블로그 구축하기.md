---
layout  : wiki
title   : vimwiki로 블로그 구축하기
summary : 
date    : 2020-04-11 00:19:04 +0900
lastmod : 2020-04-12 20:40:00 +0900
tags    : 
draft   : true
parent  : 
---

## 계기
* 불편하다. 딱 이말이 가장 적합할거 같다. 원래 사용하던 것들이 전부 불편했다. 내가 써봤던건 `jekyll`을 통한 깃허브 포스트, `Notion`인데, 각각 장단점이 도드라졌다. 오프라인에서도 똑같이 보이는 여부, 글을 쓸 수 있는지 여부, 내 컴퓨터가 아닌 곳에서도 언제나 빠르게 확인 가능한지, 이런 여러점에서 그리 좋지 않았다. (노션이 초기에는 좋았지만, 점점 오프라인 기능들이 싱크들의 문제로 인해서 잘 안되지 않았다.)
* `vim`을 쓰고 싶어졌다. 에디터로도 vim을 쓰고 chrome에서도 vimium, PC에서도 키보드로만 작업할수 있도록 `i3`로 작업하는데 왜 메모할때는 마우스를 써야하는가 라는 생각이 들었다.
* 기계인간님의 위키를 보게 됬다. (솔직히 너무 멋지다고 생각한다. 지금은 아무도 안볼지라도 언젠가는 누군가 나를 그렇게 봐줬으면 좋겠다.)

## vimwiki 시작
* vimwiki를 다운한다.
```
Plug 'vimwiki/vimwiki'
" 솔직히 나는 처음부터 vimrc를 설정하지는 않았고, 한번 설정 날려먹은 뒤 귀찮아서 vim-bootstrap이라는 사이트에서 사용하는 언어만 체크하고 다운받은 뒤 조금씩 수정중이다.
```

* 단축키를 만든다 (나보다 뛰어난 사람들이 올린걸 따라했다.)
```
"" Wiki
command! WikiIndex :VimwikiIndex
nmap <Leader>ww <Plug>VimwikiIndex

let g:vimwiki_list = [{ 'path' : '/home/lmu/workspace/blog/src/content/wiki/', 'ext' : '.md', 'index' : '_index' }]
let g:vimwiki_conceallevel = 0
" F4 키를 누르면 커서가 놓인 단어를 위키에서 검색한다.
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>

" Shift F4 키를 누르면 현재 문서를 링크한 모든 문서를 검색한다
nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>

map <Leader>tt <Plug>VimwikiToggleListItem


function! NewTemplate()

  let l:wiki_directory = v:false

  for wiki in g:vimwiki_list
    if stridx(expand('%:p:h') . '/', wiki.path) != -1
      let l:wiki_directory = v:true
      break
    endif
  endfor

  if !l:wiki_directory
    "echo('not wiki directory')
    return
  endif

  if line("$") > 1
    "echo('error')
    return
  endif

  let l:template = []
  call add(l:template, '---')
  call add(l:template, 'layout  : wiki')
  call add(l:template, 'title   : ')
  call add(l:template, 'summary : ')
  call add(l:template, 'date    : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
  call add(l:template, 'lastmod : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
  call add(l:template, 'tags    : ')
  call add(l:template, 'draft   : true')
  call add(l:template, 'parent  : ')
  call add(l:template, '---')
  call add(l:template, '')
  call add(l:template, '# ')
  call setline(1, l:template)
  execute 'normal! G'
  execute 'normal! $'

  echom 'new wiki page has created'
endfunction

autocmd BufRead,BufNewFile *.md call NewTemplate()

let g:md_modify_disabled = 0
function! LastModified()
  if g:md_modify_disabled
    return
  endif
  if &modified
    echo('markdown updated time modified')
    let save_cursor = getpos(".")
    let n = min([10, line("$")])
    keepjumps exe '1,' . n . 's#^\(.\{,10}lastmod\s*: \).*#\1' .
          \ strftime('%Y-%m-%d %H:%M:%S +0900') . '#e'
    call histdel('search', -1)
    call setpos('.', save_cursor)
  endif
endfun

autocmd BufWritePre *.md call LastModified()

```

* startify 를 다운한다. (기계인간 님의 위키를 봐보면 이제 생산성을 높여준다고 하신다.)
```
"startify
let g:startify_lists = [
      \ { 'type': 'sessions',  'header': ['   Sessions']       },
      \ { 'type': 'files',     'header': ['   MRU']            },
      \ { 'type': 'dir',       'header': ['   MRU '. getcwd()] },
      \ { 'type': 'bookmarks', 'header': ['   Bookmarks']      },
      \ { 'type': 'commands',  'header': ['   Commands']       },
      \]
let g:startify_session_dir = "~/.vim/session"
let g:startify_session_autoload = 1
let g:startify_session_persistence = 1
let g:startify_session_before_save = [
  \ 'echo "Cleaning up before saving.."',
  \ 'silent! NERDTreeTabsClose'
  \ ]
```

* vimwiki 는 설정이 끝났다.
 
## github page 만들기
예전에 jekyll을 써봤는데 너무 별로였다. 워낙 오래전이라 뭐때문에 그렇게 별로였는지는 기억이 안난다. 하지만 별로였으니 다른걸 써보기로 했다.

그런데 github blame 기능을 활용해서 위키 목록을 보는 기록이 신경 쓰였다. 근데 뭐 레포지토리에 항상 소스코드만 올라가라는 법은 없으니 그냥 빌드된거랑 소스코드랑 모두 올려도 어떻게든 되겠지라고 생각하고 진행했다.

내가 선정을 하는데 큰 기준은 다음과 같다.
 
  * 명령어가 적어야한다. : 솔직히 vim, tmux, i3만 해도 충분히 벅차고, 화면 밝기, 네트워크 설정도 전부 대충 외워서 하는데 더이상 외울게 늘어나면 감당이 안된다. 
  * 오프라인 환경에서 잘 돌아야한다. : 이미 vimwiki가 오프라인이니 뭔 문제냐 싶지만, 언제나 항상 똑같이 보여야하는게 중요했다.
  * 리소스를 적게 먹고 빨라야한다. : 집에 있는 노트북은 i3, 4GB이고, 보통 접속해서 쓰는건 cloudatcost의 10000원짜리다. 성능이 좋을리가 없다.
  * 커스터마이징 문서가 좋아야한다 : 이건 단순히 찍어내기식 블로그가 많으면 좋겠다가 아니다. 그런 글들은 읽어봐도 다들 똑바로 알고있는게 없고 다들 테마 가져다가 쓴다. 순수하게 문서가 퀄리티가 좋아야한다. 혼자서도 찾아볼수 있게

  이런 고민을 하다가 생각난게 옆에 있던 형이 말한 `hugo`라는게 생각 났다. 고민하는 것보다 해보고 아니면 마는게 더 시간이 적게 들거 같아서 그렇게 하기로했다. ~~(여차하면 아예 jekyll로 완전히 따라해도 되니까)~~


## Hugo


## Domain 연결하기
### Gandi.net
### Cloudflare
### HTTPS

## Offline 설정
