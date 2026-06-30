# ⏰ Cronos EVM: Differences from Ethereum

### Overview

While Cronos is an EVM-compatible chain, its underlying architecture as a Cosmos SDK blockchain (built using Ethermint) introduces several technical nuances that deviate from standard Ethereum behavior. Understanding these differences is critical for developers migrating dApps or building indexing solutions.

### 1. Batch Transactions

The most significant architectural departure is how multiple messages are handled within a single transaction envelope.

* **Ethereum:** Typically, an Ethereum transaction is a single signed message. To execute multiple actions, a user must send multiple transactions or use a smart contract (like a "`Multicall`" contract) to bundle calls.
* **Cronos:** Leveraging the Cosmos SDK, Cronos supports Batch Transactions. In this model, a single Cosmos transaction can contain multiple `MsgEthereumTx` messages within its `body.messages`.

#### Key Characteristics of Cronos Batching

* **Execution:** Messages execute sequentially in the same block.
* **Fees:** They share a single Cosmos fee envelope; the total gas limit and fee amount are the aggregate sums of the individual parts.
* **Indexing:** Each message generates a separate Ethereum receipt, assigned sequential `transactionIndex` values (0, 1, 2, etc.).

{% hint style="warning" %}
**Predictability**: Developers should never rely on a nonce or contract address generated during a batch transaction. Because nonces are verified differently during batch submission, the resulting contract address can be unpredictable compared to the standard Ethereum derivation.
{% endhint %}

#### Implementation Example (Integration Pattern)

The canonical pattern for building these transactions involves extracting messages from individual EVM transactions and wrapping them into a single Cosmos body:

```python
def build_batch_tx(w3, cli, txs, key):
    signed_txs = [sign_transaction(w3, tx, key) for tx in txs]
    # Convert signed Eth txs to Cosmos-compatible EVM messages
    tmp_txs = [cli.build_evm_tx(Web3.to_hex(s.raw_transaction)) for s in signed_txs]

    msgs = [tx["body"]["messages"][0] for tx in tmp_txs]
    # Aggregate fees and gas
    total_fee = sum(int(tx["auth_info"]["fee"]["amount"][0]["amount"]) for tx in tmp_txs)
    total_gas = sum(int(tx["auth_info"]["fee"]["gas_limit"]) for tx in tmp_txs)

    return {
        "body": { "messages": msgs, ... },
        "auth_info": { "fee": { "amount": [{"denom": "basetcro", "amount": str(total_fee)}], "gas_limit": str(total_gas) }, ... }
    }
```

### 2. Transaction Hash Uniqueness

A fundamental assumption in Ethereum is that a transaction hash (`TxHash`) is a unique identifier. Cronos has historically deviated from this.

* **Ethereum:** Enforces strict uniqueness. Once a transaction is included in a block, that hash cannot be reused for a different state change.
* **Cronos (Legacy):** In versions prior to `v0.7`, a bug existed that allowed the same transaction to be executed multiple times across different blocks. This resulted in duplicate transaction hashes at different block heights.

#### **Impact on Indexers and RPCs**

Standard Ethereum-style indexers and RPC nodes (using calls like `eth_getTransactionReceipt` or `eth_getBlockReceipts`) are often unprepared for non-unique hashes.

* **Data Inconsistency:** Fetching a receipt by hash might return the "wrong" instance if multiple exist.
* **Reconciliation:** Developers building on Cronos must implement custom reconciliation strategies to handle these duplicates to ensure data integrity, especially when migrating or indexing legacy block data. **We recommend overriding the transaction receipt with the receipt returned for the most recent block.**

#### Behavior Across Current Cronos Versions

Since the affected blocks from the legacy era still live on-chain, and every Cronos release still needs to decide how its JSON-RPC endpoints expose those historical duplicates.

A subsequent patch changed how `eth_getBlockReceipts` handles these duplicates. Releases group into two tiers based on whether they include that patch:

* **Pre-fix:** `v1.7.0` , `v1.7.4`
* **Post-fix:** `v1.7.1` , `v1.7.5`

{% hint style="info" %}
**Note on release lineage:** The fix landed in **v1.7.1** and was carried forward into **v1.7.5**. **v1.7.4 is an exception** - it was cut as an **emergency release** for an unrelated issue and did not bundle this patch. Release order alone is therefore not a reliable signal; always check against the table below.
{% endhint %}

**JSON-RPC behavior by version**

