# VersionDB

### Overview

Anyone that has been running archive nodes for a while, is familiar with the issue of the ever growing disk size of their nodes. For Cronos, the IAVL database of archived nodes, the `application.db` usually grows, but does not shrink. A solution that we have come up with is to replace the current RocksDB with `VersionDB`.

`VersionDB` stores multiple versions of on-chain state key-value pairs, without using a merkelized tree structure like IAVL tree, making both DB size and query performance much better than IAVL trees. However, VersionDB does not perform root hash and Merkle proof generation, so for those features we still need the IAVL tree. Grpc queries don't need to support proof generation, so VersionDB alone is enough to support this. Currently the `--grpc-only` flag for one to start a standalone grpc query service.

After migrating to VersionDB, you can then prune the IAVL tree to reclaim disk size if you don't need to generate Merkle proofs on historical versions.



### Limitations

The limitations of the setup with VersionDB and pruned IAVL tree are:

* Currently, this solution is only recommended for **archive** and **non-validator nodes** to try (validator nodes are recommended to do pruning).
* Different implementations exist for VersionDB. Our current implementation is based on **RocksDB'**s v7's experimental user-defined timestamp, which stores the data in a standalone **RocksDB** instance. it does not support other db backends yet. The other databases in the node still support multiple backends as before.
* Does not support `eth_getProof, non-grpc / abci_query` for the historical versions that's pruned in IAVL tree. The other APIs should function just like an archive node as before.\


### Tutorial - starting from scratch

This tutorial starts from scratch, so prepare enough time to go through this migration, especially the change set extraction may take time in the order of **days** for it to complete, even with a `r6g.16xlarge` instance. In case you want to skip this step, we will be supporting a snapshot for this in the near future. For more information on the different steps, see this documentation [here](https://github.com/crypto-org-chain/cronos/wiki/VersionDB-Migration).



We will be following the following workflow:

1. **Extract** state change sets from existing archived IAVL tree.
2. **Build** the versiondb from the change set files.
3. **Build** a clean **application.db** from the change set files.

<figure><img src="../../.gitbook/assets/versiondb (1).png" alt=""><figcaption></figcaption></figure>

#### Step 0

* Update your binary and stop cronosd.&#x20;

#### Step 1 - extract changesets

* (Optional) get the end-version before extracting changeset

```bash
ulimit -n 60000 # python-iavl and cronosd changeset subcommand open many files
export MAXIMUM_VERSION=$(nix run github:crypto-com/python-iavl/main -- commit-infos --db /chain/.chain-maind/data/application.db/ | head -n 1 | awk '{ print $2 }')
export END_VERSION=$((MAXIMUM_VERSION + 1))
```

* **Extract Change Sets**\
  This step takes the **longest**. The migration process will try to parallelize the tasks as much as possible, and hence will use significant **RAM memory**. There are however flags for a user to control the concurrency level and RAM usage to adjust on different machine specs.\
  Time taken: around 4 days (512G RAM, r6g.16xlarge) for an archive node

```bash
$ /chain/.cronosd/cosmovisor/current/bin/cronosd changeset dump /s3-upload/data \
--home /chain/.cronosd --end-version $END_VERSION --concurrency 128
```

* **Verify Change Sets**\
  Time taken: around 1 hour

```bash
#!/bin/bash
set -e
set +o pipefail

MAXIMUM_VERSION=$(nix run github:crypto-com/python-iavl/main -- commit-infos --db /chain/.cronosd/data/application.db/ | head -n 1 | awk '{ print $2 }')
stores=($(/chain/.cronosd/cosmovisor/current/bin/cronosd changeset default-stores --home /chain/.cronosd/))
for i in "${stores[@]}"
do
  if [[ "$(nix run github:crypto-com/python-iavl/eb75df9 -- root-hash --db /chain/.cronosd/data/application.db/ --store $i --version $MAXIMUM_VERSION | awk '{print $2}')" == "$(/chain/.cronosd/cosmovisor/current/bin/cronosd changeset verify /s3-upload/changeset --stores $i | tail -1 | jq -r ".storeInfos[] | select(.name == \\"$i\\") | .commitId.hash" | base64 -d | xxd -p -c 32)" ]]; then
      echo "$i store is verified"
  else
      echo  "$i store has issue"
  fi
done
```

```bash
./verify.sh

```

#### Step 2 - **Build VersionDB**

```bash
./chain/.cronosd/cosmovisor/current/bin/cronosd changeset build-versiondb-sst \
/s3-upload/data /s3-upload/sst

./chain/.cronosd/cosmovisor/current/bin/cronosd changeset ingest-versiondb-sst \
/s3-upload/versiondb /s3-upload/sst/*.sst --move-files --maximum-version $MAXIMUM_VERSION

```

Time taken: around 1 hour



#### Step 3 - **Restore IAVL Tree**

Restore the IAVL tree. The restored `application.db` migration commands don't contain fastnode index

```bash
# create memiavl snapshot
$ /chain/.cronosd/cosmovisor/current/bin/cronosd changeset verify /s3-upload/data --save-snapshot /s3-upload/snapshot
# restore application.db
$ /chain/.cronosd/cosmovisor/current/bin/cronosd changeset restore-app-db /s3-upload/snapshot /s3-upload/application.db
```

time taken: around x hour



#### Step 4 - **Update config**

To enable VersionDB, you need to add VersionDB to the list of store.streamers in **app.toml** like this:

```bash
[store]
streamers = ["versiondb"]
```

The db instance is placed at `$NODE_HOME/data/versiondb` directory. Currently this path cannot be customized. This will switch the grpc query service's backing store from IAVL tree to VersionDB.



#### Step 5 - Start the node

Restart the node. it should start to reindex iavl fastnode now.



### Results on Cronos

On Cronos, we noticed disk size reductions around \~**`63%`** for a Cronos archive node. Of course the reuctions that you will see, depend from case to case, but as you can see there's a good improvement in disk size reduction to be gained when moving to versionDB.

`Rocksdb archive node`

```bash
$ du -hd1 /chain/.cronosd/data/
1.6T /chain/.cronosd/data/application.db
103G /chain/.cronosd/data/blockstore.db
1.1G /chain/.cronosd/data/cs.wal
121M /chain/.cronosd/data/evidence.db
114M /chain/.cronosd/data/snapshots
163G /chain/.cronosd/data/state.db
462G /chain/.cronosd/data/tx_index.db
2.3T /chain/.cronosd/data/
```



`Versiondb archive node`

```bash
du -hd1 /chain/.cronosd/data/
82G /chain/.cronosd/data/application.db
104G /chain/.cronosd/data/blockstore.db
26G /chain/.cronosd/data/versiondb
1.1G /chain/.cronosd/data/cs.wal
115M /chain/.cronosd/data/evidence.db
112M /chain/.cronosd/data/snapshots
163G /chain/.cronosd/data/state.db
463G /chain/.cronosd/data/tx_index.db
837G /chain/.cronosd/data/
```
