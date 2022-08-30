# Best Practices

In order to make it more convenient for DApps and node hosts to set up a node, we have put together a list of useful settings and configurations. Feel free to refer to this guide and adapt settings to suit your own use cases.

## config.toml

### Log\_level

* `info` Depending on the needs of your application it is ok to stick to `info` (default), but do consider setting up log-rotation for your logs, and archive logs after a certain amount of time or size, e.g. use a cron job with weekly rotation or until your file size hits \~5GB.
* set to `debug` only for debugging purpose, turn off after you are finished with debugging.

### db\_backend

* `goleveldb` (default) db: for low / medium level traffic use case. The reason being there can be some lock contention, especially with P2P.
* `rocksdb` suited for a lot of use-cases, especially for high query load \~ few M / day. Has a better balance between rpc queries and p2p at high traffic. Note that`Rocksdb` however might have a slower startup time and requires a higher memory allocation.

### max\_num\_inbound\_peers and max\_num\_outbound\_peers

* `max_num_inbound_peers` For node providers the number of inbound peers can be set to a higher value for example 50.
* `max_num_outbound_peers` For users on a private network set a higher number of outbound peers to 30 for example.
* After peers are connected, set it back to its default value. Note that some trial values might be needed to get it right.

### Metrics

Prometheus provides real-time metrics used for event monitoring and alerting. Prometheus metrics can be served on Cronos chain. To enable the Prometheus metrics, you will need to set `instrumentation.prometheus=true` in the `config.toml` file manually.

Metrics will be served under `…/metrics` on `26660` port by default, e.g. `localhost:26660/metrics`. The listening address can be changed in the `config.toml` file (`prometheus_listen_addr`). &#x20;

Sample Settings:

```
#######################################################
###       Instrumentation Configuration Options     ###
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

```

## app.toml

### pruning

* `default` Normal usage can just set to default. In the Cosmos SDK this is defined as:

```go
PruneDefault = NewPruningOptions(362880, 100, 10)
```

meaning the app will keep the latest 362880 versions (around 21 days by 5 secs block time), and then only keep 1 version for every 100 blocks past the keepRecent period( the rest will be put into the pruning list), and then execute the pruning every 10 blocks.

* `everything` if you only need to do transaction broadcasting and only need the last blocks.
* `nothing` for DApps that want to be able to query information at a certain known blockheight. Note that this is only needed for `archive` nodes.
