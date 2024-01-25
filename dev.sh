#!/bin/bash

# Define session name
session="DevSessionSOM"

# Kill prior session if it exists
tmux kill-session -t $session

# Start a new session and detach from it
tmux -f ./.tmux.conf new-session -d -s $session

tmux split-window -v -t $session
tmux split-window -v -t $session
tmux split-window -v -t $session

tmux select-layout even-vertical

# DevConsole
#tmux rename-pane -t DevSession:0.3 'DevConsole'

# DevServe
#tmux rename-pane -t DevSession:0.2 'DevServe'
tmux send-keys -t $session:0.0 'pnpm run dev' C-m

# DevTest
#tmux renname-pane -t DevSession:0.1 'DevTest'
tmux send-keys -t $session:0.1 'pnpm test' C-m

# Type Check
#tmux rename-pane -t DevSession:0.0 'TypeCheck'
tmux send-keys -t $session:0.2 'pnpm run type-check' C-m

tmux select-pane -t $session:0.3

tmux attach -t $session