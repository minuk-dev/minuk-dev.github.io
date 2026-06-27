" =====================
" 기본 설정
" =====================

set clipboard=unnamed

unmap <Space>
let mapleader=" "

" 검색 하이라이트 제거
nmap <Esc> :nohlsearch<CR>

" 화면 줄 기준 이동
map j gj
map k gk

" =====================
" 탭 이동 (gt / gT)
" =====================

exmap tabnext obcommand workspace:next-tab
exmap tabprev obcommand workspace:previous-tab

nmap gt :tabnext<CR>
nmap gT :tabprev<CR>

" =====================
" 분할
" =====================

exmap vs obcommand workspace:split-vertical
exmap vsplit obcommand workspace:split-vertical

exmap sp obcommand workspace:split-horizontal
exmap split obcommand workspace:split-horizontal

" :vs
" :vsplit
" :sp
" :split

" =====================
" 창 닫기 (:q)
" =====================

exmap q obcommand workspace:close
exmap quit obcommand workspace:close

" =====================
" 버퍼 삭제 느낌 (:bd)
" =====================

exmap bd obcommand workspace:close
exmap bdelete obcommand workspace:close

" =====================
" 뒤로 / 앞으로
" =====================

exmap back obcommand app:go-back
exmap forward obcommand app:go-forward

nmap <C-o> :back<CR>
nmap <C-i> :forward<CR>

" =====================
" 링크 열기
" =====================

exmap followlink obcommand editor:follow-link
nmap gd :followlink<CR>

exmap followlinknew obcommand editor:open-link-in-new-leaf
nmap gD :followlinknew<CR>

" =====================
" 폴드
" =====================

exmap togglefold obcommand editor:toggle-fold
nmap za :togglefold<CR>
nmap zo :togglefold<CR>
nmap zc :togglefold<CR>

exmap foldall obcommand editor:fold-all
exmap unfoldall obcommand editor:unfold-all

nmap zM :foldall<CR>
nmap zR :unfoldall<CR>

" =====================
" 저장
" =====================

exmap w obcommand editor:save-file
exmap write obcommand editor:save-file

" =====================
" Leader
" =====================

nmap <leader>w :w<CR>
nmap <leader>q :q<CR>
nmap <leader>bd :bd<CR>

" 수직 분할
nmap <leader>sv :vs<CR>

" 수평 분할
nmap <leader>sh :sp<CR>

