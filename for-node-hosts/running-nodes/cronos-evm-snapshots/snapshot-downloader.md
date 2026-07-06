# Snapshot Downloader

The Snapshot Downloader is a Rust-based tool that automates setting up a Cronos node from a snapshot. It supports two modes:

* **Download only:** Run with `--profile` to download a snapshot without any configuration file.
* **Full setup:** Configure `config.yaml` and run `cargo run` to go through the full node setup lifecycle.

This guide walks you through installation, setup, and configuration. Follow the steps in order, adapting to your hardware setup (e.g. number of disks).

### Environment Setup

The tool works best on Linux with Btrfs, as it leverages Btrfs subvolumes for efficient snapshot handling. On Linux, users can manually create snapshots of subvolumes and roll back to previous states if needed.

On macOS and Windows, the downloader still supports snapshot download, extraction, and node start, but Btrfs-specific snapshot and rollback features are unavailable.

**Note:** On Windows, it requires a Unix-compatible shell (e.g. Git Bash) to run the tool.

<details>

<summary><strong>Linux Only – Btrfs Setup</strong></summary>

**Install `btrfs-progs`**

```sh
sudo apt install -y btrfs-progs
```

**Format and Mount Disk(s)**

Choose one of the below according to the number of additional disk(s) mounted.

**Format and Mount 2 Disks**

```sh
sudo parted /dev/nvme0n2 -- mklabel gpt
sudo parted /dev/nvme0n2 -- mkpart downloads btrfs 0% 100%
sudo mkfs.btrfs /dev/nvme0n2p1
sudo parted /dev/nvme0n3 -- mklabel gpt
sudo parted /dev/nvme0n3 -- mkpart chain-data btrfs 0% 100%
sudo mkfs.btrfs /dev/nvme0n3p1
mkdir -p ~/test
sudo mount /dev/nvme0n3p1 ~/test
sudo btrfs sub create ~/test/data
sudo btrfs sub create ~/test/data/.snapshots
```

```sh
mkdir -p ~/.snapshot-downloader/downloads
mkdir -p ~/.snapshot-downloader/workspace/home/data
```

```sh
sudo mount /dev/nvme0n2p1 ~/.snapshot-downloader/downloads
sudo mount -osubvol=data /dev/nvme0n3p1 ~/.snapshot-downloader/workspace/home/data
sudo chown -R $USER ~/.snapshot-downloader/downloads
sudo chown -R 1001:1002 ~/.snapshot-downloader/workspace/home/data
```

**Format and Mount 1 Disk**

```sh
sudo parted /dev/nvme0n2 -- mklabel gpt
sudo parted /dev/nvme0n2 -- mkpart downloads btrfs 0% 100%
sudo mkfs.btrfs /dev/nvme0n2p1
```

```sh
mkdir -p ~/.snapshot-downloader
```

```sh
sudo mount /dev/nvme0n2p1 ~/.snapshot-downloader
sudo chown -R $USER ~/.snapshot-downloader
```

**Resize Disk (Optional)**

```sh
sudo growpart /dev/nvme0n3 1
sudo btrfs filesystem resize max ~/.snapshot-downloader/workspace/home/data
```

</details>

### Dependencies Installation

Install Rust using the official installer.

```sh
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ . "$HOME/.cargo/env"
```

Install other dependencies needed for building Rust projects.

```sh
$ sudo apt install -y gcc libssl-dev pkg-config
```

### Build Snapshot Downloader

```sh
$ git clone https://github.com/whs-dot-hk/snapshot-downloader2.git
$ cd snapshot-downloader2
$ cargo build
```

***

### Mode 1: Download Snapshot Only

Run with `--profile` to download a snapshot without a `config.yaml` file.

```sh
$ cargo run -- --profile cronos-{network}-{dbType}-{pruneType}
```

Full available `profile` list:

{% tabs %}
{% tab title="Cronos EVM Mainnet" %}
```
cronos-mainnet-leveldb-archive
cronos-mainnet-leveldb-default
cronos-mainnet-leveldb-pruned
cronos-mainnet-rocksdb-archive
cronos-mainnet-rocksdb-default
cronos-mainnet-rocksdb-pruned
cronos-mainnet-versiondb-archive
cronos-mainnet-versiondb-pruned
cronos-mainnet-versiondb-memiavl-none
```
{% endtab %}

