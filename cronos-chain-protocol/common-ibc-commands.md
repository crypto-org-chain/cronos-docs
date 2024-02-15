# Common IBC Commands

Nodes can use the Inter-Blockchain Communication Protocol (IBC) command with cronosd. Here are the commonly used IBC commands on Cronos Chain:



**#1 Querying commands for the IBC module on Cronos**

```
./cronosd q ibc
```

Subcommands:

* channel: IBC channel query subcommands
* client: IBC client query subcommands
* connection: IBC connection query subcommands

```
./cronosd query ibc channel
```



**#2 Querying command to see all channels with the node on Cronos**

```
./cronosd q ibc channel channels 
```

Example:&#x20;

```
./cronosd q ibc channel channels --node  https://rpc-t3.cronos.org:443/
```

Expected output:&#x20;

```
Channels:
- channel_id: channel-0
  connection_hops:
  - connection-0
  counterparty:
    channel_id: channel-131
    port_id: transfer
  ordering: ORDER_UNORDERED
  port_id: transfer
  state: STATE_OPEN
  version: ics20-1
```

&#x20;

**#3 Querying command to find the specific blockchain channel**&#x20;

```
./cronosd q ibc channel client-state transfer channel-number
```

Example:

```
./cronosd q ibc channel client-state transfer channel-207 
```

\
\
**#4 Query the trace info for all token denominations**

```
./cronosd q ibc-transfer denom-traces --node https://rpc-t3.cronos.org:443/
```

\
**#5 Query the denom hash info from a given denom trace**

```
./cronosd q ibc-transfer denom-hash "transfer/channel-1/uatom" <hash>
```



**#6 Query the contract addresses connected with the coin denom**

```
./cronosd query cronos contract-by-denom [denom] [flags]
```



**#7 Create a new IBC client with the specified client state and consensus state**

<pre><code><strong>./cronosd tx ibc client create [path/to/client_state.json] [path/to/consensus_state.json] [flags]
</strong></code></pre>

Example:

```
./cronosd tx ibc client create [path/to/client_state.json] [path/to/consensus_state.json] --from node0 --home ../node0/<app>cli --chain-id $CID
```

&#x20;

**#8 Query all channels associated with a connection**

```
./cronosd query ibc channel connections [connection-id] 
```

Example:

```
./cronosd query ibc channel connections [connection-id] --count_total
```

&#x20;

**#9 Query a channel end**

```
./cronosd query ibc channel end [port-id] [channel-id] [flags]
```



**#10 Query a next receive sequence**

```
./cronosd query ibc channel next-sequence-receive [port-id] [channel-id] [flags]
```

&#x20;

**#11 Query a packet acknowledgment**

```
./cronosd query ibc channel packet-ack [port-id] [channel-id] [sequence] [flags]
```



**#12 Query a packet commitment**

```
./cronosd query ibc channel packet-commitment [port-id] [channel-id] [sequence] [flags]
```

&#x20;

**#13 Query all packet commitments associated with a channel**

```
./cronosd query ibc channel packet-commitments [port-id] [channel-id] [flags]
```



**#14 Query a packet receipt**

```
./cronosd query ibc channel packet-receipt [port-id] [channel-id] [sequence] [flags]
```

&#x20;

**#15 Query all the unreceived acks associated with a channel**

```
./cronosd query ibc channel unreceived-acks [port-id] [channel-id] [flags]
```



**#16 Query all the unreceived packets associated with a channel**

```
./cronosd query ibc channel unreceived-packets [port-id] [channel-id] [flags]
```

&#x20;

**#17 Query the consensus state of a client at a given height**

```
./cronosd query ibc client consensus-state [client-id] [height] [flags]
```

&#x20;

**#18 Query the heights of all consensus states of a client**

```
./cronosd query ibc client consensus-state-heights [client-id] [flags]
```

&#x20;

**#19 Query all the consensus states of a client**

```
./cronosd query ibc client consensus-states [client-id] [flags]
```



**#20 Query the latest header of the running chain**

```
 ./cronosd query ibc client header
```

&#x20;&#x20;

**#21 Query the current ibc client parameters**

```
./cronosd query ibc client params
```



**#22 Query the self-consensus state for this chain**

```
./cronosd query ibc client self-consensus-state
```



**#23 Query all available light clients**

```
./cronosd query ibc client states
```



**#24 Query client status**

```
./cronosd query ibc client statue [client-id] [flags]
```



**#25 Query all connections**

```
 ./cronosd query ibc connection connections
```



**#26 Query stored connection end**

```
./cronosd query ibc connection end [connection-id] [flags]
```



**#27 Query the current IBC connection parameters**

```
./cronosd query ibc connection params
```



**#28 Query stored client connection paths**

```
./cronosd query ibc connection path [client-id] [flags]
```

&#x20;&#x20;

**#29 Query the denom trace info from a given trace hash or IBC denom**

```
./cronosd query ibc-transfer denom-trace [hash/denom] [flags]
```

Example:

```
./cronosd query ibc-transfer denom-trace 27A6394C3F9FF9C9DCF5DFFADF9BB5FE9A37C7E92B006199894CF1824DF9AC7C
```

&#x20;

**#30 Get the escrow address for a channel**

```
 ./cronosd query ibc-transfer escrow-address [port] [channel-id] [flags]
```



**#31 Query the current IBC-transfer parameters**

```
./cronosd query ibc-transfer params
```



**#32 Query the total amount of tokens in escrow for a denom**

```
./cronosd query ibc-transfer total-escrow [denom] [flags]
```



**#33 Query the IBC-fee enabled status of a channel**

```
./cronosd query ibc-fee channel [port-id] [channel-id] [flags]
```



**#34 Query the IBC-fee enabled channels**

```
./cronosd query ibc-fee channels
```



**#35 Query the relayer counterparty payee on a given channel**&#x20;

```
./cronosd query ibc-fee counterparty-payee [channel-id] [relayer] [flags]
```

Example:

```
./cronosd query ibc-fee counterparty-payee channel-5 cosmos1layxcsmyye0dc0har9sdfzwckaz8sjwlfsj8zs
```



**#36 Query for an unrelayed incentivized packet by port-id, channel-id and packet sequence**

```
./cronosd query ibc-fee packet [port-id] [channel-id] [sequence] [flags]
```



**#37 Query for all of the unrelayed incentivized packets and associated fees across all channels**

```
./cronosd query ibc-fee packets
```



**#38 Query for all of the unrelayed incentivized packets on a given channel**

```
 ./cronosd query ibc-fee packets-for-channel [port-id] [channel-id] [flags]
```



**#39 Query the relayer payee address on a given channel**

```
./cronosd query ibc-fee payee [channel-id] [relayer] [flags]
```

Example:

```
./cronosd query ibc-fee payee channel-5 cosmos1layxcsmyye0dc0har9sdfzwckaz8sjwlfsj8zs
```



**#40 Query the total acknowledgment fees for a packet**

```
./cronosd query ibc-fee total-ack-fees [port-id] [channel-id] [sequence] [flags]
```

Example:

```
./cronosd query ibc-fee total-ack-fees transfer channel-5 100
```



**#41 Query the total receive fees for a packet**

```
./cronosd query ibc-fee total-recv-fees [port-id] [channel-id] [sequence] [flags]
```



**#42 Query the total timeout fees for a packet**

```
./cronosd query ibc-fee total-timeout-fees [port-id] [channel-id] [sequence] [flags]
```

\
\
