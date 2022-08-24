# README

\


![Cronos Logo](docs/.vuepress/public/cronos.svg)

\


## Cronos Gitbook Documentation

The documentation in this repository site is meant to provide specifications and implementation details on Gitbook that will be useful developers or contributors to the main repository.

### Getting Started

#### Contributing

1. Fork this repository on Github
2. Clone your forked repository with `git clone https://github.com/YOURUSERNAME/cronos-docs.git`
3. `cd cronos-docs`
4. `git checkout gitbook` to switch to the gitbook branch.
5. `git checkout -b [NewBranch]` create a new branch and push your commits.
6. Finally open a Pull Request.

### Adding new page to the docs

1. Create a markdown file `[Newfile.md]` under one of the main categories, e.g. `for-users/`, `for-node-hosts/`, `for-dapp-developers/` or `cronos-play/`
2. Open `SUMMARY.md` and add the new markdown file in the right file structure, e.g.

```md
## FOR USERS

* [MetaMask](for-users/metamask.md)
* [Bridge](for-users/bridge/README.md)
  * [New file](for-users/bridge/Newfile.md)
```

### Style guide

* Use 3 levels at most
* Categorise docs mostly per user, dapp, node hosts, Cronos play
* Keep docs/sentences short, DRY and modular
* Use tabs, tables, hints and relative page links
* Double check SUMMARY.md and prefer the use of horizontal images

For more information on styling and syntax, refer to [https://docs.gitbook.com/](https://docs.gitbook.com/)
