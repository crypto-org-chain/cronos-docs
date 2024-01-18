# MemIAVL

{% hint style="danger" %}
WARNING: EXPERIMENTAL
{% endhint %}

`Memiavl` is a drop-in replacement for the current iavl implementation, offering a huge performance boost ([benchmark](https://github.com/crypto-org-chain/cronos/wiki/MemIAVL-Benchmark)) for the node. MemIAVL can be enabled by turning on the `memiavl.enable` config item in the `app.toml.`It uses a standalone db directory `data/memiavl.db.` You can always disable it again, in that case the `data/application.db` will use the default iavl again, so it's ok to switch between them back and forth.

`Memiavl` only supports **pruned nodes**, the default configuration(`memiavl.snapshot-keep-recent=0`) should be set equivalent to `pruning=everything.` In order to support historical grpc queries, you should enable versiondb together with memiavl, if you need to support archive merkle proof generations, don't use `memiavl!`



The default `memiavl` section in `app.toml`:

```bash
[memiavl]

# Enable defines if the memiavl should be enabled.
enable = false

# ZeroCopy defines if the memiavl should return slices pointing to mmap-ed buffers directly (zero-copy),
# the zero-copied slices must not be retained beyond current block's execution.
zero-copy = false

# AsyncCommitBuffer defines the size of asynchronous commit queue, this greatly improve block catching-up
# performance, -1 means synchronous commit.
async-commit-buffer = 0

# SnapshotKeepRecent defines what many old snapshots (excluding the latest one) to keep after new snapshots are taken.
snapshot-keep-recent = 0

# SnapshotInterval defines the block interval the memiavl snapshot is taken, default to 1000.
snapshot-interval = 1000

# CacheSize defines the size of the cache for each memiavl store, default to 1000.
cache-size = 1000
```

### Use Cases

#### Semi-Archived Node

When versiondb was released, we recommend users to setup a pruned iavl tree together with versiondb, to setup a semi-archived node, you can replace the pruned iavl tree with `memiavl` now.

#### State Sync Node

`Memiavl` can do state-sync snapshot restoration much faster than the current iavl, it's actually much faster than the chunk downloading speed, with `memiavl`, allowing state-sync node to be bootstrapped in around 10 minutes depending on the internet speed. If you download a snapshot from CDN and do a local restoration, it can even be faster. Just enable memiavl in `app.toml` before starting a state-sync.

#### Snapshot Providers

`memiavl` can do state-sync snapshot exports much faster as well, on Cronos mainnet, snapshots can be exported in minutes instead of days, so it's recommended to run snapshot provider nodes with `memiavl`, so the snapshots will be much more up-to-date.

### Migrate Semi-Archive Node

To migrate a semi-archive versionDB node to memiavl, you just need to restore a memiavl db to the same current height as the versiondb, then continue normal syncing from there, we can use local state-sync commands to do that:

```bash
# download a snapshot whose version is smaller than versiondb's latest version
$ cronosd snapshots load /path/to/downloaded-snapshot.tar.gz

# check the snapshot height and format in list command
$ cronosd snapshots list

# edit app.toml to enable memiavl
$ cronosd snapshots restore <snapshot height> 2

# edit app.toml to disable versiondb, and set `memiavl.async-commit-buffer = -1`
$ cronosd start --halt-height <versiondb height>

# edit app.toml to enable versiondb, and set `memiavl.async-commit-buffer = 0 or small positive number` to re-enable async commit.
$ cronosd start
```

### Compression

Right now memiavl doesn't do any generic compressions to the data files, that would kill the simplicity of the current implementation, and probably hurt performance if not done right. Fortunately, on the linux filesystem level compressions work well with `mmap.` We can run memiavl on `btrfs` configured with `zstd` compression, and observe around \~60% compression rate on memiavl directory, with no visible performance regression. So this is the recommended way to run memiavl for efficient disk space usage.