{% tab title="Cronos EVM Testnet" %}
```
cronos-testnet-leveldb-archive
cronos-testnet-leveldb-default
cronos-testnet-leveldb-pruned
cronos-testnet-rocksdb-archive
cronos-testnet-rocksdb-default
cronos-testnet-rocksdb-pruned
cronos-testnet-versiondb-archive
cronos-testnet-versiondb-default
cronos-testnet-versiondb-pruned
cronos-testnet-versiondb-memiavl-none
```
{% endtab %}

{% tab title="Cronos POS Mainnet" %}
```
cronos-pos-mainnet-leveldb-archive
cronos-pos-mainnet-leveldb-default
cronos-pos-mainnet-leveldb-pruned
cronos-pos-mainnet-rocksdb-archive
cronos-pos-mainnet-rocksdb-default
cronos-pos-mainnet-rocksdb-pruned
cronos-pos-mainnet-versiondb-pruned
```
{% endtab %}

{% tab title="Cronos POS Testnet" %}
```
cronos-pos-testnet-leveldb-pruned
cronos-pos-testnet-rocksdb-pruned
cronos-pos-testnet-versiondb-pruned
```
{% endtab %}
{% endtabs %}

***

### Mode 2: Full Node Setup with config.yaml

With `config.yaml`, the downloader runs through a 6-step lifecycle to set up and start a full node automatically.

**Lifecycle steps:**

1. Download and extract `cronosd` binary
2. Run `cronosd init`
3. Download snapshot
4. Extract snapshot
5. Update `app.toml` and `config.toml`
6. Start `cronosd`

#### Choose Snapshot

