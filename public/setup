#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  setup-vm-shortcuts.sh
#  Terminal-only keyboard shortcuts for a Linux VM.
#  No DE, no X11, no Wayland — just shell and terminal goodies.
#
#  Usage:  chmod +x setup-vm-shortcuts.sh && ./setup-vm-shortcuts.sh
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════
#  READLINE (.inputrc)
# ═══════════════════════════════════════════════════════════════════
setup_inputrc() {
  cat >"${HOME}/.inputrc" <<'INPUTRC'
# ── Inputrc: terminal keybindings ──────────────────────────
$include /etc/inputrc

# History search by typing prefix then up/down
"\e[A": history-search-backward
"\e[B": history-search-forward

# Word navigation: Ctrl+Left / Ctrl+Right
"\e[1;5D": backward-word
"\e[1;5C": forward-word

# Word delete: Ctrl+Backspace / Ctrl+Del
"\e[3;5~": kill-word
"\C-w": unix-word-rubout

# Line navigation
"\C-a": beginning-of-line
"\C-e": end-of-line

# Undo
"\C-x\C-u": undo

# Case-insensitive tab completion
set completion-ignore-case on

# Show all completions on first tab
set show-all-if-ambiguous on

# Cycle through menu completion
"\C-i": menu-complete
INPUTRC
  echo "  ✓ ~/.inputrc — readline shortcuts"
}

# ═══════════════════════════════════════════════════════════════════
#  SHELL ALIASES
# ═══════════════════════════════════════════════════════════════════
ALIASES_BLOCK=$(
  cat <<'ALIASES'

# === setup-vm-shortcuts.sh: aliases ===
alias x='exit'
alias cls='clear'
alias c='clear'
alias q='exit'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias ll='ls -lah --color=auto'
alias la='ls -A --color=auto'
alias ls='ls --color=auto'
alias l='ls -CF --color=auto'
alias gits='git status'
alias gita='git add .'
alias gitc='git commit -m'
alias gpush='git push'
alias gpull='git pull'
alias gc='git clone'
alias glog='git log --oneline --graph --all --decorate -20'
alias gdiff='git diff'
alias nv='nvim '
alias v='nvim '
alias vi='nvim '
alias notes='nvim ~/notes.txt'
alias nrd='npm run dev'
alias dev='mkdir -p ~/dev && cd ~/dev'
alias ports='ss -tlnp'
alias myip='curl -s ifconfig.me && echo'
alias df='df -h'
alias du='du -sh * | sort -h'
alias grep='grep --color=auto'
alias mkdir='mkdir -pv'
alias untar='tar -xzvf'
alias wget='wget --show-progress'
alias path='echo -e ${PATH//:/\\n}'
alias weather='curl -s wttr.in | head -20'
ALIASES
)

setup_aliases() {
  for rc in ".bashrc" ".zshrc"; do
    rcpath="${HOME}/${rc}"
    if [ -f "$rcpath" ]; then
      if grep -q "setup-vm-shortcuts.sh: aliases" "$rcpath" 2>/dev/null; then
        echo "  ✓ ${rc} — aliases already present"
      else
        echo "$ALIASES_BLOCK" >>"$rcpath"
        echo "  ✓ ${rc} — aliases appended"
      fi
    fi
  done
}

# ═══════════════════════════════════════════════════════════════════
#  TMUX (if installed)
# ═══════════════════════════════════════════════════════════════════
setup_tmux() {
  if ! command -v tmux &>/dev/null; then
    echo "  - tmux not installed — skipping"
    return
  fi

  mkdir -p "${HOME}/.config/tmux"
  cat >"${HOME}/.config/tmux/tmux.conf" <<'TMUX_CONF'
# ── Tmux config ────────────────────────────────────────────
set -g base-index 1
set -g pane-base-index 1
set -g history-limit 50000

# Use Ctrl+A as prefix (more convenient than Ctrl+B)
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# Reload config
bind r source-file ~/.config/tmux/tmux.conf \; display "Reloaded!"

# Split panes
bind | split-window -h
bind - split-window -v

# Move between panes with Alt+arrows
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Resize panes with Ctrl+arrows
bind -n C-Left resize-pane -L 5
bind -n C-Right resize-pane -R 5
bind -n C-Up resize-pane -U 5
bind -n C-Down resize-pane -D 5

# Window navigation
bind n next-window
bind p prev-window
bind c new-window
bind , rename-window
bind w choose-window

# Mouse support (scroll, resize, select)
set -g mouse on
set -g mode-keys vi
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-selection-and-cancel

# Status bar
set -g status-bg colour235
set -g status-fg white
set -g status-left '#[fg=green]#S '
set -g status-right '#[fg=yellow]%Y-%m-%d %H:%M '
set -g window-status-current-style fg=cyan,bold

# 256 colors
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",*256col*:Tc"
TMUX_CONF
  echo "  ✓ ~/.config/tmux/tmux.conf — tmux shortcuts"
}

