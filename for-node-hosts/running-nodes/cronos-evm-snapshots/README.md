# Cronos EVM Snapshots

To streamline the node setup process and reduce sync times, Cronos supports multiple snapshot and sync methods, both **officially provided** **by Cronos Labs** and supported by **ecosystem partners**. These options allow node operators to start from a recent blockchain state without syncing from the genesis block.  \
\
In general, there are 3 kinds of pruning types (respectively for mainnet and testnet):

**Cronosmainnet\_25-1-pruned / Cronostestnet\_338-3-pruned**

* Pruned snapshot is the quickest way to get a node running. If you just would like to give it a shot, use it for a validator or sentry node, the pruned snapshot will be a good choice. Pruned snapshots have tx index disabled to save disk/download size, which also will make API queries not work backward in time. If you still want to use a pruned snapshot to start an API node, then you can enable tx index on your end to start indexing blocks from when you startup your node. But you will not be able to query anything earlier than that.

**Cronosmainnet\_25-1-default / Cronostestnet\_338-3-default**

* Default is a good middle choice between everything. It will work in most use cases, validator, sentry node, API nodes. It has tx index enabled, so you can query block back in time. The only thing that default nodes do not have is the full history from the start of the chain or chain upgrade.

**Cronosmainnet\_25-1-archive / Cronostestnet\_338-3-archive**

* For the users who would like to query the old block, you may pick the archive one for complete blockchain data. The archive node will have all the blocks from the chain start or chain upgrade with full indexing. So this is a good option for API nodes if you need to have access to the whole chain history. Archives grow fast in size and might be more sluggish to run, so if you need something simpler default or a pruned kickstarted API node might solve most of the needs out there.



### **Cronos EVM Snapshot Options**

This section provides an overview and guidance on the available snapshot options for Cronos EVM.&#x20;

{% content-ref url="cronos-native-snapshots.md" %}
[cronos-native-snapshots.md](cronos-native-snapshots.md)
{% endcontent-ref %}

{% content-ref url="state-sync.md" %}
[state-sync.md](state-sync.md)
{% endcontent-ref %}

{% content-ref url="public-node.md" %}
[public-node.md](public-node.md)
{% endcontent-ref %}

{% content-ref url="ksync.md" %}
[ksync.md](ksync.md)
{% endcontent-ref %}