<table data-header-hidden="false" data-header-sticky><thead><tr><th>Endpoint</th><th>Pre-fix (v1.7.0 / v1.7.4)</th><th>Post-fix (v1.7.1 / v1.7.5)</th></tr></thead><tbody><tr><td><code>eth_getBlockReceipts</code></td><td>🚨 <strong>Crashes</strong> when the target block contains an unlucky transaction.</td><td>✅ Returns an empty array <code>[]</code> (no crash) if the target block is <strong>not</strong> the most recent one to include the unlucky tx.</td></tr><tr><td><code>eth_getBlockByNumber</code></td><td>Returns normally, with the unlucky transaction included in the block body.</td><td>Same as pre-fix (unchanged by the patch).</td></tr><tr><td><code>eth_getTransactionReceipt</code></td><td>Returns the receipt pointing to the <strong>most recent</strong> block that includes the unlucky tx.</td><td>Same as pre-fix (unchanged by the patch).</td></tr></tbody></table>

{% hint style="warning" %}
**Upgrade Recommendation**

* If you are on **v1.7.0**, jump directly to **v1.7.5**.
* If you are on **v1.7.4**, **do not assume you have the fix** - v1.7.4 is a hotfix release that predates the `eth_getBlockReceipts` patch. Upgrade to **v1.7.5**.
* Clients that only use `eth_getBlockByNumber` / `eth_getTransactionReceipt` are unaffected by the crash, but should still implement the reconciliation guidance above to handle duplicate hashes correctly.

Impact is concentrated on infrastructure that calls `eth_getBlockReceipts` in bulk - indexers, block-explorer backends, analytics pipelines, and bulk receipt fetchers scanning legacy blocks.
{% endhint %}

### 3. JSON-RPC Schema Differences

Cronos exposes an Ethereum-compatible JSON-RPC surface, but the implementation reconstructs Ethereum wire format from Cosmos/CometBFT state, several JSON schemas diverge from standard Ethereum.

#### 3a. Block Responses — Modern Fork Fields Always Present

Affected methods: `eth_getBlockByNumber`, `eth_getBlockByHash`

**Ethereum** omits fork-specific fields for blocks produced before the fork that introduced them. A pre-London block has no `baseFeePerGas`; a pre-Cancun block has no `blobGasUsed`, etc.

**Cronos** populates the following fields for every block regardless of when it was produced:

| Field | Cronos value for historical blocks |
|---|---|
| `baseFeePerGas` | actual fee |
| `blobGasUsed` | always `0x0` |
| `excessBlobGas` | always `0x0` |
| `parentBeaconBlockRoot` | always empty hash |
| `requestsHash` | always empty hash |
| `withdrawals` | always `[]` |
| `withdrawalsRoot` | always empty hash |

**Why:** The block formatter reconstructs headers from CometBFT data without checking which fork was active at the queried height, so it always emits the latest field set. Clients that infer fork era from field *presence* will misread historical Cronos blocks.

#### 3b. Transaction Object and Receipt Field Differences

Affected methods: `eth_getTransactionByHash`, `eth_getTransactionByBlockNumberAndIndex`, `eth_getTransactionByBlockHashAndIndex`, `eth_getTransactionReceipt`

**Ethereum** gates hardfork-specific fields based on when the transaction was submitted: a field only appears if the relevant fork was already active at that time. **Cronos** diverges on these fields:

| Field | Object / Receipt | Ethereum | Cronos |
|---|---|---|---|
| `chainId` | Transaction object | EIP-155–protected or Type 1+ | All types |
| `blobGasUsed`, `blobGasPrice` | Receipt | Actual values for Type 4 (blob) transactions | Always `0` for Type 4 |

**`chainId`** — Ethereum includes this field only when the transaction carries an explicit chain ID: either a legacy (Type 0) transaction signed under EIP-155 replay protection, or a typed transaction (Type 1+, which always encode it). Pre-EIP-155 legacy transactions omit the field entirely. Cronos serializes `chainId` from the chain configuration regardless of transaction type or whether EIP-155 was used.

**`blobGasUsed` / `blobGasPrice`** (receipt) — Ethereum populates these with the actual blob gas consumed and the blob base fee at inclusion time for Type 4 (EIP-4844) transactions. Cronos does not implement EIP-4844 blob gas accounting; both fields are hardcoded to `0`.

#### 3c. `eth_simulateV1` — Latest Hardfork Fields in Simulated Output

Simulated blocks and transactions returned by `eth_simulateV1` can include fields from forks that postdate the simulation's requested fork context — the same over-population behavior as historical blocks (3a above).

Affected block fields: `baseFeePerGas`, `blobGasUsed`, `excessBlobGas`, `parentBeaconBlockRoot`, `requestsHash`, `withdrawals`, `withdrawalsRoot`

Affected transaction fields: `accessList`, `authorizationList`, `blobVersionedHashes`, `chainId`, `maxFeePerBlobGas`, `maxFeePerGas`, `maxPriorityFeePerGas`, `yParity`

