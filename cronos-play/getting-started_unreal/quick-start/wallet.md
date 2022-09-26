# Wallet

### InitializeWallet

Restore wallet with mnemonics.

<figure><img src="../../../.gitbook/assets/image (14) (1).png" alt=""><figcaption></figcaption></figure>

* **Mnemonics**: mnemonics. to restore
* **Password**: salt in mnemonics restoration
* **Output**: generated address (index=0)
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## InitializeNewDevelopmentOnlyWallet



Restore wallet with mnemonics.

<figure><img src="../../../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>

* **Mnemonics**: mnemonics. to restore
* **Password**: salt in mnemonics restoration
* **Output**: generated address (index=0)
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## GetBackupMnemonicPhrase

Get backup mnemonic phrase.

<figure><img src="../../../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

* **Output**: backup mnemonics
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## DevelopmentOnlyGenerateMnemonics

Generate mnemonics.

<figure><img src="../../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

* **Password**: salt in mnemonics restoration
* **Wordcount**: mnemonics word count (12, 18, 24)
* **Output**: generated mnemonics
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## GetEthAddress

Get eth address with index

<figure><img src="../../../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

* **Index**: wallet index which starts from 0
* **Output**: get eth address
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## GetEthBalance

Get eth balance

<figure><img src="../../../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>

* **Address**: eth address
* **Output**: get balance
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## SignEthAmount

Sign eth amount

<figure><img src="../../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

* **Wallet Index**: wallet index which starts from 0
* **Fromaddress**: sender address
* **Toaddress**: receiver address
* **Amount**: amount in eth decimal, eg. 0.1 means 0.1 eth
* **Gas Limit**: gas limit, fee= gasLimit \* gasPrice
* **Gas Price**: gas price in wei, eg. 1wei= 1/(10^18)eth 1wei=1/(10^9)gwei
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed
* **Return Value**: signed transaction as bytes

## SendEthAmount or SendEthAmountAsync

Send eth amount

<figure><img src="../../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

* **Wallet Index**: wallet index which starts from 0
* **Fromaddress**: sender address
* **Toaddress**: receiver address
* **Amount**: amount in eth decimal, eg. 0.1 means 0.1 eth
* **Gas Limit**: gas limit, fee= gasLimit \* gasPrice
* **Gas Price**: gas price in wei, eg. 1wei= 1/(10^18)eth 1wei=1/(10^9)gwei
* **Output**: transaction hash
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## SignLogin

Sign eth login

<figure><img src="../../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

* **Wallet Index**: which wallet to use
* **Document**: document to sign
* **Signature**: get signature
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed

## VerifyLogin

Verify eth login

<figure><img src="../../../.gitbook/assets/image (20).png" alt=""><figcaption></figcaption></figure>

* **Document**: document to verify
* **Signature**: signature to verify
* **Success**: whether succeed or not
* **Output Message**: error message, "" if succeed