Check the latest snapshots at [https://snapshot.cronos.com/](https://snapshot.cronos.com/).

#### Update DB Settings

In `snapshot-downloader2/config.yaml`, under the `app_yaml` and `config_yaml` sections, update the database settings according to the target snapshot database type and pruning type, along with any other desired configurations. Follow the same pattern as:

```
[file_yaml]:
    [section]:
        name: "value"
```

Below are examples of each database with pruning type `Default`, overriding `minimum-gas-prices` and `persistent_peers`.

{% tabs %}
{% tab title="GolevelDB" %}
```
app_yaml:
  minimum-gas-prices: "0.025basecro"
  pruning: "nothing"
  app-db-backend: "goleveldb"

config_yaml:
  db_backend: "goleveldb"
  p2p:
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"
```
{% endtab %}

{% tab title="RocksDB" %}
```
app_yaml:
  minimum-gas-prices: "0.025basecro"
  pruning: "nothing"
  app-db-backend: "rocksdb"

config_yaml:
  db_backend: "rocksdb"
  p2p:
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"
```
{% endtab %}

{% tab title="VersionDB" %}
```
app_yaml:
  minimum-gas-prices: "0.025basecro"
  pruning: "nothing"
  app-db-backend: "rocksdb"
  versiondb:
    enable: true

config_yaml:
  db_backend: "rocksdb"
  p2p:
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"
```
{% endtab %}

{% tab title="VersionDB Memiavl" %}
```
app_yaml:
  minimum-gas-prices: "0.025basecro"
  pruning: "nothing"
  app-db-backend: "rocksdb"
  versiondb:
    enable: true
  memiavl:
    enable: true
    async-commit-buffer: 3

config_yaml:
  db_backend: "rocksdb"
  p2p:
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"
```
{% endtab %}
{% endtabs %}

#### Full Config Examples

Below are examples of `snapshot-downloader2/config.yaml` for Cronos EVM. Update URLs, chain IDs, and settings as needed for the latest snapshots and binaries.

*   **Cronos EVM Mainnet Example 1: Single File**

    This example uses a single file snapshot for the Cronos EVM chain.

    ```
    # Snapshot Downloader Configuration

    # URL for the snapshot to download (for single file snapshots)
    snapshot_url: "https://snapshot.cronos.com/cronos/mainnet-snapshot/leveldb/default/cronosmainnet_25-1_leveldb-default-20250922.tar.lz4"

    # URLs for multi-part snapshots (alternative to snapshot_url)
    # If snapshot_urls is provided, it will be used instead of snapshot_url
    # snapshot_urls:
    #   - "https://example.com/cosmos-snapshot.part001.tar.gz"
    #   - "https://example.com/cosmos-snapshot.part002.tar.gz"
    #   - "https://example.com/cosmos-snapshot.part003.tar.gz"

    # Final filename for multi-part snapshots (REQUIRED when using snapshot_urls)
    # This specifies what the final concatenated file should be called
    # snapshot_filename: "cosmos-snapshot.tar.gz"

    # URL for the binary to download
    binary_url: "https://github.com/crypto-org-chain/cronos/releases/download/v1.4.9/cronos_1.4.9_Linux_arm64.tar.gz"

    # Relative path to the binary within the workspace directory
    # This is used to locate the binary after extraction
    binary_relative_path: "bin/cronosd"

    # Chain ID for the Cosmos network
    chain_id: "cronosmainnet_25-1"

    # Moniker (node name) to use when initializing
    moniker: "my-cosmos-node"

    # Custom home directory for the chain (optional)
    # If not specified, defaults to ~/.snapshot-downloader/workspace/home
    # chain_home_dir: "/mnt/data/cosmos-home"

    # URL for the addrbook.json file (optional)
    # If specified, this file will be downloaded and placed in the config directory
    # addrbook_url: "https://example.com/addrbook.json"

    # Download retry configuration (optional)
    # These settings control how downloads are retried when they fail or are interrupted
    download_retry:
      # Maximum number of retry attempts (default: 5)
      max_retries: 5
      # Initial delay between retries in seconds (default: 1)
      initial_delay_secs: 1
      # Maximum delay between retries in seconds (default: 300 = 5 minutes)
      max_delay_secs: 300
      # Exponential backoff multiplier (default: 2.0)
      backoff_multiplier: 2.0
      # Request timeout in seconds (default: 30)
      request_timeout_secs: 30

    # Command to execute after snapshot download completes (optional)
    # This will run only after snapshot download, not after binary download
    # post_snapshot_download_command: "echo 'Snapshot download completed'"

    # Command to execute after snapshot extraction (optional)
    # This will only run if a snapshot is successfully extracted
    post_snapshot_extract_command: "echo 'Snapshot extraction completed'"

    # Command to execute after cosmos node starts and specific pattern is detected (optional)
    # This will run after the node starts and the post_start_pattern is found in the output
    # post_start_command: "echo 'Node started and pattern detected'"

    # Pattern to search for in cosmos node output (optional)
    # When this pattern is found in the node output, the post_start_command will be executed
    # Can be any message you want to wait for after node startup
    # post_start_pattern: "committed state"

    # Whether to stop the cosmos node and exit the program after executing post_start_command (optional)
    # If true, the cosmos node will be terminated and the program will exit after post_start_command completes
    # stop_after_post_start: false

    # Configuration overrides for app.toml
    # These values will be merged with the existing app.toml file
    app_yaml:
      minimum-gas-prices: "46000000000000basecro"
      pruning: "nothing"
      app-db-backend: "goleveldb"

    # Configuration overrides for config.toml
    # These values will be merged with the existing config.toml file
    config_yaml:
      db_backend: "goleveldb"
      p2p:
        persistent_peers: "dc9905490007f7271d0f884a2dd659db0366c1c0@13.215.127.128:26656"
    ```
*   **Cronos EVM Mainnet Example 2: Multi-part**

    This example demonstrates a multi-part archive snapshot, including an <mark style="color:orange;">`addrbook`</mark> download.

    ```
    # Snapshot Downloader Configuration

    # URL for the snapshot to download (for single file snapshots)
    #snapshot_url: "https://snapshot.cronos.com/cronos/mainnet-snapshot/leveldb/default/cronosmainnet_25-1_leveldb-default-20250922.tar.lz4"

    # URLs for multi-part snapshots (alternative to snapshot_url)
    # If snapshot_urls is provided, it will be used instead of snapshot_url
    snapshot_urls:
      - "https://snapshot.cronos.com/cronos/mainnet-snapshot/leveldb/archive/cronosmainnet_25-1_leveldb-archive-20250923.tar.lz4.part001"
      - "https://snapshot.cronos.com/cronos/mainnet-snapshot/leveldb/archive/cronosmainnet_25-1_leveldb-archive-20250923.tar.lz4.part002"

    # Final filename for multi-part snapshots (REQUIRED when using snapshot_urls)
    # This specifies what the final concatenated file should be called
    snapshot_filename: "cronosmainnet_25-1_leveldb-archive-20250923.tar.lz4"

    # URL for the binary to download
    binary_url: "https://github.com/crypto-org-chain/cronos/releases/download/v1.4.9/cronos_1.4.9_Linux_arm64.tar.gz"

    # Relative path to the binary within the workspace directory
    # This is used to locate the binary after extraction
    binary_relative_path: "bin/cronosd"

    # Chain ID for the Cosmos network
    chain_id: "cronosmainnet_25-1"

    # Moniker (node name) to use when initializing
    moniker: "my-cosmos-node"

    # Custom home directory for the chain (optional)
    # If not specified, defaults to ~/.snapshot-downloader/workspace/home
    # chain_home_dir: "/mnt/data/cosmos-home"

    # URL for the addrbook.json file (optional)
    # If specified, this file will be downloaded and placed in the config directory
    addrbook_url: "https://snapshots.polkachu.com/addrbook/cronos/addrbook.json"

    # Download retry configuration (optional)
    # These settings control how downloads are retried when they fail or are interrupted
    download_retry:
      # Maximum number of retry attempts (default: 5)
      max_retries: 5
      # Initial delay between retries in seconds (default: 1)
      initial_delay_secs: 1
      # Maximum delay between retries in seconds (default: 300 = 5 minutes)
      max_delay_secs: 300
      # Exponential backoff multiplier (default: 2.0)
      backoff_multiplier: 2.0
      # Request timeout in seconds (default: 30)
      request_timeout_secs: 30

    # Command to execute after snapshot download completes (optional)
    # This will run only after snapshot download, not after binary download
    # post_snapshot_download_command: "echo 'Snapshot download completed'"

    # Command to execute after snapshot extraction (optional)
    # This will only run if a snapshot is successfully extracted
    post_snapshot_extract_command: "echo 'Snapshot extraction completed'"

    # Command to execute after cosmos node starts and specific pattern is detected (optional)
    # This will run after the node starts and the post_start_pattern is found in the output
    # post_start_command: "echo 'Node started and pattern detected'"

    # Pattern to search for in cosmos node output (optional)
    # When this pattern is found in the node output, the post_start_command will be executed
    # Can be any message you want to wait for after node startup
    # post_start_pattern: "committed state"

    # Whether to stop the cosmos node and exit the program after executing post_start_command (optional)
    # If true, the cosmos node will be terminated and the program will exit after post_start_command completes
    # stop_after_post_start: false

    # Configuration overrides for app.toml
    # These values will be merged with the existing app.toml file
    app_yaml:
      minimum-gas-prices: "46000000000000basecro"
      pruning: "nothing"
      app-db-backend: "goleveldb"

    # Configuration overrides for config.toml
    # These values will be merged with the existing config.toml file
    config_yaml:
      db_backend: "goleveldb"
      p2p:
        persistent_peers: "dc9905490007f7271d0f884a2dd659db0366c1c0@13.215.127.128:26656"
    ```

#### Run The Tool

Once configured, run:

```sh
$ cargo run
```

The tool will go through all 6 steps in order. Use lifecycle hooks (`post_snapshot_download_command`, `post_snapshot_extract_command`, `post_start_command`) for any custom automation between steps.

#### Skipping Steps

You can skip one or more steps by passing skip flags. This is useful when re-running the tool after a partial run, or when certain steps have already been completed.

| Flag                       | Skips                                         |
| -------------------------- | --------------------------------------------- |
| `--skip-binary-download`   | Step 1: Download and extract `cronosd` binary |
| `--skip-download-snapshot` | Step 3: Download snapshot                     |
| `--skip-extract-snapshot`  | Step 4: Extract snapshot                      |
| `--skip-download-addrbook` | Addrbook download (if `addrbook_url` is set)  |
| `--skip-execute-binary`    | Step 6: Start `cronosd`                       |

{% hint style="info" %}
Steps 2 (init) and 5 (update config) always run and cannot be skipped.
{% endhint %}

**Examples**

Re-run without re-downloading or re-extracting the snapshot:

```sh
$ cargo run -- --skip-download-snapshot --skip-extract-snapshot
```

Re-run from scratch but skip starting the node:

```sh
$ cargo run -- --skip-execute-binary
```

Skip everything except starting the node:

```sh
$ cargo run -- --skip-binary-download --skip-download-snapshot --skip-extract-snapshot
```
