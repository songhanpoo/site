---
title: "Stop Using Heavy IDEs: My 2026 LazyVim Setup"
description: Why let a heavy IDE hog gigabytes of your RAM when you can have a blazing-fast, mouse-free development environment that launches instantly? In this series, I walk through my complete 2026 LazyVim configuration. Discover how I replaced massive, bloated applications with a highly optimized, terminal-based setup that handles complex codebases, smart auto-completion, and deep ecosystem integrations—all while keeping system resource usage near zero.
publishedDate: July 09, 2026
poster: /articles/lazyvim-series/lazyvim-series-bg.png
series: "LazyVim"
seriesPart: 1
---

Stop letting your development tools intent your system performance. If your local workspace requires multiple gigabytes of memory just to edit text and run a few terminal commands, it's time for a change.

Welcome to the first installment of my LazyVim series. Today, we are stripping away the bloated UI layers and building a mouse-free, hyper-optimized development environment right inside the terminal. Whether you're looking to reclaim your system resources, speed up your engineering velocity, or finally master a keyboard-driven workflow, this step-by-step guide will take you from an empty configuration file to a fully capable, modern development machine.

---


## Why I Left Traditional IDEs Behind

To be honest, I used to be a massive fan of **VSCode**. It is incredibly sleek out of the box, and features like multi-cursor editing and quick-fix commands made my coding workflow feel great. 

However, things started falling apart when my project workload grew. As a **DevOps engineer**, my daily routine involves juggling multiple **heavy repositories**, infrastructure workspaces, and complex pipelines simultaneously. Running all of that in a traditional desktop editor quickly turned my local machine into a laggy, **resource-heavy bottleneck.**

That was the turning point that forced me to research alternatives. Since my role already requires me to spend a major chunk of my time using standard **Vim** directly on remote staging and production servers, moving my local environment to the terminal felt like a natural next step. That is when I discovered **NeoVim** and the sheer speed and efficiency of the **LazyVim** ecosystem completely blew me away.

## Prequensites

### NeoVim Setting ups
  So many way to install neovim, it's up to you. [check it out here](https://neovim.io/doc/install/)


```bash
# linux x86
curl -LO https://github.com/neovim/neovim/releases/download/nightly/nvim-macos-x86_64.tar.gz
tar xzf nvim-macos-x86_64.tar.gz
./nvim-macos-x86_64/bin/nvim

# linux arm
curl -LO https://github.com/neovim/neovim/releases/download/nightly/nvim-macos-arm64.tar.gz
tar xzf nvim-macos-arm64.tar.gz
./nvim-macos-arm64/bin/nvim

# macos
brew install neovim
```


### Where are configurations stored ?
NeoVim follows standard operating system directory patterns. Depending on what machine you are using, your configuration files are stored in the following folders:

| operating system | configuration directory patterns | 
| ------------- | -------------- | 
| Linux / macos | `~/.config/nvim/` | 
| Windows | `%\localappdata%\nvim\ (usually C:\Users\YourName\AppData\Local\nvim\)` | 


```bash
~/.config/nvim/
├── lua/
│   ├── config/
│   │   ├── keymaps.lua   # Your custom shortcuts (like Ctrl+b)
│   │   ├── lazy.lua      # Core plugin manager bootstrapper
│   │   └── options.lua   # Global settings (like relative line numbers)
│   └── plugins/
│       ├── nvim-surround.lua  # Your custom plugin overrides!
│       └── example.lua
├── init.lua              # The main entrypoint file NeoVim reads first
└── lazy-lock.json        # Keeps track of the exact versions of plugins installed
```



### LazyVim Setting ups

#### install from scratch 

Make a backup of your current Neovim files:

```bash
# required
mv ~/.config/nvim{,.bak}
# optional but recommended
mv ~/.local/share/nvim{,.bak}
mv ~/.local/state/nvim{,.bak}
mv ~/.cache/nvim{,.bak}
```


Clone the starter & remove `.git` folder, so you can add it your own repo latert
```bash
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
 ``` 


#### clone my dotfiles for setting ups

Step 1 - First, open your terminal and clone your repository to a folder on your machine (for example, right in your home directory or a projects folder):

```bash
cd ~
git clone https://github.com/songhanpoo/dotfiles.git
cd dotfiles
```

Step 2 - If you already have a working LazyVim layout set up locally, let's move it out of the hidden standard directory and put it directly inside your new dotfiles folder:

```bash
# Create a destination directory inside your repo
mkdir -p ~/dotfiles/nvim

# Copy or move your existing custom configs into the repo folder
cp -r ~/.config/nvim/* ~/dotfiles/nvim/
```

Step 3 - NeoVim only looks at ~/.config/nvim/ to run. To make it read your repo files instead, we create a symlink (a shortcut link between folders):
```bash
# Back up your old native folder just in case
mv ~/.config/nvim ~/.config/nvim.bak

# Create a symlink pointing from your system to your repository folder
ln -s ~/dotfiles/colorscheme ~/.config/colorscheme
ln -s ~/dotfiles/ghostty ~/.config/ghostty
ln -s ~/dotfiles/nvim ~/.config/nvim
ln -s ~/dotfiles/skhd ~/.config/skhd
ln -s ~/dotfiles/tmux/tmux.conf ~/.tmux.conf
ln -s ~/dotfiles/yabai ~/.config/yabai
ln -s ~/dotfiles/yazi ~/.config/yazi
```

## Happy Coding

![LazyVim](/articles/lazyvim-series/lazyvim-demo-1.png)


