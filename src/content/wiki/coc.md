---
layout  : wiki
title   : coc (vim plugin coc)
summary : 
date    : 2020-04-15 23:13:04 +0900
lastmod : 2020-04-21 23:11:22 +0900
tags    : 
draft   : false
parent  : 
---

## 간단 설명 
 * Visual Studio Code 와 동시에 나온 Language Server (동시에 나왔는지는 확실치 않음)을 vim에도 적용하는 플러그인이다.
 * 일부 언어들은 이미 이 플러그인을 만든 사람이 쉽게쉽게 설치 가능하도록 해놨다.
 * 다른 언어는 삽질을 해서 알아냈다.

## 설치하기

```vim
Plug 'neoclide/coc.nvim', { 'do': './install.sh' }
```
* vimrc에 추가했다. 공식 github를 참고한거랑 다르게 썻는데, 공식에 나온대로 하니 잘 설치가 안되서 하다보니 저렇게 해서 됬다.

### 설치 삽질기
* Vim-Plug가 말썽을 부린건지, git clone 과정에서 자꾸 실패했다. 그냥 vim 플러그인 디렉토리로 가서 디렉토리를 밀어버리고 다시 하니 정상적으로 됬다.
* vimrc에서 최하단에 추가했는데 Coc Command가 하나도 동작하지 않았다. vimrc의 맨 윗부분으로 올리니 잘 작동된다.

## 설정하기
* 공식에 나와있는거 + 맨 아랫줄 delimitMate만 추가해줬다.(Q&A에 있길래 하란대로 했다.)
```vim
" TextEdit might fail if hidden is not set.
set hidden

" Some servers have issues with backup files, see #649.
set nobackup
set nowritebackup

" Give more space for displaying messages.
set cmdheight=2

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Don't pass messages to |ins-completion-menu|.
set shortmess+=c

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved.
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current
" position. Coc only does snippet and additional edit on confirm.
if exists('*complete_info')
  inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"
else
  imap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
endif

" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold * silent call CocActionAsync('highlight')

" Symbol renaming.
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code.
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder.
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying codeAction to the current line.
nmap <leader>ac  <Plug>(coc-codeaction)
" Apply AutoFix to problem on the current line.
nmap <leader>qf  <Plug>(coc-fix-current)

" Introduce function text object
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap if <Plug>(coc-funcobj-i)
omap af <Plug>(coc-funcobj-a)

" Use <TAB> for selections ranges.
" NOTE: Requires 'textDocument/selectionRange' support from the language server.
" coc-tsserver, coc-python are the examples of servers that support it.
nmap <silent> <TAB> <Plug>(coc-range-select)
xmap <silent> <TAB> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocAction('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings using CoCList:
" Show all diagnostics.
nnoremap <silent> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions.
nnoremap <silent> <space>e  :<C-u>CocList extensions<cr>
" Show commands.
nnoremap <silent> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document.
nnoremap <silent> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols.
nnoremap <silent> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list.
nnoremap <silent> <space>p  :<C-u>CocListResume<CR>
imap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<Plug>delimitMateCR"
```

## Language Server 설치
   CocInstall coc-html
   CocInstall coc-snippet
* 위에 있는 것 이외에도 공식 github에서 지원한다는거 그냥 다 깔았다. 귀찮더라
### C++ Language Server 설치
* 찾아보니 c++은 기본으로 되있는게 없어서 찾아보니 `ccls`라고 있어서 더 찾기도 귀찮고 깔아봐서 잘 되서 사용중이다.
* 대부분 `brew`기반으로 알려주는데 나는 우분투 서버기반이라서, 다른 방법을 찾아봤다.
* `snap install ccls --classic`을 실행했다.
* 이제 언어서버를 연결해줘야한다.
* CocConfig 를 vim에서 실행한다.
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
                }
            }
        }
    }
}
```
* 찾아보니 프로젝트 폴더에서도 뭔가를 만들어 줘야한다고 하는데 따로 설정 안해도 잘 돌아서 냅뒀다.

## 원하는 폴더 헤더파일로 잡아주기
* `CocLocalConfig`라는 명령어로 local vim을 설정해줄수 있다.
* 아래 나와있는 extraArgs 부분에 추가해줘서 적용했다.
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
