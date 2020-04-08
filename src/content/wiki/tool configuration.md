---
layout  : wiki
title   : Tool configuration
summary : 
date    : 2020-04-07 20:36:45 +0900
lastmod : 2020-04-08 12:57:39 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
# - Neovim
    - `.vimrc`

            " vim-bootstrap 
            
            "*****************************************************************************
            "" Vim-PLug core
            "*****************************************************************************
            let vimplug_exists=expand('~/.config/nvim/autoload/plug.vim')
            
            let g:vim_bootstrap_langs = "c,html,javascript,python"
            let g:vim_bootstrap_editor = "nvim"				" nvim or vim
            
            if !filereadable(vimplug_exists)
              if !executable("curl")
                echoerr "You have to install curl or first install vim-plug yourself!"
                execute "q!"
              endif
              echo "Installing Vim-Plug..."
              echo ""
              silent exec "!\curl -fLo " . vimplug_exists . " --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim"
              let g:not_finish_vimplug = "yes"
            
              autocmd VimEnter * PlugInstall
            endif
            
            " Required:
            call plug#begin(expand('~/.config/nvim/plugged'))
            
            "*****************************************************************************
            "" Plug install packages
            "*****************************************************************************
            if has('nvim')
              Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
              Plug 'wokalski/autocomplete-flow'
              Plug 'zchee/deoplete-clang' 
            else
              Plug 'Shougo/deoplete.nvim'
              Plug 'roxma/nvim-yarp'
              Plug 'roxma/vim-hug-neovim-rpc'
            endif
            let g:deoplete#enable_at_startup = 1
            
            Plug 'vimwiki/vimwiki'
            Plug 'sakhnik/nvim-gdb', { 'do': ':!./install.sh \| UpdateRemotePlugins' }
            "let g:vimwiki_list = [{'path': '~/workspace/vimwiki'}]
            Plug 'scrooloose/nerdtree'
            Plug 'jistr/vim-nerdtree-tabs'
            Plug 'Xuyuanp/nerdtree-git-plugin'
            Plug 'qpkorr/vim-bufkill'
            Plug 'tpope/vim-commentary'
            Plug 'tpope/vim-fugitive'
            Plug 'vim-airline/vim-airline'
            Plug 'vim-airline/vim-airline-themes'
            Plug 'airblade/vim-gitgutter'
            Plug 'vim-scripts/grep.vim'
            Plug 'vim-scripts/CSApprox'
            Plug 'Raimondi/delimitMate'
            Plug 'majutsushi/tagbar'
            Plug 'w0rp/ale'
            Plug 'Yggdroot/indentLine'
            Plug 'avelino/vim-bootstrap-updater'
            Plug 'sheerun/vim-polyglot'
            Plug 'tpope/vim-rhubarb' " required by fugitive to :Gbrowse
            Plug 'easymotion/vim-easymotion'
            
            if isdirectory('/usr/local/opt/fzf')
              Plug '/usr/local/opt/fzf' | Plug 'junegunn/fzf.vim'
            else
              Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --bin' }
              Plug 'junegunn/fzf.vim'
            endif
            let g:make = 'gmake'
            if exists('make')
                    let g:make = 'make'
            endif
            Plug 'Shougo/vimproc.vim', {'do': g:make}
            
            "" Vim-Session
            Plug 'xolox/vim-misc'
            Plug 'xolox/vim-session'
            
            "" Snippets
            Plug 'SirVer/ultisnips'
            Plug 'honza/vim-snippets'
            
            "" Color
            Plug 'dracula/vim', { 'as': 'dracula' }
            "Plug 'dracula/dracula-theme'
            "Plug 'tomasr/molokai'
            "let g:gruvbox_italic=1 
            "Plug 'morhetz/gruvbox'
            
            "*****************************************************************************
            "" Custom bundles
            "*****************************************************************************
            
            " c
            Plug 'vim-scripts/c.vim', {'for': ['c', 'cpp']}
            Plug 'ludwig/split-manpage.vim'
            
            
            " html
            "" HTML Bundle
            Plug 'hail2u/vim-css3-syntax'
            Plug 'gorodinskiy/vim-coloresque'
            Plug 'tpope/vim-haml'
            Plug 'mattn/emmet-vim'
            
            
            " javascript
            "" Javascript Bundle
            Plug 'jelera/vim-javascript-syntax'
            
            
            " python
            "" Python Bundle
            Plug 'davidhalter/jedi-vim'
            Plug 'raimon49/requirements.txt.vim', {'for': 'requirements'}
            
            
            "*****************************************************************************
            "*****************************************************************************
            
            "" Include user's extra bundle
            if filereadable(expand("~/.config/nvim/local_bundles.vim"))
              source ~/.config/nvim/local_bundles.vim
            endif
            
            call plug#end()
            
            " Required:
            filetype plugin indent on
            
            
            "*****************************************************************************
            "" Basic Setup
            "*****************************************************************************"
            "" Encoding
            set encoding=utf-8
            set fileencoding=utf-8
            set fileencodings=utf-8
            
            
            "" Fix backspace indent
            set backspace=indent,eol,start
            
            "" Tabs. May be overridden by autocmd rules
            set tabstop=2
            set softtabstop=0
            set shiftwidth=2
            set expandtab
            
            "" Map leader to ,
            let mapleader=','
            
            "" Enable hidden buffers
            set hidden
            
            "" Searching
            set hlsearch
            set incsearch
            set ignorecase
            set smartcase
            
            set fileformats=unix,dos,mac
            
            if exists('$SHELL')
                set shell=$SHELL
            else
                set shell=/bin/sh
            endif
            
            " session management
            let g:session_directory = "~/.config/nvim/session"
            let g:session_autoload = "no"
            let g:session_autosave = "no"
            let g:session_command_aliases = 1
            
            "*****************************************************************************
            "" Visual Settings
            "*****************************************************************************
            syntax on
            set ruler
            set number
            
            let no_buffers_menu=1
            silent! colorscheme molokai
            
            set mousemodel=popup
            set t_Co=256
            set guioptions=egmrti
            set gfn=Monospace\ 10
            
            if has("gui_running")
              if has("gui_mac") || has("gui_macvim")
                set guifont=Menlo:h12
                set transparency=7
              endif
            else
              let g:CSApprox_loaded = 1
            
              " IndentLine
              let g:indentLine_enabled = 1
              let g:indentLine_concealcursor = 0
              let g:indentLine_char = '┆'
              let g:indentLine_faster = 1
            
              
            endif
            
            
            
            "" Disable the blinking cursor.
            set gcr=a:blinkon0
            set scrolloff=3
            
            "" Status bar
            set laststatus=2
            
            "" Use modeline overrides
            set modeline
            set modelines=10
            
            set title
            set titleold="Terminal"
            set titlestring=%F
            
            set statusline=%F%m%r%h%w%=(%{&ff}/%Y)\ (line\ %l\/%L,\ col\ %c)\
            
            " Search mappings: These will make it so that going to the next one in a
            " search will center on the line it's found in.
            nnoremap n nzzzv
            nnoremap N Nzzzv
            
            if exists("*fugitive#statusline")
              set statusline+=%{fugitive#statusline()}
            endif
            
            " vim-airline
            let g:airline_theme = 'dracula'
            let g:airline#extensions#branch#enabled = 1
            let g:airline#extensions#ale#enabled = 1
            let g:airline#extensions#tabline#enabled = 1
            let g:airline#extensions#tagbar#enabled = 1
            let g:airline_skip_empty_sections = 1
            
            "*****************************************************************************
            "" Abbreviations
            "*****************************************************************************
            "" no one is really happy until you have this shortcuts
            cnoreabbrev W! w!
            cnoreabbrev Q! q!
            cnoreabbrev Qall! qall!
            cnoreabbrev Wq wq
            cnoreabbrev Wa wa
            cnoreabbrev wQ wq
            cnoreabbrev WQ wq
            cnoreabbrev W w
            cnoreabbrev Q q
            cnoreabbrev Qall qall
            
            "" NERDTree configuration
            let g:NERDTreeChDirMode=2
            let g:NERDTreeIgnore=['\.rbc$', '\~$', '\.pyc$', '\.db$', '\.sqlite$', '__pycache__']
            let g:NERDTreeSortOrder=['^__\.py$', '\/$', '*', '\.swp$', '\.bak$', '\~$']
            let g:NERDTreeShowBookmarks=1
            let g:nerdtree_tabs_focus_on_files=1
            let g:NERDTreeMapOpenInTabSilent = '<RightMouse>'
            let g:NERDTreeWinSize = 30
            set wildignore+=*/tmp/*,*.so,*.swp,*.zip,*.pyc,*.db,*.sqlite
            nnoremap <silent> <F2> :NERDTreeFind<CR>
            nnoremap <silent> <F3> :NERDTreeToggle<CR>
            
            " grep.vim
            let Grep_Default_Options = '-IR'
            let Grep_Skip_Files = '*.log *.db'
            let Grep_Skip_Dirs = '.git node_modules'
            
            
            
            "*****************************************************************************
            "" Commands
            "*****************************************************************************
            " remove trailing whitespaces
            command! FixWhitespace :%s/\s\+$//e
            
            "*****************************************************************************
            "" Functions
            "*****************************************************************************
            if !exists('*s:setupWrapping')
              function s:setupWrapping()
                set wrap
                set wm=2
                set textwidth=79
              endfunction
            endif
            
            "*****************************************************************************
            "" Autocmd Rules
            "*****************************************************************************
            "" The PC is fast enough, do syntax highlight syncing from start unless 200 lines
            augroup vimrc-sync-fromstart
              autocmd!
              autocmd BufEnter * :syntax sync maxlines=200
            augroup END
            
            "" Remember cursor position
            augroup vimrc-remember-cursor-position
              autocmd!
              autocmd BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g`\"" | endif
            augroup END
            
            "" txt
            augroup vimrc-wrapping
              autocmd!
              autocmd BufRead,BufNewFile *.txt call s:setupWrapping()
            augroup END
            
            "" make/cmake
            augroup vimrc-make-cmake
              autocmd!
              autocmd FileType make setlocal noexpandtab
              autocmd BufNewFile,BufRead CMakeLists.txt setlocal filetype=cmake
            augroup END
            
            set autoread
            
            "*****************************************************************************
            "" Mappings
            "*****************************************************************************
            
            
            "" Tabs
            nnoremap <Tab> gt
            nnoremap <S-Tab> gT
            nnoremap <silent> <S-t> :tabnew<CR>
            
            
            "" fzf.vim
            set wildmode=list:longest,list:full
            set wildignore+=*.o,*.obj,.git,*.rbc,*.pyc,__pycache__
            let $FZF_DEFAULT_COMMAND =  "find * -path '*/\.*' -prune -o -path 'node_modules/**' -prune -o -path 'target/**' -prune -o -path 'dist/**' -prune -o  -type f -print -o -type l -print 2> /dev/null"
            
            " The Silver Searcher
            if executable('ag')
              let $FZF_DEFAULT_COMMAND = 'ag --hidden --ignore .git -g ""'
              set grepprg=ag\ --nogroup\ --nocolor
            endif
            
            " ripgrep
            if executable('rg')
              let $FZF_DEFAULT_COMMAND = 'rg --files --hidden --follow --glob "!.git/*"'
              set grepprg=rg\ --vimgrep
              command! -bang -nargs=* Find call fzf#vim#grep('rg --column --line-number --no-heading --fixed-strings --ignore-case --hidden --follow --glob "!.git/*" --color "always" '.shellescape(<q-args>).'| tr -d "\017"', 1, <bang>0)
            endif
            
            cnoremap <C-P> <C-R>=expand("%:p:h") . "/" <CR>
            
            " snippets
            let g:UltiSnipsExpandTrigger="<tab>"
            let g:UltiSnipsJumpForwardTrigger="<tab>"
            let g:UltiSnipsJumpBackwardTrigger="<c-b>"
            let g:UltiSnipsEditSplit="vertical"
            
            " ale
            let g:ale_linters = {'javascript' : ['eslint']}
            
            " Tagbar
            nmap <silent> <F4> :TagbarToggle<CR>
            let g:tagbar_autofocus = 1
            
            " Disable visualbell
            set noerrorbells visualbell t_vb=
            if has('autocmd')
              autocmd GUIEnter * set visualbell t_vb=
            endif
            
            "" Copy/Paste/Cut
            if has('unnamedplus')
              set clipboard=unnamed,unnamedplus
            endif
            
            noremap YY "+y<CR>
            noremap <leader>p "+gP<CR>
            noremap XX "+x<CR>
            
            if has('macunix')
              " pbcopy for OSX copy/paste
              vmap <C-x> :!pbcopy<CR>
              vmap <C-c> :w !pbcopy<CR><CR>
            endif
            
            
            
            "" Switching windows
            noremap <C-j> <C-w>j
            noremap <C-k> <C-w>k
            noremap <C-l> <C-w>l
            noremap <C-h> <C-w>h
            
            "" Vmap for maintain Visual Mode after shifting > and <
            vmap < <gv
            vmap > >gv
            
            "" Move visual block
            vnoremap J :m '>+1<CR>gv=gv
            vnoremap K :m '<-2<CR>gv=gv
            
            
            "*****************************************************************************
            "" Custom configs
            "*****************************************************************************
            
            " c
            autocmd FileType c setlocal tabstop=2 shiftwidth=2 expandtab 
            autocmd FileType c let g:loaded_nvimgdb = 1
            autocmd FileType cpp setlocal tabstop=2 shiftwidth=2 expandtab 
            autocmd FileType cpp let g:loaded_nvimgdb = 1
            
            
            " html
            " for html files, 2 spaces
            autocmd Filetype html setlocal ts=2 sw=2 expandtab
            
            
            " javascript
            let g:javascript_enable_domhtmlcss = 1
            
            " vim-javascript
            augroup vimrc-javascript
              autocmd!
              autocmd FileType javascript setl tabstop=2|setl shiftwidth=2|setl expandtab softtabstop=2
            augroup END
            
            
            " python
            " vim-python
            augroup vimrc-python
              autocmd!
              autocmd FileType python setlocal expandtab shiftwidth=2 tabstop=4 colorcolumn=79
                  \ formatoptions+=croq softtabstop=2
                  \ cinwords=if,elif,else,for,while,try,except,finally,def,class,with
            augroup END
            
            " jedi-vim
            let g:jedi#popup_on_dot = 0
            let g:jedi#goto_assignments_command = "<leader>g"
            let g:jedi#goto_definitions_command = "<leader>d"
            let g:jedi#documentation_command = "K"
            let g:jedi#usages_command = "<leader>n"
            let g:jedi#rename_command = "<leader>r"
            let g:jedi#show_call_signatures = "0"
            let g:jedi#completions_command = "<C-Space>"
            let g:jedi#smart_auto_mappings = 0
            
            " ale
            :call extend(g:ale_linters, {
                \'python': ['flake8'], })
            
            " vim-airline
            let g:airline#extensions#virtualenv#enabled = 1
            
            " Syntax highlight
            " Default highlight is better than polyglot
            let g:polyglot_disabled = ['python']
            let python_highlight_all = 1
            
            
            
            "*****************************************************************************
            "*****************************************************************************
            
            "" Include user's local vim config
            if filereadable(expand("~/.config/nvim/local_init.vim"))
              source ~/.config/nvim/local_init.vim
            endif
            
            "*****************************************************************************
            "" Convenience variables
            "*****************************************************************************
            
            " vim-airline
            if !exists('g:airline_symbols')
              let g:airline_symbols = {}
            endif
            
            if !exists('g:airline_powerline_fonts')
              let g:airline#extensions#tabline#left_sep = ' '
              let g:airline#extensions#tabline#left_alt_sep = '|'
              let g:airline_left_sep          = '▶'
              let g:airline_left_alt_sep      = '»'
              let g:airline_right_sep         = '◀'
              let g:airline_right_alt_sep     = '«'
              let g:airline#extensions#branch#prefix     = '⤴' "➔, ➥, ⎇
              let g:airline#extensions#readonly#symbol   = '⊘'
              let g:airline#extensions#linecolumn#prefix = '¶'
              let g:airline#extensions#paste#symbol      = 'ρ'
              let g:airline_symbols.linenr    = '␊'
              let g:airline_symbols.branch    = '⎇'
              let g:airline_symbols.paste     = 'ρ'
              let g:airline_symbols.paste     = 'Þ'
              let g:airline_symbols.paste     = '∥'
              let g:airline_symbols.whitespace = 'Ξ'
            else
              let g:airline#extensions#tabline#left_sep = ''
              let g:airline#extensions#tabline#left_alt_sep = ''
            
              " powerline symbols
              let g:airline_left_sep = ''
              let g:airline_left_alt_sep = ''
              let g:airline_right_sep = ''
              let g:airline_right_alt_sep = ''
              let g:airline_symbols.branch = ''
              let g:airline_symbols.readonly = ''
              let g:airline_symbols.linenr = ''
            endif
            
            let g:deoplete#sources#clang#libclang_path='/usr/lib/llvm-6.0/lib/libclang.so'
            " grep.vim
            nnoremap <silent> <leader>f :Rgrep<CR>
            " terminal emulation
            nnoremap <silent> <leader>sh :terminal<CR>
            "" Open current line on GitHub
            nnoremap <Leader>o :.Gbrowse<CR>
            "" Clean search (highlight)
            nnoremap <silent> <leader><space> :noh<cr>
            "" Buffer nav
            noremap <leader>z :bp<CR>
            noremap <leader>q :bp<CR>
            noremap <leader>x :bn<CR>
            noremap <leader>w :bn<CR>
            
            "" Close buffer
            noremap <leader>c :bd<CR>
            
            nnoremap <silent> <leader>b :Buffers<CR>
            nnoremap <silent> <leader>e :FZF -m<CR>
            "Recovery commands from history through FZF
            nmap <leader>y :History:<CR>
            "" Set working directory
            nnoremap <leader>. :lcd %:p:h<CR>
            
            "" Opens an edit command with the path of the currently edited file filled in
            noremap <Leader>e :e <C-R>=expand("%:p:h") . "/" <CR>
            
            "" Opens a tab edit command with the path of the currently edited file filled
            noremap <Leader>te :tabe <C-R>=expand("%:p:h") . "/" <CR>
            "" Split
            noremap <Leader>h :<C-u>split<CR>
            noremap <Leader>v :<C-u>vsplit<CR>
            
            "" Git
            noremap <Leader>ga :Gwrite<CR>
            noremap <Leader>gc :Gcommit<CR>
            noremap <Leader>gsh :Gpush<CR>
            noremap <Leader>gll :Gpull<CR>
            noremap <Leader>gs :Gstatus<CR>
            noremap <Leader>gb :Gblame<CR>
            noremap <Leader>gd :Gvdiff<CR>
            noremap <Leader>gr :Gremove<CR>
            
            " session management
            nnoremap <leader>so :OpenSession<Space>
            nnoremap <leader>ss :SaveSession<Space>
            nnoremap <leader>sd :DeleteSession<CR>
            nnoremap <leader>sc :CloseSession<CR>
            color dracula
            
            
            if filereadable(expand(".local.vim"))
              source .local.vim
            endif
            
            set undofile
            set undodir=/home/lmu/.config/nvim/.vimundo

- zsh
    - `.zshrc`

            # If you come from bash you might have to change your $PATH.
            # export PATH=$HOME/bin:/usr/local/bin:$PATH
            export TERM="xterm-256color"
            TERM="xterm-256color"
            
            # Path to your oh-my-zsh installation.
            export ZSH="/home/lmu/.oh-my-zsh"
            
            # Set name of the theme to load --- if set to "random", it will
            # load a random theme each time oh-my-zsh is loaded, in which case,
            # to know which specific one was loaded, run: echo $RANDOM_THEME
            # See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
            ZSH_THEME="powerlevel9k/powerlevel9k"
            
            # Set list of themes to pick from when loading at random
            # Setting this variable when ZSH_THEME=random will cause zsh to load
            # a theme from this variable instead of looking in ~/.oh-my-zsh/themes/
            # If set to an empty array, this variable will have no effect.
            # ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )
            
            # Uncomment the following line to use case-sensitive completion.
            # CASE_SENSITIVE="true"
            
            # Uncomment the following line to use hyphen-insensitive completion.
            # Case-sensitive completion must be off. _ and - will be interchangeable.
            # HYPHEN_INSENSITIVE="true"
            
            # Uncomment the following line to disable bi-weekly auto-update checks.
            # DISABLE_AUTO_UPDATE="true"
            
            # Uncomment the following line to change how often to auto-update (in days).
            # export UPDATE_ZSH_DAYS=13
            
            # Uncomment the following line to disable colors in ls.
            # DISABLE_LS_COLORS="true"
            
            # Uncomment the following line to disable auto-setting terminal title.
            # DISABLE_AUTO_TITLE="true"
            
            # Uncomment the following line to enable command auto-correction.
            # ENABLE_CORRECTION="true"
            
            # Uncomment the following line to display red dots whilst waiting for completion.
            # COMPLETION_WAITING_DOTS="true"
            
            # Uncomment the following line if you want to disable marking untracked files
            # under VCS as dirty. This makes repository status check for large repositories
            # much, much faster.
            # DISABLE_UNTRACKED_FILES_DIRTY="true"
            
            # Uncomment the following line if you want to change the command execution time
            # stamp shown in the history command output.
            # You can set one of the optional three formats:
            # "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
            # or set a custom format using the strftime function format specifications,
            # see 'man strftime' for details.
            # HIST_STAMPS="mm/dd/yyyy"
            
            # Would you like to use another custom folder than $ZSH/custom?
            # ZSH_CUSTOM=/path/to/new-custom-folder
            
            # Which plugins would you like to load?
            # Standard plugins can be found in ~/.oh-my-zsh/plugins/*
            # Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
            # Example format: plugins=(rails git textmate ruby lighthouse)
            # Add wisely, as too many plugins slow down shell startup.
            plugins=(
            git
            )
            #POWERLEVEL9K_MODE="nerdfont-complete"
            POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs newline)
            POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX=" "
            POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX=""
            source $ZSH/oh-my-zsh.sh
            
            # User configuration
            
            # export MANPATH="/usr/local/man:$MANPATH"
            
            # You may need to manually set your language environment
            # export LANG=en_US.UTF-8
            
            # Preferred editor for local and remote sessions
            # if [[ -n $SSH_CONNECTION ]]; then
            #   export EDITOR='vim'
            # else
            #   export EDITOR='mvim'
            # fi
            
            # Compilation flags
            # export ARCHFLAGS="-arch x86_64"
            
            # ssh
            # export SSH_KEY_PATH="~/.ssh/rsa_id"
            
            # Set personal aliases, overriding those provided by oh-my-zsh libs,
            # plugins, and themes. Aliases can be placed here, though oh-my-zsh
            # users are encouraged to define aliases within the ZSH_CUSTOM folder.
            # For a full list of active aliases, run `alias`.
            #
            # Example aliases
            # alias zshconfig="mate ~/.zshrc"
            # alias ohmyzsh="mate ~/.oh-my-zsh"
            #if [ -z "$TMUX" ]; then exec tmux; fi
            export PATH="$HOME/.anyenv/bin:$PATH"
            eval "$(anyenv init -)"
            #eval (dircolors /path/to/dircolorsdb | head -n 1 | sed 's/^LS_COLORS=/set -x LS_COLORS /;s/;$//')
            [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
            alias g++11="g++ --std=c++11"
            source /home/lmu/.zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
            eval $(thefuck --alias) 
            alias vimwiki="nvim +VimwikiIndex"
            alias wiki="vimwiki"
            alias gotop="gotop-cjbassi"
            export EDITOR="nvim"
            source /home/lmu/.config/tmuxinator/config.zsh

- tmux
    - `.tmux.conf`

            setw -g mode-keys vi
            #set-window-option -g mode-keys vi
            bind-key -T copy-mode-vi 'v' send -X begin-selection
            bind-key -T copy-mode-vi 'V' send -X select-line
            bind-key -T copy-mode-vi 'r' send -X rectangle-toggle
            bind-key -T copy-mode-vi 'y' send -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"
            bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
            set-option -sg escape-time 10
            set -g default-terminal "screen-256-color"
            set -sg repeat-time 600
            set -s focus-events on
            
            set -g history-limit 10000
            set -g monitor-activity on
            set -g visual-activity off
            
            bind -r h select-pane -L  # move left
            bind -r j select-pane -D  # move down
            bind -r k select-pane -U  # move up
            bind -r l select-pane -R  # move right
            
            # List of plugins
            set -g @plugin 'tmux-plugins/tpm'
            set -g @plugin 'tmux-plugins/tmux-sensible'
            
            # Other examples:
            # set -g @plugin 'github_username/plugin_name'
            # set -g @plugin 'git@github.com/user/plugin'
            # set -g @plugin 'git@bitbucket.com/user/plugin'
            
            # Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
            run -b '~/.config/tmux/plugins/tpm/tpm'

    - tmuxinator
- x-server
    - `~/.xinitrc`

            #!/bin/sh
            
            # /etc/X11/xinit/xinitrc
            #
            # global xinitrc file, used by all X sessions started by xinit (startx)
            
            export QT_IM_MODULE=fcitx
            export GTK_IM_MODULE=fcitx
            export XIM=fcitx
            export XMODIFIERS=@im=fcitx
            #xrandr --newmode "1984x1280_60.00" 213.75 1984 2128 2336 2688 1280 1283 1293 1327 -hsync +vsync
            #xrandr --addmode eDP-1 "1984x1280_60.00"
            #xrandr --output eDP-1 --mode 1984x1280_60.00
            xrandr --newmode "1624x1080_60.00"  145.50  1624 1728 1896 2168  1080 1083 1093 1120 -hsync +vsync
            xrandr --addmode eDP-1 "1624x1080_60.00"
            xrandr --output eDP-1 --mode 1624x1080_60.00
            xrdb -merge /home/lmu/.Xresources
            feh --bg-scale /home/lmu/pictures/dracula.png
            xmodmap ~/.xmodmap
            exec i3
            # invoke global X session script
            #. /etc/X11/Xsession
            #exec i3 -V >> ~/.i3/i3log 2>&1

    - `~/.Xresource`

            ! Dracula Xresources palette
            *.foreground: #F8F8F2
            *.background: #282A36
            *.color0:     #000000
            *.color8:     #4D4D4D
            *.color1:     #FF5555
            *.color9:     #FF6E67
            *.color2:     #50FA7B
            *.color10:    #5AF78E
            *.color3:     #F1FA8C
            *.color11:    #F4F99D
            *.color4:     #BD93F9
            *.color12:    #CAA9FA
            *.color5:     #FF79C6
            *.color13:    #FF92D0
            *.color6:     #8BE9FD
            *.color14:    #9AEDFE
            *.color7:     #BFBFBF
            *.color15:    #E6E6E6
            
            ! do not scroll with output
            URxvt.scrollBar: false
            URxvt.font: xft:D2Coding:style=Regular:pixelsize=15
            URxvt.saveLines: 100000
            URxvt.per-ext-common: font-size, clipboard
            URxvt.keysym.C-Up:     font-size:increase
            URxvt.keysym.C-Down:   font-size:decrease
            URxvt.keysym.C-S-Up:   font-size:incglobal
            URxvt.keysym.C-S-Down: font-size:decglobal
            URxvt.keysym.C-equal:  font-size:reset
            URxvt.keysym.C-slash:  font-size:show

    - i3
        - `~/.config/i3/config`

                # This file has been auto-generated by i3-config-wizard(1).
                # It will not be overwritten, so edit it as you like.
                #
                # Should you change your keyboard layout some time, delete
                # this file and re-run i3-config-wizard(1).
                #
                
                # i3 config file (v4)
                #
                # Please see https://i3wm.org/docs/userguide.html for a complete reference!
                
                set $mod Mod4
                
                # Font for window titles. Will also be used by the bar unless a different font
                # is used in the bar {} block below.
                font pango:monospace 8
                
                # This font is widely installed, provides lots of unicode glyphs, right-to-left
                # text rendering and scalability on retina/hidpi displays (thanks to pango).
                #font pango:DejaVu Sans Mono 8
                
                # Before i3 v4.8, we used to recommend this one as the default:
                # font -misc-fixed-medium-r-normal--13-120-75-75-C-70-iso10646-1
                # The font above is very space-efficient, that is, it looks good, sharp and
                # clear in small sizes. However, its unicode glyph coverage is limited, the old
                # X core fonts rendering does not support right-to-left and this being a bitmap
                # font, it doesn’t scale on retina/hidpi displays.
                
                # Use Mouse+$mod to drag floating windows to their wanted position
                floating_modifier $mod
                
                # start a terminal
                bindsym $mod+t exec rxvt
                bindsym Mod1+Shift+t exec rxvt
                
                # kill focused window
                bindsym $mod+Shift+q kill
                
                # start dmenu (a program launcher)
                bindsym $mod+r exec dmenu_run
                # There also is the (new) i3-dmenu-desktop which only displays applications
                # shipping a .desktop file. It is a wrapper around dmenu, so you need that
                # installed.
                # bindsym $mod+d exec --no-startup-id i3-dmenu-desktop
                
                bindsym Mod1+Tab workspace next
                
                # alternatively, you can use the cursor keys:
                bindsym $mod+h focus left
                bindsym $mod+j focus down
                bindsym $mod+k focus up
                bindsym $mod+l focus right
                
                # move focused window
                bindsym $mod+Shift+h move left
                bindsym $mod+Shift+j move down
                bindsym $mod+Shift+k move up
                bindsym $mod+Shift+l move right
                
                # split in horizontal orientation
                bindsym $mod+\" split h
                
                # split in vertical orientation
                bindsym $mod+% split v
                
                # enter fullscreen mode for the focused container
                bindsym $mod+Return fullscreen toggle
                bindsym $mod+semicolon exec i3-input
                
                # change container layout (stacked, tabbed, toggle split)
                bindsym $mod+s layout stacking
                bindsym $mod+w layout tabbed
                bindsym $mod+e layout toggle split
                
                # toggle tiling / floating
                bindsym $mod+Shift+space floating toggle
                
                # change focus between tiling / floating windows
                bindsym $mod+space focus mode_toggle
                
                # focus the parent container
                bindsym $mod+a focus parent
                
                # focus the child container
                #bindsym $mod+d focus child
                
                # switch to workspace
                bindsym $mod+1 workspace 1
                bindsym $mod+2 workspace 2
                bindsym $mod+3 workspace 3
                bindsym $mod+4 workspace 4
                bindsym $mod+5 workspace 5
                bindsym $mod+6 workspace 6
                bindsym $mod+7 workspace 7
                bindsym $mod+8 workspace 8
                bindsym $mod+9 workspace 9
                bindsym $mod+0 workspace 10
                
                # move focused container to workspace
                bindsym $mod+Shift+1 move container to workspace 1
                bindsym $mod+Shift+2 move container to workspace 2
                bindsym $mod+Shift+3 move container to workspace 3
                bindsym $mod+Shift+4 move container to workspace 4
                bindsym $mod+Shift+5 move container to workspace 5
                bindsym $mod+Shift+6 move container to workspace 6
                bindsym $mod+Shift+7 move container to workspace 7
                bindsym $mod+Shift+8 move container to workspace 8
                bindsym $mod+Shift+9 move container to workspace 9
                bindsym $mod+Shift+0 move container to workspace 10
                
                # reload the configuration file
                bindsym $mod+Shift+c reload
                # restart i3 inplace (preserves your layout/session, can be used to upgrade i3)
                bindsym $mod+Shift+r restart
                # exit i3 (logs you out of your X session)
                bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'You pressed the exit shortcut. Do you really want to exit i3? This will end your X session.' -b 'Yes, exit i3' 'i3-msg exit'"
                
                # resize window (you can also use the mouse for that)
                mode "resize" {
                        # These bindings trigger as soon as you enter the resize mode
                
                        # Pressing left will shrink the window’s width.
                        # Pressing right will grow the window’s width.
                        # Pressing up will shrink the window’s height.
                        # Pressing down will grow the window’s height.
                        bindsym j resize shrink width 10 px or 10 ppt
                        bindsym k resize grow height 10 px or 10 ppt
                        bindsym l resize shrink height 10 px or 10 ppt
                        bindsym semicolon resize grow width 10 px or 10 ppt
                
                        # same bindings, but for the arrow keys
                        bindsym Left resize shrink width 10 px or 10 ppt
                        bindsym Down resize grow height 10 px or 10 ppt
                        bindsym Up resize shrink height 10 px or 10 ppt
                        bindsym Right resize grow width 10 px or 10 ppt
                
                        # back to normal: Enter or Escape
                        bindsym Return mode "default"
                        bindsym Escape mode "default"
                }
                
                # bindsym $mod+r mode "resize"
                
                # Start i3bar to display a workspace bar (plus the system information i3status
                # finds out, if available)
                #bar {
                #        status_command i3status
                #}
                exec_always --no-startup-id $HOME/.config/polybar/launch.sh
                
                gaps inner 20
                gaps outer 5
                smart_gaps on
                smart_borders on
                
                exec --no-startup-id fcitx -d

    - polybar
        - `~/.config/polybar/config`

                [settings]
                throttle-ms = 50
                throttle-limit = 5
                
                [bar/top]
                monitor = eDP-1
                width = 100%
                height = 27
                offset-y = 5
                
                background = #005f627a
                foreground = #f2f2f2
                
                overline-size = 2
                overline-color = #bc92f8
                underline-size = 2
                underline-color = #bc92f8
                
                spacing = 1
                padding-right = 2
                module-margin-left = 0
                module-margin-right = 2
                
                font-0 = NotoSans-Regular:size=8;0
                font-1 = FontAwesome:size=8;-2
                font-2 = ypn envypn:size=10;-1
                font-3 = Termsynu:size=8;-1
                font-4 = Unifont:size=6;-3
                
                modules-left = i3 bspwm
                modules-center = xwindow
                modules-right = battery volume cpu memory clock
                
                [module/bspwm]
                type = internal/bspwm
                
                format = <label-state> <label-mode>
                
                label-active = %index%
                label-active-padding = 2
                label-active-margin = 1
                label-active-font = 3
                label-active-foreground = #fff
                label-active-background = #2fbbf2
                label-active-overline = #148ebe
                label-active-underline = #148ebe
                
                label-occupied = %index%
                label-occupied-padding = 2
                label-occupied-margin = 1
                label-occupied-background = #eeeeee
                label-occupied-foreground = #dd222222
                label-occupied-overline = #c5c5c5
                label-occupied-underline = #c5c5c5
                label-occupied-font = 3
                
                label-urgent = %index%
                label-urgent-padding = 2
                label-urgent-margin = 1
                label-urgent-font = 3
                
                label-empty = %index%
                label-empty-padding = 2
                label-empty-margin = 1
                label-empty-font = 3
                
                [module/i3]
                type = internal/i3
                
                format = <label-state> <label-mode>
                format-spacing = 0
                
                label-focused = %index%
                label-focused-padding = 2
                label-focused-margin = 1
                label-focused-font = 3
                label-focused-foreground = #fff
                label-focused-background = #2fbbf2
                label-focused-overline = #148ebe
                label-focused-underline = #148ebe
                
                label-unfocused = %index%
                label-unfocused-padding = 2
                label-unfocused-margin = 1
                label-unfocused-background = #eeeeee
                label-unfocused-foreground = #dd222222
                label-unfocused-overline = #c5c5c5
                label-unfocused-underline = #c5c5c5
                label-unfocused-font = 3
                
                label-urgent = %index%
                label-urgent-padding = 2
                label-urgent-margin = 1
                label-urgent-font = 3
                
                label-visible = %index%
                label-visible-padding = 2
                label-visible-margin = 1
                label-visible-font = 3
                
                [module/cpu]
                type = internal/cpu
                interval = 0.5
                
                format = <label> <ramp-coreload>
                format-background = #66cc99
                format-foreground = #2a5c45
                format-underline = #60eaa5
                format-overline = #60eaa5
                format-padding = 2
                
                label = cpu
                label-font = 3
                
                ramp-coreload-0 = ▁
                ramp-coreload-0-font = 5
                ramp-coreload-0-foreground = #000000
                ramp-coreload-1 = ▂
                ramp-coreload-1-font = 5
                ramp-coreload-1-foreground = #000000
                ramp-coreload-2 = ▃
                ramp-coreload-2-font = 5
                ramp-coreload-2-foreground = #000000
                ramp-coreload-3 = ▄
                ramp-coreload-3-font = 5
                ramp-coreload-3-foreground = #000000
                ramp-coreload-4 = ▅
                ramp-coreload-4-font = 5
                ramp-coreload-4-foreground = #ffffff
                ramp-coreload-5 = ▆
                ramp-coreload-5-font = 5
                ramp-coreload-5-foreground = #ffffff
                ramp-coreload-6 = ▇
                ramp-coreload-6-font = 5
                ramp-coreload-6-foreground = #ff3b51
                ramp-coreload-7 = █
                ramp-coreload-7-font = 5
                ramp-coreload-7-foreground = #ff3b51
                
                [module/memory]
                type = internal/memory
                
                format = <label> <bar-used>
                format-padding = 2
                format-background = #cb66cc
                format-foreground = #ffe3ff
                format-underline = #e58de6
                format-overline = #e58de6
                
                label = memory
                label-font = 3
                
                bar-used-width = 10
                bar-used-indicator = |
                bar-used-indicator-font = 4
                bar-used-indicator-foreground = #ffaaf5
                bar-used-fill = ─
                bar-used-fill-font = 4
                bar-used-fill-foreground = #ffaaf5
                bar-used-empty = ─
                bar-used-empty-font = 4
                bar-used-empty-foreground = #934e94
                
                [module/clock]
                type = internal/date
                date = %%{T3}%Y-%m-%d %H:%M%%{T-}
                
                format-padding = 2
                format-background = #ff4279
                format-foreground = #ffcddc
                format-underline = #ff63a5
                format-overline = #ff63a5
                
                [module/volume]
                type = internal/alsa
                speaker-mixer = Speaker
                headphone-mixer = Headphone
                headphone-id = 9
                
                format-volume-padding = 2
                format-volume-background = #fff85a
                format-volume-foreground = #43433a
                format-volume-underline = #fffb8f
                format-volume-overline = #fffb8f
                
                format-muted-padding = 2
                format-muted-background = #77ffffff
                format-muted-foreground = #666666
                
                label-volume = volume %percentage%
                label-volume-font = 3
                label-muted = sound muted
                label-muted-font = 3
                
                [module/xwindow]
                type = internal/xwindow
                label-font = 3
                
                [module/battery]
                type = internal/battery
                
                ; This is useful in case the battery never reports 100% charge
                full-at = 99
                
                ; Use the following command to list batteries and adapters:
                ; $ ls -1 /sys/class/power_supply/
                battery = BAT1
                adapter = ADP1
                
                ; If an inotify event haven't been reported in this many
                ; seconds, manually poll for new values.
                ;
                ; Needed as a fallback for systems that don't report events
                ; on sysfs/procfs.
                ;
                ; Disable polling by setting the interval to 0.
                ;
                ; Default: 5
                poll-interval = 5

        - `~/.config/i3/launch.sh`

                killall -q polybar
                
                while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done
                
                polybar top >/dev/null&
                
                echo "Bars launched..."

- tig
    - `.tigrc`

            # Tig 기본 설정
            # 'man tigrc' 를 커맨드라인에서 입력하면 전체 매뉴얼을 볼 수 있다.
            
            # 설정
            # --------
            # 여기에 있는 대부분의 설정들은 toggle-* 이나 옵션 메뉴(기본값은 'o' 키)를 통해 토글할 수 있다.
            
            # 뷰 설정
            #
            # 지원되는 컬럼 유형과 옵션들:
            #
            #   author
            #    ㄴdisplay (enum) [no|full|abbreviated|email|email-user] : 작성자 정보를 표시하는가?
            #    (예: author:display=full)
            #
            #   commit-title
            #    ㄴ display (bool) : 커밋 타이틀 표시하는가?
            #    ㄴ graph (enum) [no|v2|v1] : 커밋 그래프를 보여주는가? (main view만 해당, 낮은 버전은 yes/no)
            #    ㄴ refs (bool) : 브랜치와 태그, 리모트를 보여주는가? (main view만 해당)
            #    ㄴ overflow (boolint) : 넘치는 부분에 대해 하이라이팅하는가? 활성화하면 기본값은 50이다.
            #    (예: commit-title:display=yes,graph=yes,refs=yes,overflow=no)
            #
            #   date
            #    ㄴ display (enum) [no|default|local|relative|short] : 날짜를 보여주는가?
            #    (예: date:display=default)
            #
            #   file-name
            #    ㄴ display (enum) [no|always|auto] : 파일명을 보여주는가?
            #    (예: file-name:display=auto)
            #
            #   file-size
            #    ㄴ display (enum) [no|default|units] : 파일 사이즈를 보여주는가?
            #    (예: file-size:display=default)
            #
            #   id
            #    ㄴ display (bool) : commit/tree ID를 보여주는가?
            #    (예: id:display=yes)
            #
            #   line-number
            #    ㄴ display (bool) : 줄번호를 표시하는가?
            #    ㄴ interval (int) : 줄번호 표시 간격. 기본값은 5
            #	 (예: line-number:display=yes,interval=5)
            #
            #   mode
            #    ㄴ display (bool) : 파일 모드를 표시하는가?
            #	 (예: mode:display=yes)
            #
            #   status
            #    ㄴ display (enum) [no|short|long] : status label을 표시하는가?
            #	 (예: status:display=long)
            #
            #   text
            #    ㄴ display (bool) : 텍스트를 표시하는가?
            #    ㄴ commit-title-overflow (boolint) : log view 및 diff view 에서 넘치는 부분을 하이라이팅하는가?
            #	 (예: text:display=yes)
            #
            # 모든 컬럼들은 최대 너비를 설정하기위한 width 옵션을 지원한다. 0으로 설정하면 사이즈를 자동으로 조절한다.
            
            set blame-view = date:default author:full file-name:auto id:yes,color line-number:no,interval=5 text:display=yes
            set grep-view = file-name:no line-number:yes,interval=1 text:display=yes
            set main-view = line-number:no,interval=5 id:display=yes,width=10 date:display=relative author:display=full commit-title:display=yes,graph=yes,refs=yes,overflow=no
            set refs-view = line-number:no id:no date:display=default author:full ref commit-title:display=yes
            set stash-view = line-number:no,interval=5 id:no date:default author:display=full commit-title:display=yes
            set status-view = line-number:no,interval=5 status:display=long file-name:display=always
            set tree-view = line-number:no,interval=5 mode author:full file-size date:default id:no file-name:display=always
            
            # 페이저 기반 뷰들
            set pager-view = line-number:no,interval=5 text
            set stage-view = line-number:no,interval=5 text
            set log-view = line-number:no,interval=5 text
            set blob-view = line-number:no,interval=5 text
            set diff-view = line-number:no,interval=5 text:yes,commit-title-overflow=no
            
            # UI 표시 설정
            set show-changes = yes # 메인 뷰에서 커밋들의 변경사항들을 표시하는가?
            set wrap-lines = no # 페이저 기반 뷰에서 긴 줄을 감싸는가?
            set tab-size = 4 # 탭을 확장할 때 몇 개의 공백을 사용하는가?
            set line-graphics = default # 그래프 표시방법 -> ascii, default, utf-8
            
            # 타입 기반 레퍼런스명 포맷
            #  ㄴ head : 현재 HEAD.
            #  ㄴ tag : 서명된 태그.
            #  ㄴ local-tag : 서명되지 않은 태그.
            #  ㄴ remote : 리모트.
            #  ㄴ tracked-remote : 현재 HEAD에 트랙되고 있는 리모트
            #  ㄴ replace : 교체된 레퍼런스
            #  ㄴ branch : 다른 레퍼런스.
            #
            # 만약 local-tag 를 위한 포맷이 정의되지 않으면 tag 가 사용된다.
            # 유사하게, tracked-remote 포맷이 없으면 remote 가 사용된다.
            # 레퍼런스 타입을 보여주지 않으려면 hide:remote 과 같이 hide: 프리픽스를 사용하면 된다.
            # 포맷 문자열의 리스트 구분은 스페이스(공백)으로 한다.
            set reference-format = [branch] <tag> {remote} ~replace~
            
            # Git으로 부터 어떻게 정보를 읽을지를 조절하는 설정들
            set commit-order = auto # Enum: auto, default, topo, date, reverse (main view)
            set status-show-untracked-dirs = yes # 트래킹하고 있지 않은 디렉토리의 파일들도 보여주는가? (status)
            set ignore-space = no # Enum: no, all, some, at-eol (diff)
            set show-notes = yes # `--show-notes=...` 를 전달하는가? (diff)
            set diff-context = 6 # diff changes 를 보여줄 때 라인 수 (diff)
            #set diff-options = -C # `tig show` 명령을 위한 사용자 정의 옵션 (git-diff)
            #set blame-options = -C -C -C    # `tig blame` 명령을 위한 사용자 정의 옵션 (git-blame)
            #set log-options = --pretty=raw # `tig log` 명령을 위한 사용자 정의 옵션 (git-log)
            #set main-options = -n 1000 # `tig` 명령을 위한 사용자 정의 옵션 (git-log)
            #set mailmap = yes # 캐노니컬 이름과 이메일 주소를 보여주기 위해 .mailmap 를 사용하는가?
            
            # Misc
            set refresh-mode = auto # Enum: manual, auto, after-command, periodic
            set refresh-interval = 1 # 리프레시 주기 (초)
            set ignore-case = no # 검색시 대소문자를 무시하는가?
            # set wrap-search = yes # 검색시에 화면의 위 아래를 감싸는가?
            set focus-child = yes # 하위 화면이 열리면 포커스를 이동하는가?
            set horizontal-scroll = 50% # 스크롤하기 위한 컬럼 수의 가로 너비 비율
            set split-view-height = 70% # 위아래로 화면을 나눌 때, 아래쪽 화면의 높이
            # set split-view-width = 50% # Width of right-most view for vertical splits
            set vertical-split = vertical # Enum: horizontal, vertical, auto; 가로 너비가 허용되면 좌우 분할로 자동 변경되게 하려면 auto 를 사용한다.
            set editor-line-number = yes # 에디터에 라인 번호를 자동으로 넘기는가? diff 등에서 해당 라인 위치까지 바로 이동하고 싶을 때 사용한다.
            set mouse = no # 마우스를 사용하도록 하는가?
            set mouse-scroll = 3 # 마우스로 스크롤할 때 한번에 넘길 라인수
            
            # 사용자 정의 커맨드 (가장 유용한 부분)
            # -----------------------------------
            #
            # 이 커맨드들은 Tig 안에서 바로 쉘 커맨드를 실행할 수 있게 해준다.
            # 별도의 규정이 없는 한, 커맨드들은 포어그라운드에서 실행되어 콘솔 출력을 함께 보여준다.
            # 여러개의 커맨드 옵션들을 지정할 수도 있는데, 예를 들어 "?<git commit" 와 같은 경우 실행할 지를 사용자에게 묻고 난 후,
            # 실행이 끝나면 Tig 를 종료시킬 것이다. (? 는 묻는 것이고, < 는 종료이므로..)
            #
            #   !    기본값으로, 커맨드를 포어그라운드에서 실행하고 결과를 보여준다.
            #   @    커맨드를 백그라운드에서 실행하고 결과도 보여주지 않는다.
            #   ?    커맨드를 실행하기 전에 사용자에게 실행할지를 묻는다.
            #   <    커맨드 실행을 마치면 Tig를 종료한다.
            #
            #
            # 사용자 정의 커맨드를 실행할 키를 바인드할 때는 "bind 키를-바인드할-화면 바인드할-키 커맨드" 의 순서로 선언하게 된다.
            # 키를 바인드할 화면은 main, diff, log, tree, blob, blame, refs, pager, help, status, stage, stash, grep 이 있고,
            # 모든 화면에서 바인드할 경우, generic 을 화면명으로 지정하면 된다.
            # 바인드할 키는 대소문자, <C-D>, ^d, <Down> 등으로 표기한다.
            #   사용 가능한 키 바인딩:
            #   <Enter>, <Space>, <Backspace>, <Tab>, <Escape> 또는 <Esc>, <Left>, <Right>, <Up>, <Down>, <Insert> 또는 <Ins>,
            #   <Delete> 또는 <Del>, <Hash>, <LessThan> 또는 <LT>, <Home>, <End>, <PageUp> 또는 <PgUp>, <PageDown> 또는 <PgDown>,
            #   <F1>, <F2>, <F3>, <F4>, <F5>, <F6>, <F7>, <F8>, <F9>, <F10>, <F11>, <F12>
            #
            # 사용자 정의 커맨드는 Tig의 내부 상태값을 옵션으로 참조할 수 있는데, 아래와 같은 값들이 존재한다.
            #
            #   %(head) : 현재 ref ID. 기본값은 HEAD.
            #   %(commit) : 현재 커밋 ID
            #   %(blob) : 현재 blob ID.
            #   %(branch) : 현재 브랜치명.
            #   %(remote) : 현재 리모트명.
            #   %(tag) : 현재 태그명.
            #   %(stash) : 현재 스태시(stash)명.
            #   %(directory) : tree view 에서의 현재 디렉토리 경로. 비어있으면 루트 디렉토리.
            #   %(file) : 현재 선택된 파일.
            #   %(ref) : The reference given to blame or HEAD if undefined.
            #   %(revargs) : The revision arguments passed on the command line.
            #   %(fileargs) : The file arguments passed on the command line.
            #   %(cmdlineargs) : All other options passed on the command line.
            #   %(diffargs) : The diff options from `diff-options` or `TIG_DIFF_OPTS`
            #   %(prompt) : 인자값을 입력받기 위한 프롬프트.
            
            bind main    C    ?git cherry-pick %(commit)                               # 체리픽 (해당 커밋을 현재 브랜치에 새로 커밋)
            bind main    <Hash>    !@bash -c "echo -n %(commit) | pbcopy"              # 현재 커밋의 해시를 복사
            bind main    R    ?git rebase -i %(commit)                                 # 커밋의 순서를 재정렬하고 첨삭
            bind main    !    ?git rebase --abort                                      # 리베이스를 취소
            bind main    L    ?git pull --rebase %(remote) "%(prompt Branch name to pull : )"   # 리모트에서 변경사항 가져오기
            bind main    P    ?git push %(remote) "%(prompt Branch name to push : )"   # 리모트에 변경사항 커밋
            bind main    <C-P>    ?git push --force %(remote) "%(prompt Branch name to +push : )"  # 리모트에 변경사항 강제 커밋bind main    T    !git tag "%(prompt Tag name : )" %(commit)               # 해당 커밋에 태그 추가
            bind main    <C-T>    ?git push %(remote) %(tag)                           # 리모트에 현재 태그 커밋
            
            bind status    C    !git commit                                            # 스테이지(인덱스)에 올라간 파일 로컬에 커밋하기
            bind status    S    ?git stash save --keep-index "%(prompt Stash name : )" # 스테이지 올라가지 않은 파일 스테시에 올리기
            
            bind stash    P    ?git stash pop %(stash)                                 # 스테시에서 꺼내오기
            bind stash    !    ?git stash drop %(stash)                                # 스테시 초기화하기
            
            bind refs    C    ?git checkout %(branch)                                  # 선택한 브랜치 체크아웃하기
            bind refs    B    ?git branch "%(prompt Branch name to create : )"         # 입력한 브랜치 생성하고 체크아웃하기
            bind refs    !    ?git branch -D %(branch)                                 # 선택한 브랜치 삭제하기
            
            
            
            # 기본 커맨드
            # ---------------
            
            # 화면 전환 키 설정
            bind generic    m    view-main
            bind generic    d    view-diff
            bind generic    l    view-log
            bind generic    t    view-tree
            bind generic    f    view-blob
            bind generic    b    view-blame
            bind generic    r    view-refs
            bind generic    p    view-pager
            bind generic    h    view-help
            bind generic    s    view-status
            # bind generic    S    view-status
            bind generic    c    view-stage
            # bind generic    y    view-stash
            bind generic    y    none                   # 기본 키바인딩을 제거
            bind generic    S    view-stash
            bind generic    g    view-grep
            
            
            # 화면 조작 키 설정
            bind generic    <Enter>    enter            # 선택된 엔트리를 열거나 들어간다.
            #bind generic    <Down>     next             # 다음으로 이동한다.
            # bind generic    <C-N>      next
            bind generic    J          next
            # bind generic    <C-P>      previous
            bind generic    K          previous
            # bind generic    ,          parent
            bind generic    <Tab>      view-next        # 다음 뷰로 포커서를 이동
            # bind generic    R          refresh
            bind generic    <F5>       refresh          # 화면 리프레시
            bind generic    O          maximize         # 현재 화면을 전체화면으로 본다.
            bind generic    q          view-close       # 현재 화면을 닫는다.
            bind generic    Q          quit             # 모든 화면을 닫고 종료한다.
            
            bind generic    <C-N>      none             # 기존 바인딩 제거
            bind generic    J          none             # 기존 바인딩 제거
            bind generic    <C-P>      none             # 기존 바인딩 제거
            bind generic    K          none             # 기존 바인딩 제거
            bind generic    ,          none             # 기존 바인딩 제거
            bind generic    R          none             # 기존 바인딩 제거
            bind generic    <LT>       none             # 기존 바인딩 제거
            
            # 커서 및 방향 키 설정
            bind generic    j          move-down
            bind generic    k          move-up
            #bind generic    키값      move-half-page-down
            #bind generic    키값      move-half-page-up
            bind generic    <PgDown>   move-page-down
            bind generic    <C-D>      move-page-down
            bind generic    <Space>    move-page-down
            bind generic    <PgUp>     move-page-up
            bind generic    <C-U>      move-page-up
            bind generic    -          move-page-up
            bind generic    <Home>     move-first-line
            bind generic    <End>      move-last-line
            
            # 스크롤 관련 키 설정
            bind generic    |          scroll-first-col
            bind generic    <Left>     scroll-left
            bind generic    <Right>    scroll-right
            bind generic    <Ins>      scroll-line-up
            # bind generic    <C-Y>      scroll-line-up
            bind generic    <Del>      scroll-line-down
            # bind generic    <C-E>      scroll-line-down
            bind generic    <SBack>    scroll-page-up
            bind generic    <SFwd>     scroll-page-down
            
            
            # 검색 관련 키 설정
            bind generic    /          search
            # bind generic    키값       search-back
            # bind generic    n          find-next
            # bind generic    N          find-prev
            bind generic    .          find-next
            bind generic    ,          find-prev
            # 검색 중 사용되는 네이게이션 키 설정
            # bind search    <Down>      find-next
            # bind search    <C-N>       find-next
            # bind search    <C-J>       find-next
            # bind search    <Up>        find-prev
            # bind search    <C-P>       find-prev
            # bind search    <C-K>       find-prev
            
            
            # 옵션 조작 키 설정
            bind generic    o          options                            # 옵션 메뉴 열기
            # 옵션을 쉽게 끄고 켜기 위한 키 바인딩
            bind generic    I          :toggle sort-order                 # 오름차순/내림차순
            bind generic    i          :toggle sort-field                 # 정렬 기준 필드
            bind generic    <Hash>     :toggle line-number                # 줄번호
            bind generic    D          :toggle date                       # 날짜
            bind generic    A          :toggle author                     # 저작자
            bind generic    ~          :toggle line-graphics              # 그래픽 모드
            bind generic    F          :toggle file-name                  # 이름
            # bind generic    키값       :toogle show-changes               # 로컬 변경사항 표시
            bind generic    W          :toggle ignore-space               # diff 화면에서 공백 무시
            # bind generic    키값       :toggle commit-order               # 커밋 순서 정렬
            bind generic    X          :toggle id                         # 커밋 ID 표시
            bind generic    $          :toggle commit-title-overflow      # 커밋 제목 넘침 하이라이팅
            # bind generic    키값       :toggle file-size                  # 파일 크기 형식
            # bind generic    키값       :toggle status                     # 상태 표시
            # bind generic    키값       :toggle status-untracked-dirs      # 트래킹하지 않는 디렉토리의 파일 표시
            # bind generic    키값       :toggle vertical-split             # 좌우로 창 나누기
            bind generic    %          :toggle file-filter
            
            
            # 기타 키 설정
            bind generic    e    edit                # 에디터로 편집한다.
            bind generic    :    prompt              # 프롬프트를 연다.
            bind generic    <C-L>    screen-redraw   # 화면을 다시 그린다.
            bind generic    z    stop-loading        # 로딩을 중단한다.
            bind generic    v    show-version        # Tig 버전을 표시한다.
            
            
            # 화면별 키 설정
            bind status    u    status-update           # 파일을 인덱스에 추가/삭제한다.
            bind status    !    status-revert           # 파일의 변경 사항을 Revert 한다.
            bind status    M    status-merge            # git-mergetool(1) 을 연다.
            # bind status    키값    :toggle status       # 짧은/긴 status label 을 표시한다.
            
            bind stage    u    status-update            # Stage/unstage current diff (c)hunk
            bind stage    1    stage-update-line        # Stage/unstage current line
            bind stage    !    status-revert            # Revert current diff (c)hunk
            bind stage    \    stage-split-chunk        # Split current diff (c)hunk
            bind stage    @    :/^@@                    # Jump to next (c)hunk
            bind stage    [    :toggle diff-context -1  # Decrease the diff context
            bind stage    ]    :toggle diff-context +1  # Increase the diff context
            bind stage    <Down>    move-down
            bind stage    <Up>    move-up
            
            bind diff    @    :/^@@                     # Jump to next (c)hunk
            bind diff    [    :toggle diff-context -1
            bind diff    ]    :toggle diff-context +1
            bind diff    <Down>    move-down
            bind diff    <Up>    move-up
            
            bind blob    <Down>    move-down
            bind blob    <Up>    move-up
            
            bind main    G    :toggle commit-title-graph # Toggle revision graph visualization
            bind main    F    :toggle commit-title-refs  # Toggle reference display (tags/branches)
            
            
            # 색상 설정
            # ------
            
            # UI 의 색상들도 변경가능하다. 게다가 pager, blob, diff, stage 화면 요소의 색상들도
            # 큰 따옴표로 감싼 텍스트 매칭으로 찾아서 새로운 색으로 지정해줄 수 있다.
            #
            # 아래와 같이 설정하면 Signed-off-by 라는 문구가 있는 줄의 색상을 글자는 노란색,
            # 배경은 기본색으로 지정하게 된다.
            #
            #    color "    Signed-off-by"    yellow    default
            #
            # 위에서 보면 처음에 네 칸의 공백을 두고 있는데, Git 에서 커밋 메시지에 자동으로
            # 네 개의 공백을 추가하기 때문이다.
            #
            # 아래와 같이 화면의 이름을 프리픽스로 붙이면 해당 화면에만 해당하는 색상을 지정해줄 수 있다.
            #
            #    color grep.file blue default
            #
            
            color  "diff --"             yellow  default
            color  "--- "                yellow  default
            color  "+++ "                yellow  default
            color  "@@"                  magenta  default
            color  "+"                   green  default
            color  " +"                  green  default
            color  "-"                   red  default
            color  " -"                  red  default
            color  "index "              blue  default
            color  "old file mode "      yellow  default
            color  "new file mode "      yellow  default
            color  "deleted file mode "  yellow  default
            color  "copy from "          yellow  default
            color  "copy to "            yellow  default
            color  "rename from "        yellow  default
            color  "rename to "          yellow  default
            color  "similarity "         yellow  default
            color  "dissimilarity "      yellow  default
            color  "diff-tree "          blue  default
            color  "Author: "            cyan  default
            color  "Commit: "            magenta  default
            color  "Tagger: "            magenta  default
            color  "Merge: "             blue  default
            color  "Date: "              yellow  default
            color  "AuthorDate: "        yellow  default
            color  "CommitDate: "        yellow  default
            color  "TaggerDate: "        yellow  default
            color  "Refs: "              red  default
            color  "Reflog: "            red  default
            color  "Reflog message: "    yellow  default
            color  "stash@{"             magenta  default
            color  "commit "             green  default
            color  "parent "             blue  default
            color  "tree "               blue  default
            color  "author "             green  default
            color  "committer "          magenta  default
            color  "    Signed-off-by"   yellow  default
            color  "    Acked-by"        yellow  default
            color  "    Tested-by"       yellow  default
            color  "    Reviewed-by"     yellow  default
            color  default               default  default  normal
            color  cursor                white  green  bold
            color  status                green  default
            color  delimiter             magenta  default
            color  date                  blue  default
            color  mode                  cyan  default
            color  id                    magenta  default
            color  overflow              red  default
            color  header                yellow  default
            color  section               cyan  default
            color  directory             yellow  default
            color  file                  default  default
            color  grep.file             blue  default
            color  file-size             default  default
            color  line-number           cyan  default
            color  title-blur            white  blue
            color  title-focus           white  blue  bold
            color  main-commit           default  default
            color  main-tag              magenta  default  bold
            color  main-local-tag        magenta  default
            color  main-remote           yellow  default
            color  main-replace          cyan  default
            color  main-tracked          yellow  default  bold
            color  main-ref              cyan  default
            color  main-head             cyan  default  bold
            color  stat-none             default  default
            color  stat-staged           magenta  default
            color  stat-unstaged         magenta  default
            color  stat-untracked        magenta  default
            color  help-group            blue  default
            color  help-action           yellow  default
            color  diff-stat             blue  default
            color  palette-0             magenta  default
            color  palette-1             yellow  default
            color  palette-2             cyan  default
            color  palette-3             green  default
            color  palette-4             default  default
            color  palette-5             white  default
            color  palette-6             red  default
            # color  palette-7             magenta  default  bold
            # color  palette-8             yellow  default  bold
            # color  palette-9             cyan  default  bold
            # color  palette-10            green  default  bold
            # color  palette-11            default  default  bold
            # color  palette-12            white  default  bold
            # color  palette-13            red  default  bold
            color  graph-commit          red  default
            # color  search-result         black  yellow
            
            
            # git configuration 으로부터 읽은 색상들 매핑. "no" 라고 설정하면 비활성화된다.
            set git-colors = \
                branch.current=main-head \
                branch.local=main-ref \
                branch.plain=main-ref \
                branch.remote=main-remote \
                \
                diff.meta=diff-header \
                diff.meta=diff-index \
                diff.meta=diff-oldmode \
                diff.meta=diff-newmode \
                diff.frag=diff-chunk \
                diff.old=diff-del \
                diff.new=diff-add \
                \
                grep.filename=grep.file \
                grep.linenumber=grep.line-number \
                grep.separator=grep.delimiter \
                \
                status.branch=status.header \
                status.added=stat-staged \
                status.updated=stat-staged \
                status.changed=stat-unstaged \
                status.untracked=stat-untracked

- capslock to ctrl

        #/etc/default/keyboard
        XKBOPTIONS="ctrl:nocaps"
