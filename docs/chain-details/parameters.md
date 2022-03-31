---
meta:
  - name: "title"
    content: Cronos | List of parameters
  - name: "description"
    content: Brief description of all the mentioned network parameters
  - name: "og:title"
    content: Cronos | List of parameters
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Brief description of all the mentioned network parameters
  - name: "og:image"
    content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Cronos | List of parameters
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Brief description of all the mentioned network parameters
  - name: "twitter:image"
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/chain-details/parameters.html
---

# List of parameters

This section aims to collect and provide brief a description of all the mentioned network parameters:


#### Distribution-related parameters - `distribution` module

| Key                     | Type         | Description                                                              |
| ----------------------- | ------------ | ------------------------------------------------------------------------ |
| `base_proposer_reward`  | string (dec) | Base bonus on transaction fees collected in a valid block                |
| `bonus_proposer_reward` | string (dec) | Max bonus on transaction fees collected in a valid block                 |
| `community_tax`         | string (dec) | The rate of community tax                                                |
| `withdraw_addr_enabled` | bool         | Whether delegators can set a different address to withdraw their rewards |

#### Punishment-related parameters - `gov` module

| Key                  | Type                 | Description                                                                                             |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `min_deposit`        | array (coins)        | Minimum deposit for a proposal to enter voting period                                                   |
| `max_deposit_period` | string (time in ns)  | Maximum period for Cro holders to deposit on a proposal                                                 |
| `voting_period`      | string (time in ns)) | The length of voting period                                                                             |
| `quorum`             | string (dec)         | The minimum percentage of voting power that needs to be casted on a proposal for the result to be valid |
| `threshold`          | string (dec)         | Minimum proportion of `Yes` votes (excluding `Abstain` votes) for the proposal to be accepted           |
| `veto`               | string (dec)         | Minimum proportion of `Veto` votes to Total votes ratio for proposal to be vetoed                       |


#### Reward-related parameters - `mint` module

| Key                     | Type           | Description                                           |
| ----------------------- | -------------- | ----------------------------------------------------- |
| `blocks_per_year`       | string (int64) | The expected number of blocks being produced per year |
| `goal_bonded`           | string (dec)   | Goal of bonded token in percentage                    |
| `inflation_max`         | string (dec)   | Maximum annual inflation rate                         |
| `inflation_min`         | string (dec)   | Minimum annual inflation rate                         |
| `inflation_rate_change` | string (dec)   | Maximum annual change in inflation rate               |
| `mint_denom`            | string         | Token type being minted. Denominations can be 3 ~ 128 characters long and support letters, followed by either a letter, a number or a separator ('/')                              |

#### Punishment-related parameters - `slashing` module

| Key                          | Type           | Description                                                                |
| ---------------------------- | -------------- | -------------------------------------------------------------------------- |
| `downtime_jail_duration`     | string (int64) | The jailing duration for validators with low availability                  |
| `min_signed_per_window`      | string (dec)   | Threshold of total missed blocks                                           |
| `signed_blocks_window`       | string (int64) | Window to calculate validators's liveness                                  |
| `slash_fraction_double_sign` | string (dec)   | Maximum percentage of stake reduction for byzantine validators             |
| `slash_fraction_downtime`    | string (dec)   | Maximum percentage of stake reduction for validators with low availability |



#### Staking-related parameters - `staking` module

| Key                  | Type   | Description                                                     |
| -------------------- | ------ | --------------------------------------------------------------- |
| `bond_denom`         | string | Coin denomination for staking. Denominations can be 3 ~ 128 characters long and support letters, followed by either a letter, a number or a separator ('/')                                   |
| `historical_entries` | uint16 | The number of historical entries to persist                     |
| `max_entries`        | uint16 | The max entries for either unbonding delegation or redelegation |
| `max_validators`     | uint16 | The maximum number of validator                                 |
| `unbonding_time`     | string | The time duration of unbonding                                  |

#### Transfer-related parameters - `transfer` module

| Key                     | Type           | Description                                           |
| ----------------------- | -------------- | ----------------------------------------------------- |
| `receive_enabled`       | bool           | An array of Receive enabled entries mapping coin denominations to their `receive_enabled` status |
| `send_enabled`          | bool           | An array of SendEnabled entries mapping coin denominations to their `send_enabled` status |

#### Evm-related parameters - `evm` module

| Key                     | Type         | Description                                                              |
| ----------------------- | ------------ | ------------------------------------------------------------------------ |
| `evm_denom`             | string       | The token denomination used on the EVM state transitions and gas consumption for EVM messages. The default value is "basetcro"              |
| `enable_create`         | bool         | Toggles state transitions that use the `vm.Create` function, and it prevents all contract creation functionality if it is disabled.                |
| `enable_call`           | bool         | Toggles state transitions that use the `vm.Call` function, and it prevents transfers between accounts and executing a smart contract call if it is disabled                                                |
| `extra_eips`            | []int        | The set of activateable Ethereum Improvement Proposals (EIPs) on the Ethereum VM Config that apply custom jump tables |
