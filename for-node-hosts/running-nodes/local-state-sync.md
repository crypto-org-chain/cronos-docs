# Local State Sync

In [Cronos v1.0.12](https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.12), we introduced a new set of commands to do local state sync, the full command help screen is:

```bash
$ cronosd snapshots --help
Manage local snapshots

Usage:
  cronosd snapshots [command]

Available Commands:
  delete      Delete a local snapshot
  dump        Dump the snapshot as portable archive format
  export      Export app state to snapshot store
  list        List local snapshots
  load        Load a snapshot archive file (.tar.gz) into snapshot store
  restore     Restore app state from local snapshot

Flags:
  -h, --help   help for snapshots

Global Flags:
      --home string         directory for config and data (default "/Users/yihuang/.cronos")
      --log_format string   The logging format (json|plain) (default "plain")
      --log_level string    The logging level (trace|debug|info|warn|error|fatal|panic) (default "info")
      --trace               print out full stack trace on errors

Use "cronosd snapshots [command] --help" for more information about a command.
```

#### Local State Sync

Before we dive into local state sync, let's understand a "normal" state sync first. After you setup state-sync in config and start the node, the node will do the following procedure:

1. Discover snapshots on the p2p network.
2. Verify the snapshot metadata by verifying the block headers between the snapshot and the trusted block height.
3. Download snapshot chunks from the p2p network.
4. Restore app state from the downloaded snapshot chunks.
5. Bootstrap cometbft state.
6. Start normal sync.

With a "normal" state sync, the procedure is done automatically on startup, it works great when the state is small, but as the chain grows, the procedure becomes slow and unstable.

The new local state sync commands try to break down this procedure into smaller steps:

1. Discover and download snapshots from out-of-band communications, for example community shared snapshots on a http server.
2.  User downloads shared snapshots and imports into the local snapshot database.

    ```bash
    $ cronosd snapshots load /path/to/downloaded-snapshot.tar.gz
    $ cronosd snapshots list
    <height> <format>
    ```
3.  Restore app state from the snapshot (this step is much faster with [MemIAVL](https://github.com/crypto-org-chain/cronos/wiki/MemIAVL) than current iavl):

    ```bash
    $ cronosd snapshots restore <height> <format>
    ```

    3a. (Optional) If you want to enable versiondb together, you need to restore the versiondb from the snapshot as well:

    ```bash
    $ cronosd changeset restore-versiondb <height> <format>
    ```
4.  Verify and bootstrap cometbft state based on current app state and state sync configuration:

    ```bash
    $ cronosd tendermint bootstrap-state
    ```

    This step requires the `statesync.*` configurations in `config.toml`, to be the same as you would setup for a "normal" state sync.
5. Start the node and sync normally.

#### Snapshot Provider

Alternatively, a snapshot provider can dump local snapshots into a portable tarball which can be shared across the network:

```bash
$ cronosd snapshots dump <height> <format> --output /path/to/snapshot.tar.gz
```

Normally the snapshots are generated automatically using config `state-sync.snapshot-interval`, with these new commands, one can also manually export arbitrary versions of the state.

```bash
$ cronosd snapshots export --height <height>
$ cronosd snapshots list
<height> <format>
```
