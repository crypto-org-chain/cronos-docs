# Node Setup and RPC note

## Node minimum setup

Here we will be using a local `cronosd` folder as the home directory. By default chain data are stored in your home directory `~/.cronos`. For example, when joining the testnet `cronostestnet_338-1`: 

```bash
./cronosd init mynode --chain-id cronostestnet_338-1 

$ sed -i.bak -E 's#^(persistent_peers[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656"#' ~/.cronos/config/config.toml
$ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
$ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
```


### Enable API server

Edit `~/.cronos/config/app.toml` and update the following section
```toml
[api]

# Enable defines if the API server should be enabled.
enable = true

# Swagger defines if swagger documentation should automatically be registered.
swagger = true

# Address defines the API server to listen on.
address = "tcp://0.0.0.0:1317"
```

### Disable gRPC server on public nodes

\:::warning Recommendation:
We recommend to disable gRPC server on public nodes to reduce the attack vector
:::

Edit `~/.cronos/config/app.toml` and update the following section
```toml
[grpc]

# Enable defines if the gRPC server should be enabled.
enable = false
```

### Start the node

Afterward, you should be able to start you node by running 
```bash
./cronosd start 
````
where the blockchain data, keys will be stored at the folder `~/.cronos`

## Access RPC server

### Tendermint (Local access only)

You can access Tendermint Swagger UI here:
https://docs.tendermint.com/master/rpc/#/

Switch the servers to localhost in the dropdown and you can interact with the Swagger UI.

### gRPC

There are few clients our team has used before

#### BloomRPC

- https://github.com/uw-labs/bloomrpc

- GUI client for GRPC services

#### grpcurl

- https://github.com/fullstorydev/grpcurl

- Like curl, but for gRPC

- Install grpcurl (Mac)

  ```bash
  brew install grpcurl
  ```

  for other OSs please refer to GitHub

- Query gRPC API

    ```bash
    grpcurl -plaintext localhost:9090 list

    cd grpc/proto
    grpcurl -proto ./cosmos/staking/v1beta1/query.proto -plaintext localhost:9090 cosmos.staking.v1beta1.Query.Validators
    ```

    The reason we have to go to the `grpc/proto` directory is that gRPC will look for proto files dependency, and they expect that to be under the path you are currently at. To avoid this limitation, we can specify the proto import path.

    ```bash
    grpcurl -import-path ./grpc/proto -proto ./grpc/proto/cosmos/staking/v1beta1/query.proto -plaintext localhost:9090 cosmos.staking.v1beta1.Query.Validators
    ```

- More query examples

    ```bash
    grpcurl -d ' {"validator_addr": "tcrocncl1l74wnswzx4zsmv674tl99h3h3fgj3al2tdzne7"}' -import-path ./grpc/proto -proto ./grpc/proto/cosmos/staking/v1beta1/query.proto -plaintext localhost:9090 cosmos.staking.v1beta1.Query.Validator
    ```

## Tricks on creating a validator on testnet

1. Make sure your node is fully sync before you join as validator

2. Gas price error

    As discussed in the metting, sometimes the `create-valiator` may fail because of the gas. You can use the following command instead (notice we have provide `--gas` and `--gas-price`) 

    ```bash
    $ ./cronosd tx staking create-validator \
    --from=[name_of_your_key] \
    --amount=500000tcro \
    --pubkey=[tcrocnclconspub...]  \
    --moniker="[The_id_of_your_node]" \
    --security-contact="[security contact email/contact method]" \
    --chain-id="cronostestnet_338-1" \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas="auto" \
    --gas-price="0.1basetcro"
    ```
