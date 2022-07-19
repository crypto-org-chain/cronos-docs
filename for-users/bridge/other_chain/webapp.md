# Cronos Bridge Web App

## Transfer assets from the Crypto.org Chain using the Cronos Bridge Web App

### Step-by-step walkthrough

**Step 1: Connect your wallet**

Click the “Connect Wallet’ button to connect your desktop or browser extension wallet. We currently support browser-compatible versions of the Metamask, Keplr, and Crypto.com DeFi Wallet. Once a connection request is sent, look for a popup from your wallet interface or click into the wallet extension to give consent.

Note 1: If you are bridging assets from or to Crypto.org, you may specify the destination wallet by pasting the address directly or connecting a second wallet to avoid manual errors.

Note 2: Currently, Terra ⇔ Cronos only support Keplr wallet. Learn how to add your Terra station wallet to Keplr wallet, please click [here](webapp.md#add-your-terra-station-wallet-to-keplr-wallet).

![centered image](../assets/webapp\_connect\_wallet.png)

**Step 2. Select Network and Token**

Select the origin chain on the left and the destination chain on the right in the bridge interface. We will do our best to auto-suggest your wallet network to match the desired transfer parameter. However, a manual adjustment on your end may be needed to set your wallet to match the selected network.

If you are transferring from or to Crypto.org, you need to specify the destination address by inputting the address manually or connecting a second wallet to receive your funds.

Once the networks are chosen, select the asset you would like to transfer.

![centered image](../assets/webapp\_select\_network.png)

**Step 3. Enter the amount**

Once the network and asset have been chosen, insert and confirm the amount you would like to transfer.

Our decentralized bridge protocol does not impose a minimum and maximum amount. However, bridging a very small amount may have a high gas fee in proportion to the amount transferred.

After the amount is entered, the bridge network fees will be calculated accordingly. The bridge itself and Crypto.org do not charge an additional fee.

During the promotional launch period, the network fee incurred by the bridge will be waived. You will still be liable to pay a gas fee directly on your preferred wallet charged by the source network.

Before bridging a large amount, we encourage testing a transfer of a minor amount first to ensure all the settings are correct.

![centered image](../assets/webapp\_enter\_amout.png)

**Step 4. Confirm the transaction**

Once all transfer settings have been confirmed, a transaction confirmation page will pop up summarizing the transaction.

This will send a transaction request to your wallet; please confirm on your wallet screen to ultimately authorize the transfer.

Please note that after bridging the tokens, they will be converted into the destination blockchain-supported tokens. See [FAQ](webapp.md#faq) for more information

![centered image](../assets/webapp\_confirmation\_screen.png)

![centered image](../assets/4a\_confirm\_wallet\_txn.png)

![centered image](../assets/4b\_confirm\_wallet\_txn.png)

![centered image](../assets/4c\_confirm\_wallet\_txn.png)

**Step 5. Bridging assets**

After the transaction is confirmed from the wallet, the bridge operation will commence. First, we will initiate and wait for the deposit of the assets on the origin chain. Once the deposit is confirmed, we will initiate the transfer in the destination chain to your desired receiving wallet address. Both transactions will include an external link to view and monitor the transaction on-chain via scanning utilities such as Cronos, and Crypto.org explorer.

Even if you dismiss, quit, or refresh the page, a small popup reminder will be available to indicate an in-progress transaction. A “transfer completed” message will finally confirm that the transaction has been completed successfully. You may also see a full record of past transactions tied to your wallet in the History tab.

Thank you for using the Cronos bridge and supporting the Crypto.org ecosystem!

![centered image](../assets/5\_txn\_complete.png)

![centered image](../assets/5\_history\_table.png)
