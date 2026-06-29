---
description: >-
  A guide for querying IBC transfers between Cronos POS
  (crypto-org-chain-mainnet-1), Cronos EVM (cronosmainnet_25-1), and other
  supported Cosmos chains via the public Cronos bridge-indexer API.
---

# Cronos IBC Bridge Activity API

### Base URL & Authentication

* Base URL: [https://cronos.org/indexing/api/v1/bridges](https://cronos.org/indexing/api/v1/bridges)
* Auth: none (public endpoint)

#### What this API covers

* IBC transfers between supported chains, indexed end-to-end: source chain transaction, destination chain transaction, amount, denom, status.
* Includes the `x/cronos` auto-conversion from IBC voucher to native basecro on the EVM side. The API reports the logical transfer as a single activity even though on-chain, it involves two-stage transfers.

#### Does NOT cover:

* Cosmos-side MsgSend transfers within a single chain
* [Ethereum <-> Cronos Gravity Bridge](https://github.com/crypto-org-chain/gravity-bridge) deposits/withdrawals
* Smart-contract internal transfers on the EVM side
* Fee payments, staking rewards, module-account sweeps

For those flows you need to parse `block_results` events directly (see [Cosmos SDK documentation](https://docs.cosmos.network/sdk/latest/learn) on transfer events `coin_received`  and `coin_spent` ).

### Supported networks and address formats

| Chain                      | Network Parameter | Required Address Format   | Example Prefix |
| -------------------------- | ----------------- | ------------------------- | -------------- |
| Cronos EVM                 | cronosevm         | Ethereum hex (0x...)      | 0x             |
| Cronos EVM (Cosmos)        | cronos            | Bech32 with HRP crc       | crc1...        |
| Cronos POS                 | cryptoorgchain    | Bech32 with HRP cro       | cro1...        |
| Cosmos Hub                 | cosmoshub         | Bech32 with HRP cosmos    | cosmos1...     |
| Other IBC-connected chains | (others)          | Chain-specific bech32 HRP | varies         |

**IMPORTANT:**&#x20;

Passing the wrong address format for a given network returns `{"result": [], "pagination": {...}}` with no error, just an empty result set.

This is the most common reason you will think an address has no IBC activity when it actually does.

#### Converting between address formats

`cronosevm` and `cronos` refer to the same underlying account, just expressed differently.

To convert:

```shellscript
# Using cronosd (Cronos EVM binary)
cronosd debug addr 0x582f7c906f15f6fe913f890fd4d11e07ae3b4468
# Output:
#   Address (hex): 582F7C906F15F6FE913F890FD4D11E07AE3B4468
#   Bech32 Acc:    crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya
```

Or programmatically: take the 20-byte raw address and bech32-encode with HRP `crc` (testnet: `tcrc`); Cronos POS addresses use HRP `cro` (testnet: `tcro`).

Always lowercase addresses before passing them to the API.

### Endpoints

#### Global activities

* **GET** `/bridges/activities`&#x20;
* **Full Path:** `https://cronos.org/indexing/api/v1/bridges/activities`

Returns IBC activities across all addresses. Filter to one address using the `cronosAddress`  (`crc1...` address) query parameter.

```bash
curl 'https://cronos.org/indexing/api/v1/bridges/activities?cronosAddress=crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya&order=sourceBlockTime.desc&pagination.limit=50'
```

#### Per-account activities

* **GET** `/bridges/{network}/account/{account}/activities`&#x20;
* **Full Path:** `https://cronos.org/indexing/api/v1/bridges/{network}/account/{account}/activities`

Scope queries to a specific account on a specific chain.

* `{network}` must be one of: `cronosevm`, `cronos`, `cryptoorgchain`, `cosmoshub`, or other supported chain slug.&#x20;
* `{account}` must be in the address format matching the network

See [Supported networks and address formats](cronos-ibc-bridge-activity-api.md#supported-networks-and-address-formats) for parameter details.

**Examples:**

```shellscript
# cronosevm — account is Cronos EVM hex address (0x...)
curl 'https://cronos.org/indexing/api/v1/bridges/cronosevm/account/0x582f7c906f15f6fe913f890fd4d11e07ae3b4468/activities?order=sourceBlockTime.desc&pagination.limit=100'
```

```shellscript
# cronos — account is Cronos EVM cosmos address (crc1...)
curl 'https://cronos.org/indexing/api/v1/bridges/cronos/account/crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya/activities?order=sourceBlockTime.desc&pagination.limit=100'
```

```shellscript
# cryptoorgchain — account is Cronos POS address (cro1...)
curl 'https://cronos.org/indexing/api/v1/bridges/cryptoorgchain/account/cro1y0rtatsmnl69nwgcxwud84yscc5vku48nw52uu/activities?order=sourceBlockTime.desc&pagination.limit=100'
```

```shellscript
# cosmoshub — account is Cosmos Hub address (cosmos1...)
curl 'https://cronos.org/indexing/api/v1/bridges/cosmoshub/account/cosmos1abc.../activities?order=sourceBlockTime.desc'
```

#### Transaction lookup

* **GET** `/bridges/txs/{hash}`
* **Full URL Path:** `https://cronos.org/indexing/api/v1/bridges/txs/{hash}`

Returns a single activity by source or destination transaction hash. Use when you know the transaction hash but need the paired cross-chain context.

### **Query parameters**

<table data-header-hidden="false" data-header-sticky data-search="false"><thead><tr><th width="206.31317138671875">Parameter</th><th>Values/Format</th><th>Notes</th></tr></thead><tbody><tr><td>order</td><td><code>sourceBlockTime.desc</code> or <code>sourceBlockHeight.desc</code></td><td>Default is ASC. Only <code>.desc</code> accepted; <code>.asc</code> returns error. Omit for ascending.</td></tr><tr><td>status</td><td><code>pending</code>, <code>cancelled</code>, <code>counterparty_confirmed</code>, <code>failed_on_chain,</code> <code>counterparty_rejected</code></td><td>Lowercase</td></tr><tr><td>id.gt </td><td>Integer</td><td>Cursor-based pagination: records with id > value</td></tr><tr><td>createdAt.lt</td><td>RFC3339 timestamp</td><td>Created before</td></tr><tr><td>createdAt.gt</td><td>RFC3339 timestamp</td><td>Created after</td></tr><tr><td>createdAt.ago</td><td>Go duration e.g. 24h, 7d</td><td>Created before now minus duration</td></tr><tr><td>updatedAt.gt</td><td>RFC3339 timestamp</td><td>Updated after</td></tr><tr><td>sourceBlockTime.lt</td><td>RFC3339 timestamp</td><td>Source block range filter: before</td></tr><tr><td>sourceBlockTime.gt</td><td>RFC3339 timestamp</td><td>Source block range filter: after</td></tr><tr><td>sourceBlockTime.ago</td><td>Go duration e.g. 24h, 7d</td><td>Source block range filter: before now minus duration</td></tr><tr><td>destinationBlockTime.gt</td><td>RFC3339 timestamp</td><td>Destination block after</td></tr><tr><td>pagination.limit</td><td>Integer</td><td>Default 20, max 100</td></tr><tr><td>pagination.page</td><td>Integer</td><td>1-indexed</td></tr></tbody></table>

### Response schema

```shellscript
{
  "result": [
    {
      "id": 9314,
      "uuid": "72bc9e5a-05a4-4cbf-b50f-ba249ddecfd5",
      "bridgeType": "IBC",
      "status": "CounterpartyConfirmed",

      "sourceChain": "Crypto.org-Chain",
      "sourceBlockHeight": 3124582,
      "sourceBlockTime": "2021-11-08T07:16:50.797866749Z",
      "sourceTransactionId": "D93492EC600D5F8AB23C27174E42E8DF05AD01BBE2D24B33D3CBE475F62F5515",
      "sourceAddress": "cro1z6jwtxu49r2eap8zpcm9lamwjc2walvdgmvfw4",
      "sourceSmartContractAddress": null,

      "destinationChain": "Cronos",
      "destinationBlockHeight": 4103,
      "destinationBlockTime": "2021-11-08T07:17:02.860094706Z",
      "destinationTransactionId": "C5481E5282AAC2103C9B2F115D062243A323FFBD18B30E48D56179102DBBCF37",
      "destinationAddress": "crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya",
      "destinationSmartContractAddress": null,

      "channelId": "channel-44",
      "amount": "10000000000",
      "denom": "basecro",
      "displayAmount": "100.000000000000000000",
      "displayDenom": "CRO",

      "bridgeFeeAmount": null,
      "bridgeFeeDenom": null,

      "createdAt": "2022-11-02T05:54:59.517138882Z",
      "updatedAt": "2022-11-02T05:55:19.240246896Z"
    }
  ],
  "pagination": {
    "total_record": 4,
    "total_page": 1,
    "current_page": 1,
    "limit": 100
  }
}
```

#### Identifying direction

Direction from the perspective of Cronos EVM is determined by `sourceChain` and `destinationChain`:

<table data-header-hidden="false" data-header-sticky><thead><tr><th>Direction</th><th>Condition</th></tr></thead><tbody><tr><td><p>Inbound to Cronos EVM</p><p>(Cronos POS -> Cronos EVM) </p></td><td>sourceChain == "Crypto.org-Chain" AND destinationChain == "Cronos"</td></tr><tr><td><p>Outbound from Cronos EVM</p><p>(Cronos EVM -> Cronos POS)</p></td><td>sourceChain == "Cronos" AND destinationChain == "Crypto.org-Chain"</td></tr></tbody></table>

When filtering by a Cronos-side address, it appears in:

* `destinationAddress` for inbound records
* `sourceAddress` for outbound records

#### Amount interpretation

* `amount`: raw on-chain amount in the smallest unit of the source chain
* `denom`: source-chain denom (e.g. basecro)
* `displayAmount`: human-readable amount divided by the correct decimal factor
* `displayDenom`: user-facing ticker (e.g. CRO)

{% hint style="info" %}
Note the decimal mismatch: Cronos POS uses 8-decimal basecro (1 CRO = 10⁸ basecro), while Cronos EVM uses 18-decimal basecro (1 CRO = 10¹⁸ basecro). The API reports the source-side raw amount in amount. For a Cronos POS→Cronos EVM transfer of 10 CRO, amount will be 1000000000 (10 × 10⁸), while the balance credited on CEVM is 10000000000000000000 (10 × 10¹⁸) after `x/cronos` auto-conversion.
{% endhint %}

#### Status values

<table data-header-hidden="false" data-header-sticky><thead><tr><th>Status</th><th>Meaning</th></tr></thead><tbody><tr><td>Pending</td><td>Source tx submitted, destination not yet delivered</td></tr><tr><td>CounterpartyConfirmed</td><td><p>Packet successfully delivered on destination (normal success state</p><p><br></p></td></tr><tr><td>CounterpartyRejected</td><td>Destination rejected the packet (rare; usually denom/channel mismatch)</td></tr><tr><td>FailedOnChain</td><td><p>Source transaction failed</p><p><br></p></td></tr><tr><td>Cancelled</td><td><p>User/relayer cancelled before delivery</p><p><br></p></td></tr></tbody></table>

For balance reconciliation, only `CounterpartyConfirmed` inbound records should be credited.

### Worked example

Cronos EVM Address: `0x582f7c906f15f6fe913f890fd4d11e07ae3b4468`

Option A - query by hex address via `cronosevm`:

```shellscript
curl 'https://cronos.org/indexing/api/v1/bridges/cronosevm/account/0x582f7c906f15f6fe913f890fd4d11e07ae3b4468/activities?order=sourceBlockTime.desc&pagination.limit=100'
```

Option B - convert to bech32 first, then query via `cronos`:

```shellscript
# Convert 0x to bech32
cronosd debug addr 582f7c906f15f6fe913f890fd4d11e07ae3b4468
# → Bech32 Acc: crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya

# Pull all activities
curl 'https://cronos.org/indexing/api/v1/bridges/cronos/account/crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya/activities?order=sourceBlockTime.desc&pagination.limit=100'
```

Both return the same 4 records, all inbound from Cronos POS:

<table data-header-hidden="false" data-header-sticky><thead><tr><th>Cronos EVM destinationBlockHeight</th><th>Cronos POS sourceBlockHeight</th><th>Time (UTC)</th><th>Amount</th></tr></thead><tbody><tr><td>840</td><td>3,121,648</td><td>2021-11-08 02:17:16 </td><td>10 CRO</td></tr><tr><td>869</td><td>3,121,677</td><td>2021-11-08 02:19:56</td><td>20 CRO</td></tr><tr><td>1,524</td><td>3,122,266</td><td>2021-11-08 03:20:05</td><td>1,000 CRO</td></tr><tr><td>4,103 </td><td>3,124,582 </td><td>2021-11-08 07:17:02</td><td>100 CRO</td></tr></tbody></table>

Direct cross-check: `cronosd q bank balances crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya --height 840` returns `10000000000000000000 basecro` (= 10 CRO), matching the first activity's `displayAmount`.

### Common query recipes

All inbound IBC transfers to a Cronos EVM address in a date range:

```shellscript
curl "https://cronos.org/indexing/api/v1/bridges/cronosevm/account/${HEX_ADDRESS}/activities?order=sourceBlockTime.desc&sourceBlockTime.gt=2025-01-01T00:00:00Z&sourceBlockTime.lt=2025-04-01T00:00:00Z&pagination.limit=100"
```

Last 24h of bridge activity, all addresses:

```shellscript
curl "https://cronos.org/indexing/api/v1/bridges/activities?sourceBlockTime.ago=24h&order=sourceBlockTime.desc&pagination.limit=100"
```

Pending transfers for a Cronos POS address:

```shellscript
curl "https://cronos.org/indexing/api/v1/bridges/cryptoorgchain/account/${CRO_ADDRESS}/activities?status=pending&order=sourceBlockTime.desc"
```

Paginate all history for an address (Python):

```python
import urllib.request, json 
def fetch_all(network, account): 
    """ 
    network: one of 'cronosevm', 'cronos', 'cryptoorgchain', 'cosmoshub', etc. 
    account: address in the format expected by the network (see section 2)
    """ 
    base = f"https://cronos.org/indexing/api/v1/bridges/{network}/account"
    rows, page = [], 1
    while True:
        url = f"{base}/{account}/activities?order=sourceBlockTime.desc&pagination.limit=100&pagination.page={page}"
        with urllib.request.urlopen(url, timeout=30) as r:
            d = json.load(r)
        rows.extend(d["result"])
        if page >= d["pagination"]["total_page"]:
            break 
        page += 1
    return rows

# Examples
fetch_all("cronosevm", "0x582f7c906f15f6fe913f890fd4d11e07ae3b4468") fetch_all("cronos", "crc1tqhheyr0zhm0ayfl3y8af5g7q7hrk3rgs7lwya") fetch_all("cryptoorgchain", "cro1z6jwtxu49r2eap8zpcm9lamwjc2walvdgmvfw4")
```

### Gotchas and limitations

1. **Address format must match the network slug:** `cronosevm` expects `0x` hex; `cronos` expects `crc1` bech32; `cryptoorgchain` expects `cro1` bech32; `cosmoshub` expects `cosmos1` bech32. Wrong format returns empty results with no error.
2. **`cronosevm` and `cronos` are the same account:** two representations of the same Cronos EVM address. Either can be used; pick whichever you already have on hand.
3. **Order param:** only `.desc` is accepted. Omit the param entirely for ascending order.
4. **Decimal mismatch:** amount is in source-chain units. For Cronos POS->Cronos EVM the balance credit on CEVM is 10^10 x amount (Cronos POS uses 8-decimal basecro; CEVM uses 18-decimal). Always use `displayAmount` for user-facing presentation.
5. **No EVM-side tx hash:** `destinationTransactionId` is the CometBFT tx hash on Cronos EVM (the IBC MsgRecvPacket), not an EVM transaction hash. There is no EVM tx for IBC receives - they are Cosmos-side operations. As a result, Cronos EVM explorers do not surface these IBC transfers; query them via this API or a Cosmos-side explorer instead.
6. **Auto-conversion is implicit:** the record shows the logical transfer but does not expose the two-stage `x/cronos` conversion. Balance reconciliation should credit the destination address in native basecro (18-decimal on Cronos EVM) even though on-chain there is a transient IBC voucher.
7. **Rate limits:** not documented. Treat as reasonable use `- paginate` at `limit=100` and avoid parallel bulk pulls.
8. **Bridges only:** native Cosmos MsgSend, Gravity Bridge, and smart-contract transfers are not covered by this API.
