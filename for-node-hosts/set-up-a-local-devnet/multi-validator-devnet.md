---
description: >-
  Set up a local Cronos Devnet with 2 validators and 3 pre-funded non-validator
  accounts using          Pystarport. Intended for testing and development
  purposes only.
---

# Multi-validator Devnet

{% hint style="warning" %}
CAUTION \
This page is for building and running the latest development version of the chain for testing purpose only. Please note that is under active development and is highly unstable and subject to breaking changes. You should expect a moderate amount of troubleshooting work is required.
{% endhint %}

{% hint style="info" %}
This below was verified with [cronosd v1.7.1](https://github.com/crypto-org-chain/cronos/releases/tag/v1.7.1) + [pystarport v0.2.5](https://github.com/crypto-com/pystarport) on `macOS`(arm64) and `Linux`(arm64 or x86\_64).
{% endhint %}

***

### 1. Prerequisites

<table><thead><tr><th width="156.73004150390625">Tool</th><th width="175.70751953125">Minimum Version</th><th>Notes</th></tr></thead><tbody><tr><td>macOS/Linux</td><td>N/A</td><td>Apple Silicon (arm64) / Linux(arm64 or x86_64)</td></tr><tr><td>Python</td><td>3.9+</td><td>3.12+ recommended</td></tr><tr><td>pip</td><td>Latest</td><td><code>pip3 install --upgrade pip</code></td></tr></tbody></table>

***

### 2. Install cronosd

Download the pre-built binary from GitHub Releases:\
\
Linux users can follow the same steps - simply replace `Darwin` with `Linux` below.

```bash
# ==============================
# Create working directory
# ==============================
mkdir -p /tmp/cronos-devnet/bin  # choose the directory
cd /tmp/cronos-devnet

# ==============================
# Download cronosd (e.g. v1.7.1 / macOS arm64)
# ==============================
CRONOS_VERSION="1.7.1"
OS="Darwin"          # For Linux, change to "Linux"
ARCH="arm64"         # For Linux, change to "arm64" or "x86_64"

TARBALL="cronos_${CRONOS_VERSION}_${OS}_${ARCH}.tar.gz"
curl -LO "https://github.com/crypto-org-chain/cronos/releases/download/v${CRONOS_VERSION}/${TARBALL}"

tar -xzf "$TARBALL"
chmod +x bin/cronosd

# ==============================
# Verify installation
# ==============================
./bin/cronosd version
# Expected output: 1.7.1
```

***

### 3. Install pystarport

[pystarport](https://github.com/crypto-com/pystarport) is a devnet orchestration tool provided by the Cronos team. It automates:

* Multi-node genesis initialization
* Validator gentx signing and collection
* P2P peer discovery configuration
* supervisord process management

```bash
pip3 install pystarport

# Also install supervisord (process manager)
pip3 install supervisor

# Verify installation
pystarport --version
supervisord --version
```

***

### 4. Configuration File

Create `multi-validator-devnet.yaml` (referring to [cronos-devnet.yaml](https://github.com/crypto-org-chain/cronos/blob/main/scripts/cronos-devnet.yaml)):

```bash
cd /tmp/cronos-devnet
cat > multi-validator-devnet.yaml << 'EOF'
cronos_777-1:
  cmd: /tmp/cronos-devnet/bin/cronosd  # Absolute path to the cronosd binary
  start-flags: "--trace"
  app-config:
    minimum-gas-prices: 0basetcro
    index-events:
      - ethereum_tx.ethereumTxHash
    json-rpc:
      address: "127.0.0.1:{EVMRPC_PORT}"
      ws-address: "127.0.0.1:{EVMRPC_PORT_WS}"
      api: "eth,net,web3,debug,cronos"
  validators:
    - coins: 1000000000000000000stake,10000000000000000000000basetcro
      staked: 1000000000000000000stake
      mnemonic: "gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat"
    - coins: 1000000000000000000stake,10000000000000000000000basetcro
      staked: 1000000000000000000stake
      mnemonic: "copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom"
  accounts:
    - name: community
      coins: 10000000000000000000000basetcro
      mnemonic: "maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual"
    - name: signer1
      coins: 20000000000000000000000basetcro
      mnemonic: "figure outdoor option kitten force avocado hair rug shoulder win engage coconut record lounge insane royal crime powder dwarf monster car thing bench bamboo"
    - name: signer2
      coins: 30000000000000000000000basetcro
      mnemonic: "pencil shrug wire extra bonus deny ride trap science clarify lonely profit rural quote hamster fuel pig speak total lumber bench canyon possible execute"
  genesis:
    consensus:
      params:
        block:
          max_bytes: "1048576"
          max_gas: "81500000"
    app_state:
      evm:
        params:
          evm_denom: basetcro
      gov:
        params:
          voting_period: "10s"
          expedited_voting_period: "5s"
          max_deposit_period: "10s"
          min_deposit:
            - denom: "basetcro"
              amount: "1"
      transfer:
        params:
          receive_enabled: true
          send_enabled: true
      feemarket:
        params:
          no_base_fee: false
          base_fee: "100000000000"
          min_gas_multiplier: "0"
EOF
```

{% hint style="info" %}
**Denomination conversion**: 1 tCRO = 10^18 basetcro (analogous to the ETH-to-Wei relationship)
{% endhint %}

#### Configuration Reference

| Field                                | Description                                                               |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `cronos_777-1`                       | Chain ID in `{name}_{eip155}-{revision}` format                           |
| `cmd`                                | Absolute path to the cronosd binary                                       |
| `minimum-gas-prices`                 | Minimum gas price accepted by the node                                    |
| `{EVMRPC_PORT}` / `{EVMRPC_PORT_WS}` | Placeholders auto-replaced by pystarport based on `base_port`(seen below) |
| `validators` array                   | **Each element = one validator node**, each gets its own data dir         |
| `coins`                              | Initial token balance allocated to the account in genesis                 |
| `staked`                             | Validator self-delegation stake amount                                    |
| `mnemonic`                           | Fixed mnemonic to ensure deterministic address generation                 |
| `accounts`                           | Non-validator pre-funded accounts (for testing)                           |
| `evm_denom: basetcro`                | Gas token denomination for the EVM layer                                  |
| `base_fee`                           | EIP-1559 base fee (100 `basetcro`)                                        |

***

### 5. Initialize and Start

#### 5a. Initialize Only (Without Starting)

<pre class="language-bash"><code class="lang-bash">cd /tmp/cronos-devnet

# you could customize the data directory via <a data-footnote-ref href="#user-content-fn-1">--data</a> below
pystarport init \
  --data ./multi-data \
  --config multi-validator-devnet.yaml \
  -b 26650
</code></pre>

This generates the following directory structure under `./multi-data/cronos_777-1/`:

```
multi-data/cronos_777-1/
├── accounts.json          # Summary of all account addresses
├── genesis.json           # Shared genesis file
├── node0/                 # Full node directory for Validator 0
│   ├── config/
│   │   ├── app.toml       # Application config (JSON-RPC, gRPC, etc.)
│   │   ├── config.toml    # Tendermint config (P2P, RPC ports)
│   │   └── genesis.json   # Shared genesis file (same copy)
│   └── data/
│       └── priv_validator_state.json
└── node1/                 # Full node directory for Validator 1
│   ├── config/
│   │   ├── app.toml       # Application config (JSON-RPC, gRPC, etc.)
│   │   ├── config.toml    # Tendermint config (P2P, RPC ports)
│   │   └── genesis.json   # Shared genesis file (same copy)
│   └── data/
│       └── priv_validator_state.json
```

#### 5b. Initialize and Start in One Step

```bash
cd /tmp/cronos-devnet

pystarport serve \
  --data ./multi-data \
  -config multi-validator-devnet.yaml \
  -b 26650
```

{% hint style="info" %}
`serve` = `init` + launches supervisord to manage all node processes.
{% endhint %}

Once started, the terminal will display `supervisord` logs. **Keep this terminal open.**

#### 5c. Verify the Network

Open a new terminal window:

```bash
# Query latest block height (node0)
curl -s http://127.0.0.1:26657/status | python3 -m json.tool | grep latest_block_height

# Query latest block height (node1)
curl -s http://127.0.0.1:26667/status | python3 -m json.tool | grep latest_block_height

# List validator set (should show 2 validators)
/tmp/cronos-devnet/bin/cronosd query staking validators \
  --node tcp://127.0.0.1:26657 \
  --output json | python3 -m json.tool | grep moniker
```

***

### 6. Port Mapping

`pystarport` allocates ports (as per [port rules](https://github.com/crypto-com/pystarport?tab=readme-ov-file#port-rules) here) starting from `base_port` (default 26650), with an offset of +10 per node:

#### Node 0 (Validator 0) — base\_port = 26650

| Service        | Port      | Purpose                         |
| -------------- | --------- | ------------------------------- |
| P2P            | 26650     | Inter-node communication        |
| EVM JSON-RPC   | **26651** | MetaMask / ethers.js endpoint   |
| EVM WebSocket  | 26652     | Event subscriptions             |
| gRPC-Gateway   | 26653     | REST API                        |
| gRPC           | 26654     | gRPC queries                    |
| pprof          | 26655     | Performance profiling           |
| Tendermint P2P | 26656     | CometBFT peer discovery         |
| Tendermint RPC | **26657** | Cosmos SDK query endpoint       |
| ABCI           | 26658     | Application layer communication |

#### Node 1 (Validator 1) — base\_port + 10 = 26660

| Service        | Port      |
| -------------- | --------- |
| P2P            | 26660     |
| EVM JSON-RPC   | **26661** |
| EVM WebSocket  | 26662     |
| gRPC-Gateway   | 26663     |
| gRPC           | 26664     |
| pprof          | 26665     |
| Tendermint P2P | 26666     |
| Tendermint RPC | **26667** |
| ABCI           | 26668     |

**Pattern**: Port for Node N = `base_port` + (N × 10) + service offset

***

### 7. Pre-funded Accounts

All mnemonics are fixed values for deterministic address generation, enabling the team to share the same set of test addresses.

#### Validator Accounts

| Name       | Bech32 Address                               | EVM Address (EIP-55)                         | Initial Balance       |
| ---------- | -------------------------------------------- | -------------------------------------------- | --------------------- |
| validator0 | `crc10jmp6sgh4cc6zt3e8gw05wavvejgr5pw8v2q7j` | `0x7CB61D4117AE31A12E393A1CFA3BAC666481D02E` | 10,000 tCRO + 1 stake |
| validator1 | `crc1cml96vmptgw99syqrrz8az79xer2pcgpj22459` | `0xC6FE5D33615A1C52C08018C47E8BC53646A0E101` | 10,000 tCRO + 1 stake |

#### Non-Validator Accounts

| Name      | Bech32 Address                               | EVM Address (EIP-55)                         | Initial Balance |
| --------- | -------------------------------------------- | -------------------------------------------- | --------------- |
| community | `crc1jcltmuhplrdcwp7stlr4hlhlhgd4htqhyz4ack` | `0x963EBDF2E1F8DB8707D05FC75BFEFFBA1B5BAC17` | 10,000 tCRO     |
| signer1   | `crc1czp5lh3ke85rruvg0vawec02perp2ul678x46r` | `0xC0834FDE36C9E831F1887B3AECE1EA0E461573FA` | 20,000 tCRO     |
| signer2   | `crc1gt7cfua508jfexuf9ea4536sdqkv62dsxxalc2` | `0x42FD84F3B479E49C9B892E7B5A4750682CCD29B0` | 30,000 tCRO     |

{% hint style="info" %}
**Denomination conversion**: 1 tCRO = 10^18 basetcro (analogous to the ETH-to-Wei relationship)
{% endhint %}

#### Mnemonics

<pre><code># validator0
<strong>gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat
</strong>
# validator1
copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom

# community
maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual

# signer1
figure outdoor option kitten force avocado hair rug shoulder win engage coconut record lounge insane royal crime powder dwarf monster car thing bench bamboo

# signer2
pencil shrug wire extra bonus deny ride trap science clarify lonely profit rural quote hamster fuel pig speak total lumber bench canyon possible execute
</code></pre>

***

### 8. Common Operations

The following commands assume:

```bash
CRONOSD="/tmp/cronos-devnet/bin/cronosd"
NODE="tcp://127.0.0.1:26657"
```

#### Query Balance

```bash
# Cosmos native balance
$CRONOSD query bank balances crc10jmp6sgh4cc6zt3e8gw05wavvejgr5pw8v2q7j --node $NODE

# EVM balance (via JSON-RPC)
curl -s -X POST http://127.0.0.1:26651 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x7CB61D4117AE31A12E393A1CFA3BAC666481D02E","latest"],"id":1}'
```

#### Transfer (Cosmos Native)

```bash
$CRONOSD tx bank send \
  crc10jmp6sgh4cc6zt3e8gw05wavvejgr5pw8v2q7j \
  crc1jcltmuhplrdcwp7stlr4hlhlhgd4htqhyz4ack \
  1000000000000000000basetcro \
  --keyring-backend test \
  --home /tmp/cronos-devnet/multi-data/cronos_777-1/node0 \
  --chain-id cronos_777-1 \
  --fees 100000000000000000basetcro \
  --node $NODE -y
```

#### List Validators

```bash
$CRONOSD query staking validators --node $NODE --output json | \
  python3 -c "
import sys, json
vs = json.load(sys.stdin)['validators']
for v in vs:
    print(f\"  {v['description']['moniker']:12s}  power={v['tokens']}  status={v['status']}\")
"
```

[^1]: 
