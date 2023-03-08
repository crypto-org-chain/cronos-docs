# module\_bank

#### `bank` module

#### Introduction

The `bank` module maintains the state of two primary objects:

* Account balances by address;
* Total supply of tokens of the chain

`bank` module tracks and provides query support for the total supply of all assets used in the application. It also supports token transfer functionalities. Specifically, the total supply is updated whenever a token is:

* **Minted**, e.g. Token created by the [mint](../../docs/chain-details/module\_mint/) module; or
* **Burned**, e.g. Token distorted by the [slashing](../../docs/chain-details/module\_slashing/) module.

#### Transactions and Queries

#### Transactions

**`tx bank send [from_key_or_address] [to_address] [amount] [network_id]` - Send Funds**

You can transfer of tokens between to a designated address by the `tx bank send` command. For example, we can send 1 basetcro to Bob's address by

```bash
$ cronosd tx bank send mykey tcrc1xwxk09wds0u2k6l39sp0e8ajx3jkw6dm0z5c26 1basetcro --keyring-backend test --chain-id ethermint-2

## Transaction payload##
{"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":<address a>,"to_address":<address b>,"amount":[{"denom":"basetcro","amount":"1"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[],"gas_limit":"200000","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

#### Queries

**`query bank balances [address]` - Check the balance of a specified account**

One can check the current balance of a specified account by:

```json
$ cronosd query bank balances tcrc1a303tt49l5uhe87yaneyggly83g7e4uncdxqtl --output json | jq
{
  "balances": [
    {
      "denom": "basetcro",
      "amount": "99999000000000000000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

**`query bank total` - Check the total supply of the token**

You can also check the current total supply of the token by:

```json
$ cronosd query bank total --output json | jq
{
  "supply": [
    {
      "denom": "basetcro",
      "amount": "100020217468056427441579571"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```



**REST endpoint**

The parameters can be checked by browsing to the following REST endpoint on Mainnet:

[https://rest.cronos.org/cosmos/bank/v1beta1/params](https://rest.cronos.org/cosmos/bank/v1beta1/params)/

```json
{
  "params": {
    "send_enabled": [
      {
        "denom": "stake",
        "enabled": true
      },
      {
        "denom": "basecro",
        "enabled": false
      }
    ],
    "default_send_enabled": true
  }
}
```

**``**

#### Appendix

**`bank` module: Network Parameters and configuration**

| Key                  | Type           | Example                                |
| -------------------- | -------------- | -------------------------------------- |
| `SendEnabled`        | \[]SendEnabled | \[{denom: "basetcro", enabled: true }] |
| `DefaultSendEnabled` | bool           | true                                   |
