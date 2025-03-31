---
layout: wiki
title: nvim
date: 2025-04-01 01:07:45 +0900
lastmod: 2025-04-01 02:24:54 +0900
tags: 
draft: false
parent: 
---
## 시작하면서...
- 예전에 vim 설정할때는 뭔가 재밌었는데, 요즘은 조금 피로한거 같다.
- lua 도 많이 알아야하고, lsp 설정도 해야하고, dap 설정도 해야하고...
- 그리고 plugin 들도 종류가 뭐 그리 많은지...
- 그리고 이 글을 쓰는 주 목적인 neovim 0.11.0 버전으로 업그레이드 되면서 뭐그리 deprecated 된게 많은지 참내...
- 솔직히 요즘 vim 커뮤니티 돌아가는 꼴을 보면 왜 다들 도망가는지 알거 같다.
- 나만의 Editor? IDE? 솔직히 잘 모르겠다. 예전에는 tagbar, nerdtree 정도가 거의 표준에 과도기때 ALE, coc 정도일때가 제일 좋았던거 같다. 해봤자 easymotion 정도?
- 요즘은 알아야할 plugin 도 너무 많고, 설정도 너무 많고... 뭔가 적당히가 없는 느낌이다.
- 나는 개인적으로는 이런거에 피로해서 [vim-bootstrap](https://vim-bootstrap.com) 을 이용했었는데, 요즘은 이것도 영 신통치가 않다.
	- Plug 보다 Lazy 가 조금더 좋은 설정방법인데 이걸 지원하지도 않고,
	- 아직도 airline 같은거 쓰고, 등등
	- 고전적인게 좋다고는 하지만 너무 업데이트가 안되는 느낌이다.
- 다른거 코딩하다가, 갑자기 이걸하니까 조금 화나긴 한다....

## 목표
- [ ] Plugin 관리 쉽게 하기 : Lazy
- [ ] FZF 설정하기
- [ ] rg 설정하기
- [ ] telescope 설정하기
- [ ] go 지원 잘되기
- [ ] dap 공부하고 적용하기
- [ ] tagbar 같은거 잘 지원하기

---
## Step 1. core 랑 plugin 디렉토리 분리

```
~/.config/nvim/init.lua
~/.config/nvim/lua/minukdev/core.lua
~/.config/nvim/lua/minukdev/lazy.lua
~/.config/nvim/lua/minukdev/plugins
~/.config/nvim/lua/minukdev/plugins/lsp
```

- `init.lua`
```
require("minukdev.core")
require("minukdev.lazy")
```

- `core.lua`
```lua
vim.cmd("let g:netrw_liststyle = 3")

local opt = vim.opt
-- opt.statuscolumn = "%s %l %r"
-- vim.api.nvim_set_hl(0, "LineNr", { fg = "white" })

opt.relativenumber = false
opt.number = true

opt.autoread = true

-- tabs & indentation
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true

opt.wrap = true

-- search settings
opt.ignorecase = true
opt.smartcase = true

opt.cursorline = true

opt.termguicolors = true
opt.background = "dark"
opt.signcolumn = "yes"

-- backspace
opt.backspace = "indent,eol,start"

-- clipboard
opt.clipboard:append("unnamedplus") -- use system clipboard

-- slip windows
opt.splitright = true
opt.splitbelow = true

-- undo
opt.undofile = true
vim.opt.undodir = "/Users/min-uklee/.config/nvim/.undo/"
```



---
## 중단
- 그냥 nvim 을 놓아주기로 했다.
- terminal 로 개발하는건 굉장히 오래되었고, 아직도 nvim 을 쓰는게 익숙하지만, 이제는 놓아줄때가 된거 같다.
- vscode 에도 수많은 플러그인이 존재하고, lsp 지원 dap 지원 등등도 다 가능하다
- 이제는 터미널 명렁어중 쓰는건
	- tmux, tig, k9s 정도만 남은거 같다...
	- tig 도 뭔가 자연스럽게 out 될거 같다. k9s 는 그래도 kubectl 을 사용하면서 자연스럽게 계속 터미널에서 쓸거 같지만 확실하지 않다.
- 점점 터미널로 개발하는게 고집이라고 생각되는 시기가 오는거 같다.
- vim keybinding 을 지원하는 도구들은 이미 충분히 많고, vim 은 날이 갈수록 방향을 잃어가는거 같다.