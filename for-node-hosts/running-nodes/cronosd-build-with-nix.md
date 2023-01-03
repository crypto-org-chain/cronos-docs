# Cronosd build with Nix

It is also possible to reproducibly build `cronosd` binaries locally yourself using nix.

### Prerequisites

* Install `nix`, following the instructions here: [https://nixos.org/download.html](https://nixos.org/download.html)
*   Install cachix and enable cronos binary cache:

    <pre><code><strong>nix-env -iA cachix -f https://cachix.org/api/v1/install
    </strong>cachix use cronos

    </code></pre>

### Build Type Matrix

Below are listed the different possible parameters

* **Network Type**
  * `mainnet` (default)
  * `testnet`
* **DB Backend**
  * `rocksdb` (default)
  * `goleveldb`
* **Build Type**
  * normal nix package (default)
  * re-distributable bundle
  * re-distributable tarball, the tarball of the above bundle.

### Creating a reproducible build

The package name is constructed by joining the above three properties with a separator `-`, omitting the default values, for example:

* `cronosd:` defaults to the `mainnet` `rocksdb` nix package.
* `cronosd-tarball:` `mainnet` `rocksdb` re-distributable tarball.
* `cronosd-goleveldb-tarball:` `mainnet` `goleveldb` re-distributable tarball.
* `cronosd-testnet-goleveldb-tarball:` `testnet` `goleveldb` re-distributable tarball.

The nix flake url is: `github:crypto-org-chain/cronos/$TAG_NAME#$PACKAGE_NAME`, \
replace the `$TAG_NAME` and `$PACKAGE_NAME` to the one you needed, for example: \
\
The full command to build a `v0.8.1` `rocksdb` `mainnet` re-distributable tarball is:

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
If you get `error: experimental Nix feature 'nix-command' is disabled`; \
use '--extra-experimental-features nix-command' to override, e.g. by adding:\
\
`--extra-experimental-features nix-command` \
`--extra-experimental-features flakes`
{% endhint %}

### Tarball Content

To keep the tarball redistributable, it has all the runtime dependencies included, the dynamic linker, and the shared libraries. They are located in a relative path, so it's important that the whole package is moved together.

* `bin/cronosd:` the entry point, it's a wrapper script that executes the binary using the included dynamic linker.
* `exe/cronosd:` the executable.
* `lib/:` all the shared libraries.

