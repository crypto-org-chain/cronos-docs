# Gas Mechanics

Cronos uses an EIP-1559–style **fee market** (via Ethermint's `x/feemarket` module). Every block has a network-wide **base fee** (price per unit of gas). That value is recomputed at the start of each block from how full the previous block was, so fees rise under congestion and fall when the chain is quiet.

### What the algorithm compares&#x20;

Define the parent block's gas target:

$$
\text{gasTarget} = \left\lfloor \frac{\text{blockGasLimit}}{\text{ElasticityMultiplier}} \right\rfloor
$$

On Cronos, the documented default elasticity is **4**, so the target is **25% of the block gas limit**. (Ethereum's classic EIP-1559 default is 2 → 50% target.)&#x20;

The parent utilization input is **block gas wanted**, after this EndBlock clamp:

$$
\text{parentGasWanted} = \max(\text{gasWanted} \times \text{MinGasMultiplier},\; \text{gasUsed})
$$

Default `MinGasMultiplier` is **0.5**.

### Exact base-fee formula

Let `parentBaseFee` be the previous block's base fee, and let `D` be `BaseFeeChangeDenominator`.

Cronos' documented default for `D` is **300** (Ethereum's is 8), so base fee moves much more slowly block-to-block.

#### Unchanged

If `parentGasWanted == gasTarget`:

$$
\text{baseFee}' = \text{parentBaseFee}
$$

#### Congestion (increase)

If `parentGasWanted > gasTarget`:

$$
\Delta = \max\left(
  \left\lfloor
    \frac{\text{parentBaseFee} \cdot (\text{parentGasWanted} - \text{gasTarget})}
         {\text{gasTarget} \cdot D}
  \right\rfloor
,\; 1\right)
$$

$$
\text{baseFee}' = \text{parentBaseFee} + \Delta
$$

The `max(..., 1)` means any block above target bumps the base fee by at least 1 unit.

#### Slack capacity (decrease)

If `parentGasWanted < gasTarget`:

$$
\Delta = \left\lfloor
  \frac{\text{parentBaseFee} \cdot (\text{gasTarget} - \text{parentGasWanted})}
       {\text{gasTarget} \cdot D}
\right\rfloor
$$

$$
\text{baseFee}' = \max(\text{parentBaseFee} - \Delta,\; \text{MinGasPrice})
$$

`MinGasPrice` is the hard floor. On Cronos this has historically been set equal to the initial base fee (e.g. **3750 gwei**, later governance proposals to lower it), so when the network is idle the base fee sits on that floor instead of drifting toward zero.

### What users actually pay

For an EIP-1559-style tx:

$$
\text{effectiveGasPrice} = \min(\text{baseFee} + \text{tipCap},\; \text{feeCap})
$$

$$
\text{fee} \approx \text{effectiveGasPrice} \times \text{gasUsed}
$$

Your `feeCap` / `maxFeePerGas` must be ≥ the current base fee or the tx won't be valid for inclusion. Tips affect priority when the mempool is contested; they do not change the protocol base-fee update itself.

### Cronos vs Ethereum

| Aspect               | Ethereum EIP-1559               | Cronos fee market               |
| -------------------- | ------------------------------- | ------------------------------- |
| Base fee update      | Same family of formula          | Same formula in Cronos          |
| Change speed (`D`)   | 8                               | 300 (much slower)               |
| Gas target           | \~50% of limit (`elasticity=2`) | \~25% of limit (`elasticity=4`) |
| Floor                | effectively 0 historically      | `MinGasPrice` (governance-set)  |
| Base fee destination | burned                          | Cosmos fee distribution         |
| Utilization input    | block gas used                  | capped gas wanted               |
