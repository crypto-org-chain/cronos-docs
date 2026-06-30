# debug\_trace Methods - Gas Simulation Bug (Fixed in v1.7.8)

**Summary**

Two related issues have been identified with `debug_trace` methods on nodes running versions earlier than `v1.7.8`. Both return a false `"insufficient funds"` error even when the affected transactions succeeded on-chain (receipt status `0x1`).

**Root Cause**

When replaying a historical transaction, the EVM keeper deducts the gas fee upfront using current fee market parameters. A change in fee market behavior in an older Cronos version causes the recomputed fee to differ from what was originally charged at the time of inclusion. This makes the upfront deduction fail with an "insufficient funds" error, even though the transaction executed successfully on-chain.

{% hint style="warning" %}
The proposed fix bypasses the fee deduction for gas at the simulation level. While this resolves the error, it can result in incorrect gas accounting. We do not recommend relying on this simulation if you need exact gas accounting (for example, calculating precise CRO balances in a wallet). \
See "Implications of the Fix" below.
{% endhint %}

#### **Issue 1: `debug_traceBlockByNumber`**&#x20;

On debug-enabled nodes running binary versions earlier than `v1.7.8`, `debug_traceBlockByNumber` (callTracer) returns a false error trace for one transaction per block across approximately 30 known mainnet blocks:

```json
{
  "error": "rpc error: code = Internal desc = spendable balance X basecro is smaller than Y basecro: insufficient funds"
}
```

The issue is deterministic and reproducible across multiple node providers. Affected blocks:&#x20;

`2195345, 2216975, 2248485, 2398387, 2478809, 8066106, 8292697, 11577952, 11611854, 11614860, 11615746, 11615834, 11616122, 11616540, 11617030, 11617275, 11618202, 11624946, 11624962, 11627501, 11627662, 11628192, 11636446, 11644174, 11723806, 13467231, 13670292, 14058966, 14074873, 14146732`&#x20;

**Note**: This list may expand as further investigation continues.

#### Issue 2: `debug_traceTransaction`&#x20;

On debug-enabled nodes running binary versions earlier than `v1.7.8`, `debug_traceTransaction` (callTracer) returns the following error:

```json
{
  "error": {
    "code": -32000,
    "message": "rpc error: code = Unknown desc = rpc error: code = Internal desc = spendable balance X basecro is smaller than Y basecro: insufficient funds: unknown request"
  }
}
```

### Resolution

Both issues are fixed in [**v1.7.8**](https://github.com/crypto-org-chain/cronos/releases/tag/v1.7.8). Upgrade your node binary to `v1.7.8` to resolve them.

The fix introduces an optional traceReplay boolean in the trace config. When enabled and the upfront fee deduction fails, the keeper logs a warning, continues the trace without charging the fee, and skips the matching gas refund. &#x20;

```json
  {                                                                              
    "jsonrpc": "2.0",
    "method": "debug_traceTransaction",                                          
    "params": ["0x<tx-hash>", { "tracer": "callTracer", "traceReplay": true }],  
    "id": 1                                                                      
  }     
```

Enable `traceReplay` only when a `debug_trace` call against an already-committed transaction fails with a gas/balance error. It is off by default.&#x20;

{% hint style="warning" %}
Because the fix bypasses fee deduction at the simulation level, gas accounting for affected transactions will be approximate. The reported gas figure may be off by approximately the amount of gas consumed by the transaction itself.

Do not rely on trace results with `traceReplay`: true for exact gas accounting (e.g., calculating precise CRO balances in a wallet). Use it to inspect execution flow only. Omitting the flag (or setting it to false) preserves the previous strict behavior.
{% endhint %}
