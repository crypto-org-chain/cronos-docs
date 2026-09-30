---
hidden: true
---

# Monitoring: Prometheus metrics

### Metrics

Prometheus provides real-time metrics used for event monitoring and alerting. Prometheus metrics can be served on the Cronos chain. To enable the Prometheus metrics, you will need to set `instrumentation.prometheus=true` in the `config.toml` file manually.

Metrics will be served under `…/metrics` on `26660` port by default, e.g. `localhost:26660/metrics`. The listening address can be changed in the `config.toml` file (`prometheus_listen_addr`).

Sample Settings:

```toml
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
