# Best Practices

In order to make it more convenient for DApps and node hosts to set up a node, we have put together a list of useful settings and configurations. Feel free to refer to this guide and adapt settings to suit your own use cases. For a sample config check [here](https://github.com/crypto-org-chain/cronos-mainnet/tree/master/cronosmainnet\_25-1).

## config.toml

### Log\_level

* `info` Depending on the needs of your application it is ok to stick to `info` (default), but do consider setting up log-rotation for your logs, and archive logs after a certain amount of time or size, e.g. use a cron job with weekly rotation or until your file size hits \~5GB.
* set to `debug` only for debugging purposes, turn off after you are finished with debugging.

### db\_backend

Since 1.0.2 there is another db parameter in app.toml as well. Be sure to make these 2 parameters the same to avoid issues.

* `goleveldb` (default) db for low / medium level traffic use case. The reason being there can be some lock contention, especially with P2P.
* `rocksdb` suited for a lot of use-cases, especially for high query load \~ few M / day. Has a better balance between rpc queries and p2p at high traffic. Note that`Rocksdb` however might have a slower startup time and requires a higher memory allocation. \


### Seeds and persistent\_peers

* `max_num_inbound_peers` For node providers the number of inbound peers can be set to a higher value for example 50.
* `max_num_outbound_peers` For users on a private network set a higher number of outbound peers to 30 for example.
* After peers are connected, set it back to its default value. Note that some trial values might be needed to get it right.
* `seeds` Set the list of seeds as instructed in the [.](./ "mention") section to connect to.
* `persistent_peers` is especially useful when using [state-sync.md](cronos-mainnet/state-sync.md "mention") to pull snapshots from.

### send\_rate and recv\_rate

Free to tweak to a higher bytes/sec value, if your networking allows this, e.g. `51200000`

### timeout\_broadcast\_tx\_commit

* Freely tweak this parameter. Set to a slightly higher value, such as `20s` to wait for a tx to be committed during / broadcast\_tx\_commit.  Be careful a value larger than 10s will result in increasing the global HTTP write timeout, which applies to all connections and endpoints.

### max\_num\_inbound\_peers and max\_num\_outbound\_peers

* `max_num_inbound_peers` For node providers the number of inbound peers can be set to a higher value for example 50.
* `max_num_outbound_peers` For users on a private network set a higher number of outbound peers to 30 for example.
* After peers are connected, set it back to its default value. Note that some trial values might be needed to get it right.

### Metrics

Prometheus provides real-time metrics used for event monitoring and alerting. Prometheus metrics can be served on the Cronos chain. To enable the Prometheus metrics, you will need to set `instrumentation.prometheus=true` in the `config.toml` file manually.

Metrics will be served under `…/metrics` on `26660` port by default, e.g. `localhost:26660/metrics`. The listening address can be changed in the `config.toml` file (`prometheus_listen_addr`). &#x20;

Sample Settings:

<pre><code><strong>#######################################################
</strong>###       Instrumentation Configuration Options     ###
#######################################################
[instrumentation]

# When true, Prometheus metrics are served under /metrics on
# PrometheusListenAddr.
# Check out the documentation for the list of available metrics.
prometheus = true

# Address to listen for Prometheus collector(s) connections
prometheus_listen_addr = ":26660"

# Maximum number of simultaneous connections.
# If you want to accept a larger number than the default, make sure
# you increase your OS limits.
# 0 - unlimited.
max_open_connections = 3

# Instrumentation namespace
namespace = "tendermint"

</code></pre>

## app.toml

### Pruning

* `default` Normal usage can just be set to default. In the Cosmos SDK this is defined as:

```go
PruneDefault = NewPruningOptions(362880, 100, 10)
```

meaning the app will keep the latest 362880 versions (around 21 days by 5 secs block time), and then only keep 1 version for every 100 blocks past the keepRecent period( the rest will be put into the pruning list), and then execute the pruning every 10 blocks.

* `everything` if you only need to do transaction broadcasting and only need the last blocks.
* `nothing` for DApps that want to be able to query information at a certain known blockheight. Note that this is only needed for `archive` nodes.



### iavl-disable-fastnode and iavl-cache-size

During the `dragonberry` patch and the upgrade to `0.8.2` and `0.8.3`,  we enabled the `iavl-disable-fastnode` config parameter. This provides the option to disable the iavl fastnode indexing migration, as a migration will take multiple hours to complete.&#x20;

* `iavl-disable-fastnode = false` is the default setting and performs the migration. This might take a while. So be prepared in advance and schedule this migration downtime. In case you use a snapshot that has performed migration already (e.g. quicksync), leave the value to false
* `iavl-disable-fastnode = true` if you want to disable the fast indexing, and skip the migration. Only use this in case you really are not able to perform the migration now.
* `iavl-cache-size` set to `781250` works well as our testing has shown.



### app-db-backend

As of `v1.0.0` we support golevelDB and rocksDB in a single binary, hence we allow to select the backend with the `app-db-backend` parameter. If not filled in it will use a fallback option.\
\
First fallback is the deprecated compile-time types.DBBackend value.\
Second fallback (if the types.DBBackend also isn't set), is the db-backend value set in config.toml.

* `app-db-backend = "rocksdb" or "golevelsdb"`

### API

* `enable = true` to enable the API server
* `swagger = true` to setup the swagger endpoint



### Json-RPC

* `api = "eth,txpool,web3"` Set to the namespaces you wish to use, optionally add `personal,net,debug` to that list.
* `evm-timeout` Freely tweak this parameter. Set to a slightly higher value, such as `60s` to avoid timeouts on eth\_calls.
* `http-timeout` Freely tweak this parameter. Set to a slightly higher value, such as `60s` to avoid read/writes timeouts of the http json-rpc server.
* `http-idle-timeout`. Freely tweak this parameter. Set to a slightly higher value, such as `120s` to avoid idle timeout of the http json-rpc server.



``

``

### Debug Method

`debug_trace` allows nodes to return the trace of block and transaction details. In order to enable `debug_trace` for your node on the Cronos chain, two places need to be configured correctly under `app.toml`.&#x20;

Sample Settings:

```
# default: the last 362880 states are kept, pruning at 10 block intervals
# nothing: all historic states will be saved, nothing will be deleted (i.e. archiving node)
# everything: 2 latest states will be kept; pruning at 10 block intervals.
# custom: allow pruning options to be manually specified through 'pruning-keep-recent', and 'pruning-interval'
pruning = "everything"

[evm]

# Tracer defines the 'vm.Tracer' type that the EVM will use when the node is run in
# debug mode. To enable tracing use the '--evm.tracer' flag when starting your node.
# Valid types are: json|struct|access_list|markdown
tracer = ""


[json-rpc]

# API defines a list of JSON-RPC namespaces that should be enabled
# Example: "eth,txpool,personal,net,debug,web3"
api = "eth,net,web3,txpool,personal,debug"
```

In addition, it should run as `cronosd start --trace` in `cronosd start` command (_archived node_). For the resources needed for `--trace` flag in Cronos mainnet, the mem usage is slightly higher than the others but 64GB should be enough.

