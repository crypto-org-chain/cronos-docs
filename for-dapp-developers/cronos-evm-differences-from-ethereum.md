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

### **3. debug\_trace traceReplay parameter**

Cronos EVM `debug_traceTransaction`, `debug_traceBlock`, and `debug_traceCall` accept an optional `traceReplay` boolean in the trace config that does not exist in standard Ethereum clients (e.g., Geth).

`{ "tracer": "callTracer", "traceReplay": true }`

This flag is Cronos-specific, used to trace a small number of historical transactions affected by a legacy gas accounting discrepancy. When enabled and the upfront fee deduction fails, the keeper continues the trace without charging the fee.

Enable it only when a `debug_trace` call against an already-committed transaction fails with a gas/balance error. It is off by default.

{% hint style="warning" %}
_Note: Do not rely on trace results with traceReplay: true for exact gas accounting. Use it to inspect execution flow only._
{% endhint %}

For the full list of affected blocks and technical details, see [debug\_trace Gas Simulation Bug page](../for-node-hosts/running-nodes/cronos-mainnet/debug_trace-methods-gas-simulation-bug-fixed-in-v1.7.8.md).                                          &#x20;
