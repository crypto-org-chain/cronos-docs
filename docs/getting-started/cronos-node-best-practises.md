# Best Practices for node hosts in Cronos

In order to make it more convenient for Dapps and node hosts to setup a node, we put together a list of useful settings and configurations. Feel free to refer to this guide, and adapt settings to suit your use-case. 

## config.toml

### Log_level
    - `info`. Depending on the needs of your application it is ok to stick to `info` (default), but do consider setting up log-rotation for your logs, and archive logs after a certain amount of time or size, e.g. use a cron job with weekly rotation or until your file size hits ~5GB.
    - set tot `debug` only for debugging purpose, turn off after you are finished with debugging.

### db_backend
    - `goleveldb` (default) db: for low / medium level traffic use case. The reason being there can be some lock contention, especially with P2P.
    - `rocksdb` suited for a lot of use-cases, especially for high query load ~ few M / day. Has a better balance between rpc queries and p2p at high traffic.

### max_num_inbound_peers and max_num_outbound_peers
    - For node providers `max_num_inbound_peers` can be set to a higher value for example `50`.
    - For users on a private network set a higher number of outbound peers: `max_num_outbound_peers` = 30 for example.
    - After peers are connected, set it back to its default value. Note that some trial values might be needed to get it right.



## app.toml

### pruning
    - `default`. Normal usage can just use default.
    - `everything`, if you only need to do transaction broadcasting and only need the last blocks. 
    - `nothing` for DApps that want to be able to query information at a certain known blockheight.

