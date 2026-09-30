---
hidden: true
---

# Hardware Specification

### Supported OS

We officially support macOS, Windows, and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other operating systems after we have stabilised our current architecture.

### Prepare your machine

To run Cronos Mainnet nodes, you will need a machine with the following minimum requirements to run different types of nodes:

* Pruned node (setting pruning=everything)
  * Storage: \~50G\*
  * RAM: 32G (LevelDB) or 64G RAM (RocksDB)\*\*\*
  * CPU: 4-core
* Default full node (setting pruning=default)
  * Storage: \~1T\*\*
  * RAM: 32G (LevelDB) or 64G RAM (RocksDB)\*\*\*
  * CPU: 4-core
* Archive node (setting pruning=nothing)
  * Storage: \~6T (LevelDB) or \~4.5T (RocksDB)
  * RAM: 32G (LevelDB) or 64G RAM (RocksDB)\*\*\*
  * CPU: 4-core

_\*Only in case state-sync enabled._\
_\*\* e.g. Note that size of snapshots from Quicksync will keep growing._\
_\*\*\* Note that during a state-sync the node might require higher RAM than 3GB but, returns to normal after state-sync has finished._

{% hint style="info" %}
Note that all depends on the type of node you are running and settings will vary depending on your usage.
{% endhint %}

### Notes on memory and networking

* `rocksdb` is suited for a lot of use-cases, especially for high query load \~ few M / day. It has a better balance between rpc queries and p2p at high traffic. Note that `Rocksdb` however might have a slower startup time and requires a higher memory allocation.
* For the resources needed for the `--trace` flag in Cronos mainnet, the mem usage is slightly higher than the others but 64GB should be enough.
* `send_rate` and `recv_rate` are free to tweak to a higher bytes/sec value, if your networking allows this, e.g. `51200000`.
