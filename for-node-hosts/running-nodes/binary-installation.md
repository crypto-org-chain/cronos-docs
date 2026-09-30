---
hidden: true
---

# Binary Installation

`cronosd` is bundled with the Cronos EVM code. You can either install an official pre-built release binary or reproducibly build it yourself with Nix.

### Build Prerequisites

* You can get the latest `cronosd` binary here from the [release page](https://github.com/crypto-org-chain/cronos/releases).

### Option 1: Install the official release binary

We officially support macOS, Windows, and Linux only.

To simplify the following step, we will be using **Linux** (Intel x86) for illustration.\
Binaries for **Mac** ([Intel x86](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Darwin_x86_64.tar.gz) / [M1](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Darwin_arm64.tar.gz)) and [Windows](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Windows_x86_64.zip) are also available.

* To install released **Cronos Mainnet binaries** from github:
* Create a new folder for the Install e.g. (cronosmainnet):

```bash
$ cd cronosmainnet
$ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.6.11/cronos_0.6.11_Linux_x86_64.tar.gz
$ tar -zxvf cronos_0.6.11_Linux_x86_64.tar.gz
```

Afterward, you can check the version of `cronosd` by:

```bash
$ cd cronosmainnet/bin
$ ./cronosd version
0.6.11
```

Once you have obtained the latest `cronosd` binary, run:

```bash
$ cronosd [command]
```

There is also a `-h, --help` command available:

```bash
$ cronosd -h
```

#### Config and data directory

By default, your configuration and data are stored in the folder located in the `~/.cronos` directory.\
\
Ensure that you have backed up your wallet after creating it. Otherwise, your funds may be inaccessible in the event of an accident.

To specify the cronosd config and data storage directory, you can add a global flag `--home <directory>`.

### Option 2: Build with Nix

It is also possible to reproducibly build `cronosd` binaries locally yourself using nix.

#### Prerequisites

* Install `nix`, following the instructions here: [https://nixos.org/download.html](https://nixos.org/download.html)
* Install cachix and enable cronos binary cache:

```
nix-env -iA cachix -f https://cachix.org/api/v1/install
cachix use cronos
```

#### Build Type Matrix

Below are listed the different possible parameters

* **Network Type**
  * `mainnet` (default)
  * `testnet`
* **Build Type**
  * normal nix package (default)
  * re-distributable bundle
  * re-distributable tarball, the tarball of the above bundle.

#### Creating a reproducible build

The package name is constructed by joining the above properties with a separator `-`, omitting the default values, for example:

* `cronosd:` defaults to the `mainnet` nix package.
* `cronosd-bundle:` `mainnet` re-distributable bundle.
* `cronosd-tarball:` `mainnet` re-distributable tarball.
* `cronosd-testnet:` `testnet` nix package.
* `cronosd-testnet-tarball:` `testnet` re-distributable tarball.

The nix flake url is: `github:crypto-org-chain/cronos/$TAG_NAME#$PACKAGE_NAME`,\
replace the `$TAG_NAME` and `$PACKAGE_NAME` to the one you needed, for example:\
\
The full command to build a `v0.8.1` `mainnet` re-distributable tarball is:

```shell
nix build github:crypto-org-chain/cronos/v0.8.1#cronosd-tarball

result -> /nix/store/dlhqc2ii8jj1ryrgki90l6j92r2by06g-bundle-cronosd-v0.8.1
```

The result will reside in `./result` by default, you can copy the tarball to other machines with the same OS and arch. The re-distributable bundle/tarball has dynamic libraries included, no extra runtime dependencies are needed.

```bash
mkdir tmp/cronosd
tar xfz ./result -C /tmp/cronosd/
```

{% hint style="info" %}
If you get `error: experimental Nix feature 'nix-command' is disabled`;\
use '--extra-experimental-features nix-command' to override, e.g. by adding:\
\
`--extra-experimental-features nix-command`\
`--extra-experimental-features flakes`
{% endhint %}

#### Tarball Content

To keep the tarball redistributable, it has all the runtime dependencies included, the dynamic linker, and the shared libraries. They are located in a relative path, so it's important that the whole package is moved together.

* `bin/cronosd:` the entry point, it's a wrapper script that executes the binary using the included dynamic linker.
* `exe/cronosd:` the executable.
* `lib/:` all the shared libraries.
