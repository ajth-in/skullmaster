#!/usr/bin/env bash

SESSION="skullmaster"

tmux has-session -t "$SESSION" 2>/dev/null && {
  tmux attach -t "$SESSION"
  exit
}

tmux new-session -d -s "$SESSION"

tmux split-window -h -p 20

tmux split-window -v -t "$SESSION":0.1

tmux send-keys -t "$SESSION":0.1 \
  'pnpm --filter="@skullmaster/react" dev' C-m

tmux send-keys -t "$SESSION":0.2 \
  'pnpm --filter="@skullmaster/server" dev' C-m

tmux split-window -v -p 30 -t "$SESSION":0.0

tmux send-keys -t "$SESSION":0.3 \
  'cd apps/demo && pnpm skullmaster serve' C-m

tmux select-pane -t "$SESSION":0.0

tmux attach -t "$SESSION"