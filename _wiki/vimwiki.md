---
layout  : wiki
title   : vimwiki
summary : vimwiki 사용하면서 깨달은 것들
date    : 2020-04-08 22:51:20 +0900
lastmod : 2022-04-18 09:22:56 +0900
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
- 그래서 아래와 같이 고쳐서 사용한다.
- markdown과 완벽히 같다. 하지만 vimwiki 설정에서 markdown을 사용할 경우 몇가지 기능이 불편해져서 default에 덧씌워서 사용한다.

### 정리 방법론
- 이것저것 시도해보다가 요즘은 [[제텔카스텐]] 이라는 방법론을 찾게 되어 여기에 적응하고 있다.
- 메모간의 계층구조를 적용해서, 일단 아무거나 임시메모에 적어놨다가 나중에 시간이 나면 천천히 단계를 올리면서 정리하는 방법론으로 이해해서 사용하고 있다.

```vim
let s:default_syntax = g:vimwiki_syntax_variables['default']

" text: $ equation_inline $
let s:default_syntax.rxEqIn = '\$[^$`]\+\$'
let s:default_syntax.char_eqin = '\$'

" text: **strong** or __strong__
let s:default_syntax.rxBold = '\%(^\|\s\|[[:punct:]]\)\@<='.
      \'\(\*\|_\)\{2\}'.
      \'\%([^*_`[:space:]][^*_`]*[^*_`[:space:]]\|[^*_`[:space:]]\)'.
      \'\1\{2\}'.
      \'\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.char_bold = '\*\*\|__'

" text: _emphasis_ or *emphasis*
let s:default_syntax.rxItalic = '\%(^\|\s\|[[:punct:]]\)\@<='.
      \'\(\*\|_\)'.
      \'\%([^*_`[:space:]][^*_`]*[^*_`[:space:]]\|[^*_`[:space:]]\)'.
      \'\1'.
      \'\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.char_italic = '\*\|_'

" text: *_bold italic_* or _*italic bold*_
let s:default_syntax.rxBoldItalic = '\%(^\|\s\|[[:punct:]]\)\@<='.
      \'\(\*\)\{3\}'.
      \'\%([^*`[:space:]][^*`]*[^*`[:space:]]\|[^*`[:space:]]\)'.
      \'\1\{3\}'.
      \'\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.char_bolditalic = '\*\*\*'

let s:default_syntax.rxItalicBold = '\%(^\|\s\|[[:punct:]]\)\@<='.
      \'\(_\)\{3\}'.
      \'\%([^_`[:space:]][^_`]*[^_`[:space:]]\|[^_`[:space:]]\)'.
      \'\1\{3\}'.
      \'\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.char_italicbold = '___'

" text: `code`
let s:default_syntax.rxCode = '`[^`]\+`'
let s:default_syntax.char_code = '`'

" text: ~~deleted text~~
let s:default_syntax.rxDelText = '\~\~[^~`]\+\~\~'
let s:default_syntax.char_deltext = '\~\~'

" text: ^superscript^
let s:default_syntax.rxSuperScript = '\^[^^`]\+\^'
let s:default_syntax.char_superscript = '^'

" text: ,,subscript,,
let s:default_syntax.rxSubScript = ',,[^,`]\+,,'
let s:default_syntax.char_subscript = ',,'

" generic headers
let s:default_syntax.rxH = '#'
let s:default_syntax.symH = 0



" <hr>, horizontal rule
let s:default_syntax.rxHR = '\(^---*$\|^___*$\|^\*\*\**$\)'

" Tables. Each line starts and ends with '|'; each cell is separated by '|'
let s:default_syntax.rxTableSep = '|'

" Lists
let s:default_syntax.bullet_types = ['-', '*', '+']
let s:default_syntax.recurring_bullets = 0
let s:default_syntax.number_types = ['1.']
let s:default_syntax.list_markers = ['-', '*', '+', '1.']
let s:default_syntax.rxListDefine = '::\%(\s\|$\)'

" Preformatted text (code blocks)
let s:default_syntax.rxPreStart = '\%(`\{3,}\|\~\{3,}\)'
let s:default_syntax.rxPreEnd = '\%(`\{3,}\|\~\{3,}\)'
" TODO see syntax/vimwiki_markdown_custom.vim for more info
" let s:default_syntax.rxIndentedCodeBlock = '\%(^\n\)\@1<=\%(\%(\s\{4,}\|\t\+\).*\n\)\+'

" Math block
let s:default_syntax.rxMathStart = '\$\$'
let s:default_syntax.rxMathEnd = '\$\$'

let s:default_syntax.rxComment = '^\s*%%.*$\|<!--[^>]*-->'
let s:default_syntax.rxTags = '\%(^\|\s\)\@<=:\%([^:[:space:]]\+:\)\+\%(\s\|$\)\@='

let s:default_syntax.header_search = '^\s*\(#\{1,6}\)\([^#].*\)$'
let s:default_syntax.header_match = '^\s*\(#\{1,6}\)#\@!\s*__Header__\s*$'
let s:default_syntax.bold_search = '\%(^\|\s\|[[:punct:]]\)\@<=\*\zs'.
      \ '\%([^*`[:space:]][^*`]*[^*`[:space:]]\|[^*`[:space:]]\)\ze\*\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.bold_match = '\%(^\|\s\|[[:punct:]]\)\@<=\*__Text__\*'.
      \ '\%([[:punct:]]\|\s\|$\)\@='
let s:default_syntax.wikilink = '\[\[\zs[^\\\]|]\+\ze\%(|[^\\\]]\+\)\?\]\]'
let s:default_syntax.tag_search = '\(^\|\s\)\zs:\([^:''[:space:]]\+:\)\+\ze\(\s\|$\)'
let s:default_syntax.tag_match = '\(^\|\s\):\([^:''[:space:]]\+:\)*__Tag__:'.
      \ '\([^:[:space:]]\+:\)*\(\s\|$\)'
```
