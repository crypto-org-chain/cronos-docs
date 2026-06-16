# Snapshot Downloader

The Snapshot Downloader is a Rust-based automation tool that downloads a blockchain binary, snapshot (single or multi-part), and address book, then automatically extracts the binary and snapshot, initializes the node, merges custom settings into <mark style="color:orange;">`app.toml`</mark> and <mark style="color:orange;">`config.toml`</mark>, and starts the chain. It also provides lifecycle hooks to execute commands at different stages (post-download, post-extraction, post-start).

This guide walks you through the installation, setup, and configuration of the Snapshot Downloader for running a Cronos node. Follow the steps in order, adapting to your hardware setup (e.g. number of disks).

### Environment Setup

The tool works best on Linux with Btrfs, as the tool leverages Btrfs subvolumes for efficient snapshot handling. On Linux, users can manually create snapshots of subvolumes and roll back to previous states if needed.

On macOS and Windows, the downloader still supports snapshot download, extraction, and node start, but Btrfs-specific snapshot and rollback features are unavailable.

**Note:** On Windows, it requires a Unix-compatible shell (e.g., Git Bash) to run the tool.

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

### Configure Snapshot Downloader `config.yaml`

The tool supports single-file or multi-part snapshots, custom lifecycle hooks, and TOML overrides for node configuration.

This example demonstrates a multi-part archive snapshot, including an <mark style="color:orange;">`addrbook`</mark> download.

#### Choose Snapshot

Checkout the latest snapshots at [https://snapshot.cronos.com/](https://snapshot.cronos.com/)

#### Update DB Settings

In `snapshot-downloader2/config.yaml`, under the `app_yaml` and `config_yaml` sections, update the database settings according to the target snapshot database type and pruning type, along with any other desired configurations. Follow the same pattern as:

```
[file_yaml]:
    [section]:
        name: "value"
```

Below are examples of each database with pruning type `Default` , overriding  `minimum-gas-prices` and `persistent_peers`.

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
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656"
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
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656"
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
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656"
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
    persistent_peers: "0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656"
```
{% endtab %}
{% endtabs %}

#### Full Config Examples

Below are examples of `snapshot-downloader2/config.yaml` for Cronos EVM. Update URLs, chain IDs, and settings as needed for the latest snapshots and binaries.

*   **Cronos EVM Mainnet Example 1: Single File**&#x20;

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

### Running the Tool

Once configured, run the tool with:

```sh
$ cargo run
```

Monitor the output for progress. The tool will handle downloads, extractions, initialization, and startup. Use lifecycle hooks ( `post_snapshot_download_command` `post_snapshot_extract_command` and `post_start_command` ) for custom automation.

{% hint style="info" %}
To re-run the tool without re-downloading or re-extracting the snapshot, run:

```sh
$ cargo run --skip-download-snapshot --skip-extract-snapshot
```
{% endhint %}

For troubleshooting, check logs in the workspace directory or adjust retry settings in the config. Always verify snapshot and binary URLs from official sources for the latest versions.