# ═══════════════════════════════════════════════════════════════════
#  SHELL OPTIONS (.bashrc / .zshrc additions)
# ═══════════════════════════════════════════════════════════════════
SHELL_OPTS_BLOCK=$(
  cat <<'SHELLOPTS'

# === setup-vm-shortcuts.sh: shell options ===
# Better history
export HISTSIZE=50000
export HISTFILESIZE=50000
export HISTCONTROL=ignoreboth:erasedups
export HISTTIMEFORMAT="%F %T "
shopt -s histappend 2>/dev/null || true

# Autocorrect typos on cd
shopt -s cdspell 2>/dev/null || true

# Case-insensitive glob
shopt -s nocaseglob 2>/dev/null || true

# Fuzzy cd: type partial dir name and cd
shopt -s autocd 2>/dev/null || true

# Check window size after each command
shopt -s checkwinsize 2>/dev/null || true
SHELLOPTS
)

setup_shell_opts() {
  for rc in ".bashrc" ".zshrc"; do
    rcpath="${HOME}/${rc}"
    if [ -f "$rcpath" ]; then
      if grep -q "setup-vm-shortcuts.sh: shell options" "$rcpath" 2>/dev/null; then
        echo "  ✓ ${rc} — shell options already present"
      else
        echo "$SHELL_OPTS_BLOCK" >>"$rcpath"
        echo "  ✓ ${rc} — shell options appended"
      fi
    fi
  done
}

# ═══════════════════════════════════════════════════════════════════
#  FZF (if installed — fuzzy finder keybindings)
# ═══════════════════════════════════════════════════════════════════
setup_fzf() {
  if ! command -v fzf &>/dev/null; then
    echo "  - fzf not installed — skipping (install for Ctrl+R / Ctrl+T history search)"
    return
  fi

  # fzf ships its own keybindings setup script
  if [ -f "/usr/share/fzf/key-bindings.bash" ]; then
    for rc in ".bashrc" ".zshrc"; do
      rcpath="${HOME}/${rc}"
      if [ -f "$rcpath" ]; then
        line="source /usr/share/fzf/key-bindings.bash 2>/dev/null || true"
        if ! grep -q "fzf/key-bindings.bash" "$rcpath" 2>/dev/null; then
          echo "" >>"$rcpath"
          echo "# fzf keybindings (Ctrl+R history, Ctrl+T files, Alt+C cd)" >>"$rcpath"
          echo "$line" >>"$rcpath"
          echo "  ✓ ${rc} — fzf keybindings sourced"
        fi
      fi
    done
  elif [ -f "/usr/share/fzf/shell/key-bindings.bash" ]; then
    for rc in ".bashrc" ".zshrc"; do
      rcpath="${HOME}/${rc}"
      if [ -f "$rcpath" ]; then
        line="source /usr/share/fzf/shell/key-bindings.bash 2>/dev/null || true"
        if ! grep -q "fzf" "$rcpath" 2>/dev/null; then
          echo "" >>"$rcpath"
          echo "# fzf keybindings" >>"$rcpath"
          echo "$line" >>"$rcpath"
        fi
      fi
    done
  fi

  echo "  ✓ fzf keybindings activated (Ctrl+R, Ctrl+T, Alt+C)"
}

# ═══════════════════════════════════════════════════════════════════
#  GITCONFIG
# ═══════════════════════════════════════════════════════════════════
setup_gitconfig() {
  cat >"${HOME}/.gitconfig" <<-GITCONF
[alias]
  s = status
  a = add .
  c = commit -m
  p = push
  pl = pull
  co = checkout
  cob = checkout -b
  b = branch
  m = merge
  d = diff
  lg = log --oneline --graph --all --decorate -20
  undo = reset --soft HEAD~1
  last = log -1 HEAD
  stash = stash
  st = status
[color]
  ui = auto
[push]
  default = simple
[pull]
  rebase = false
GITCONF
  echo "  ✓ ~/.gitconfig — git aliases"
}

# ═══════════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════════

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Terminal Shortcuts Installer (no DE)               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

setup_inputrc
echo ""
setup_aliases
echo ""
setup_shell_opts
echo ""
setup_tmux
echo ""
setup_fzf
echo ""
setup_gitconfig

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                       Summary                              ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Ctrl+R         — history search (fzf: fuzzy)              ║"
echo "║  Ctrl+T         — fzf file search                         ║"
echo "║  Up/Down        — search history by prefix                 ║"
echo "║  Ctrl+Left/Right — word navigation                        ║"
echo "║  Ctrl+Backspace  — delete word backward                   ║"
echo "║  Ctrl+A / Ctrl+E — start / end of line                    ║"
echo "║  Tab             — menu-complete                           ║"
echo "║  Tmux prefix    — Ctrl+A                                   ║"
echo "║  Tmux split     │ — horizontal, - — vertical              ║"
echo "║  Tmux arrows    — Alt+arrows to switch, Ctrl+arrows resize║"
echo "║                                                           ║"
echo "║  Aliases: gits, gita, gc, nv, nrd, glog, cls, .., ...    ║"
echo "║  Git:       git s, git a, git c, git lg, git co, git d   ║"
echo "║                                                           ║"
echo "║  Run 'source ~/.bashrc' or re-login to pick up changes.   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
