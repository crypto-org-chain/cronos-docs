---
description: >-
  Get started with the all-in-one Tenderly platform and learn how it can help
  you accelerate development on Cronos. Find out how to use the platform to
  build, test, improve, and monitor your DApp!
---

# Tenderly

## Introduction

The all-in-one Tenderly Web3 development platform combines development tools and observability tightly integrated with blockchain infrastructure building blocks. It enables Web3 engineers to accelerate blockchain development by building, testing, monitoring, and operating smart contracts in one place.

### Accelerate Your Web3 Development with Tenderly

Tenderly provides Web3 developers with all the necessary tools to optimize their development workflows and confidently build better dapps. Its tightly integrated tools eliminate fragmentation from the development process, providing a unified developer experience.

Using the Tenderly platform, you can:

* **Build reliable smart contracts faster** by ensuring code correctness, previewing execution outcomes, and optimizing gas before deployment. &#x20;
* **Improve your teams’ development velocity** by improving collaboration, sharing test results across teams, and keeping everyone involved to ensure consistency.&#x20;
* **Create user-focused dapps quickly and confidently** by eliminating anxiety and guesswork for your users, providing data-rich notifications, and improving UX. &#x20;

## Tenderly features

Tenderly tools cover each step of smart contract and dapp development. Here are some of the notable tools and features:&#x20;

* [Sandbox is an in-browser prototyping environment](https://docs.tenderly.co/tenderly-sandbox) that allows Solidity developers to deploy, run, and debug smart contracts almost instantly. It requires no setup and deploys your contract to a Tenderly Fork, which makes it extremely fast. You can choose the Cronos mainnet or testnet as the network for your Sandbox and start prototyping your contracts.&#x20;
* [Tenderly Debugger is a debugging tool](https://docs.tenderly.co/debugger/how-to-use-tenderly-debugger) that can identify the exact lines of code causing an issue in your smart contract. You can use it to debug your contracts during development or troubleshoot failed transactions in production. It allows you to view transaction calls, evaluate Solidity expressions, review decoded events and state changes, and more.&#x20;
* [Tenderly Debugger Chrome Extension](https://chrome.google.com/webstore/detail/tenderly-debugger/miiolgcpknpjjfagkaddfgakbdenenfn) allows you to open Tenderly Debugger from any transaction hash directly from your browser.&#x20;
* [Gas Profiler analyzes smart contract gas usage](https://docs.tenderly.co/debugger/how-to-use-tenderly-debugger#gas-profiler) and breaks it down to individual function calls. It enables you to identify lines of code that consume a lot of gas and then optimize them while still in development.&#x20;
* [Transaction Simulator lets you preview transactions](https://docs.tenderly.co/simulations-and-forks/how-to-simulate-a-transaction) and test smart contracts without deploying them to a network. It also allows you to replay failed transactions so you can analyze their execution and validate potential bug fixes. You can even simulate executed transactions with overridden contract states or transaction parameters.
* [Simulation API enables you to integrate Transaction Simulator](https://docs.tenderly.co/simulations-and-forks/simulation-api) and use it programmatically. You can use it to expose Transaction Simulator to your end users in your dapp UI. This way, you enable your users to preview transactions directly from your dapp so they can execute them with confidence.
* [Tenderly Forks are a private network replica](https://docs.tenderly.co/simulations-and-forks/how-to-create-a-fork) you can use as your personal development or testing environment. A Fork enables you to fork the most recent Cronos mainnet or testnet data. You can then use it to develop, test, and simulate complex transaction scenarios while sharing results with your team. Use a Fork to chain multiple simulations, run complex tests simultaneously, and get complete control over your testing environment.&#x20;
* [Alerting is a part of Tenderly’s observability stack](https://docs.tenderly.co/alerts/intro-to-alerts). It allows you to receive custom, real-time notifications to your preferred channel or Webhook endpoint. You can choose a variety of triggers for your alerts so you can stay up to date with specific events on Cronos related to your smart contracts or wallets. &#x20;
* [Web3 Actions are programmable hooks](https://docs.tenderly.co/web3-actions/intro-to-web3-actions) that Tenderly executes automatically when relevant on-chain or off-chain events happen. They allow you to automate your responses and execute custom code whenever something of interest takes place. You can also use Web3 Actions as a serverless backend for your Cronos chain dapps.&#x20;
* [Analytics helps you track trends and metrics](https://docs.tenderly.co/analytics/general-analytics) on Cronos. You can use it to create custom queries, get in-depth blockchain data, and expose it to your end users. You can also create graphs to represent the data you need visually.&#x20;

{% hint style="info" %}
It’s highly recommended to complete [smart contract verification on Tenderly](https://docs.tenderly.co/monitoring/smart-contract-verification) to enable all the functionalities of the platform. Tenderly allows you to verify your smart contracts privately, which limits who has access to your contracts while they’re still in development.
{% endhint %}

## Getting started with Tenderly

Some of Tenderly’s features, including [Tenderly Explorer](https://dashboard.tenderly.co/explorer) and Sandbox, are available without an account. However, to make the most of the Tenderly platform, you should head over to the Dashboard and [create an account](https://dashboard.tenderly.co/register/). You can also use Tenderly tools and features programmatically through [Tenderly CLI](https://github.com/Tenderly/tenderly-cli).&#x20;

Here’s an overview of the flow that can help you get started with Tenderly:

### Prototype and experiment

To quickly experiment and run a smart contract on a Cronos-based Fork,[ head over to Tenderly Sandbox](https://sandbox.tenderly.co/). Follow these steps to prototype your contracts in your Sandbox environment:

**Step 1. Add your Solidity code to the editor on the left.** You can also clone someone else’s work if you’d like to play around with code and try your own solutions.

**Step 2. Configure the Sandbox environment**. Choose the Cronos mainnet or testnet, select the block number, and enter the compiler version and optimizations.

**Step 3. Add JavaScript code to the editor on the left.** JavaScript allows you to interact with your smart contract, with ethers.js and web3.js readily available.

**Step 4. Click the Run button to execute your smart contract.** You’ll quickly get the console output and all the simulated transactions in your contract.

**Step 5. Open transactions on the Tenderly platform directly from Sandbox.** If you come across any issue, jump right into Tenderly Debugger, analyze the problem, and fix it right away.

<figure><img src="https://lh4.googleusercontent.com/Deu5IEq2kTgZBrkrx74kXvQ_b0bVpHznrl__j6DM77iaegaX9Et9SWjQU_rPAcAuSZrSS1hZ6ckxXG_fSm4bSi03pagDQMxAmg3Cw1mI5UzDy_ux_3jTOli5T16PgZbCiWYWU5G_0l48T3P75VSuQWg" alt=""><figcaption></figcaption></figure>

### Add and verify a contract

#### Tenderly allows you to add verified and unverified contracts to the platform. If you upload an unverified contract, you should verify it on Tenderly so you can use all the functionalities of the platform. Tenderly automatically detects verified contracts on Cronos.&#x20;

Once in Tenderly, you can add a contract directly from your **Project Dashboard** by clicking the **Add contract** button. You can also navigate to the **Contracts** tab and click the **Add Contracts** button in the top right corner. Next, follow these steps:&#x20;

**Step 1. Fill in contract details** such as the address, network, and name (optional).

**Step 2. Toggle the Add more button** if you want to add several contracts at the same time.

**Step 3. Click the Add contract button** to upload the contract.

<figure><img src="https://lh6.googleusercontent.com/B1ijthhEmFk85HLvo9Y3GCSM2w6dwqFm9rTY57gB4xQUwenRQNEWtXfru0ZIFJ7y5G1kVtiQ1zmXQbzTSSlL1DkrjxhSn2LQ52S64PmHbvj02OwIuXBjLXSnOeeaSsvEqptiyHuFtRTAFRphERYNvbc" alt=""><figcaption></figcaption></figure>

**Step 4. Find the newly added contract** in the list of contracts.

**Step 5. Click the Verify button** on the right if you added an unverified contract.

**Step 6. Choose the verification method**: JSON upload, ABI upload, or contract source upload.



<figure><img src="https://lh6.googleusercontent.com/j3EDYoNSGasulZkFLpLe2iJormAIbfWHGNFSXS0ocPAtL8If1xv9YPXfQ8Oc6_RZlEbV_rhq07KF3_BILxeSWqQiaPl6PwZQAs68SiTNa4NYp8ZJGrDSU0s2eH065rpfu8hZhDh_flzHEEjHz5905G8" alt=""><figcaption></figcaption></figure>

**Step 7. Select private or public verification** depending on whether you’d like to share your contract with other Tenderly users.

**Step 8. Fill in the required details**, including compiler parameters, optimization used, optimization count, and others.

**Step 9. Finish the verification** of your smart contract.



### Debug and optimize

After adding a Cronos smart contract to Tenderly, you can view all executed transactions in that smart contract. If you come across a failed transaction, you can open it in Tenderly Debugger where you can analyze it in greater detail. Here’s how to do this:

**Step 1. Open the transaction** of interest to inspect its execution.

**Step 2.** Click the **Contracts** tab to see the contracts involved in the transaction.

**Step 3.** Click the **Events** tab to explore the events emitted in transaction execution.

**Step 4.** Click the **State Change**s to view decoded contract states and state variables.

**Step 5.** Click the **Debugger** tab or the **Debug Error** button to inspect exact lines of code.

**Step 6.** Click the **Gas Profiler** button to analyze smart contract gas usage by function calls.



<figure><img src="https://lh5.googleusercontent.com/fCTk5ixZKqd6wVFQJU_o5KFLET3EVfZ1vCVr225q0C3GF_ehAHPQe0sKJE3rr9VMJJ3NEUVNUO1IgrjptdGowk9xn4wLLsJ-NGcnqCaGS0XBHxdyDubLYx6NCfPX0tPwANWqzwpfCqG5sIeRFHaqtKE" alt=""><figcaption></figcaption></figure>

### Simulate and test

After debugging an issue and optimizing your smart contract, you can use Transaction Simulator to test its execution and validate your fix. This allows you to ensure you’ve applied the right solution before deploying it to Cronos.&#x20;

To simulate a transaction, head over to the Simulator page in the navigation bar on your left and follow these steps:&#x20;

**Step 1.** Click the **New Simulation** button.

**Step 2. Choose the Cronos contract** you’d like to use.

**Step 3. Update its source code** if needed by clicking **Edit Contract Source**.

**Step 4. Choose the function** parameter from the dropdown.

**Step 5. Fill in transaction parameters** in the box on your right (tx index, gas price, value, and others).

**Step 6. Click the Simulate Transaction button** and check out the output of the simulated transaction.

<figure><img src="https://lh3.googleusercontent.com/UIeTJZhN0ZkAEaCfNLzaXOE0dZMxLMAPN-KoUW0UIvSpZgpXcIxkPGOivJc6y5WVDl5rTt2gFT-xbPMejz6lLfgh1CjEvib4dAxmYaSnYJAG5TRzHdyMzTfuvjab3nloBLbFWuOLECD8kiB3K1Ctmn8" alt=""><figcaption></figcaption></figure>

You can then use the simulated transaction as a starting point for further testing and a basis for a Tenderly Fork environment. Just click the **Run on Fork** button seen in the screenshot above. This way, you can run a new simulation on top of the previous one and chain multiple scenarios to test them out.

<figure><img src="https://lh6.googleusercontent.com/SPnG9xkRUMN7Xit1x-OxObwBGmeGkVEJwMDbnKYSqjpD351VwlIEXxDIHZwctx-D2Xo8KNAMv9tjGHX6KnhT4_Gr81f5XZA6-fRBzR0zHiNdnE-RqNvGUxIk_pyqXzgwwR6Gy9yDWOmieN3fRYGqHHI" alt=""><figcaption></figcaption></figure>

To start from scratch and run new tests, you can **create a new Tenderly Fork** and use it as your testing environment. To set up a new Fork, follow these steps:

**Step 1. Navigate to the Forks tab** in the menu on your left.

**Step 2.** Click the Fork a network button and choose the **Cronos mainnet** or **testnet**.

**Step 3.** **Name the Fork** (optional) however you’d like.

**Step 4.** **Toggle the Use Latest Block switch** if you’d like to use the data up to a specific Cronos block number.

<figure><img src="https://lh4.googleusercontent.com/D-Fzi1voCgkxGHhOjVemGzCo6LedrZ7E6A07siAjMW5ABaTV9qUT0MGJrBV5sa6XoiNJMa2_X2eoiEOysmov8wwbK5gwXNRwSzQGoOvn2ojGD59lW8gA7-0BTMGE0CqKB-uARdJYLWWw_Q8l1UZsCN8" alt=""><figcaption></figcaption></figure>

**Step 5.** Create a new simulation on your Fork by clicking **Create Fork Simulation** button.



<figure><img src="https://lh4.googleusercontent.com/bfk7E4pENlyJQW8zQn6fU3FiGjOXQ9t_S8W3EHrkEwDABF_Vl3nTNesUPwLknPteDcJBtC4KlnKHcYokqFZ4fmWTV0ji-XVHtRIJpKu0VPFnqa-Co9GXso8mwx7L4d5_SeyjJyQs_c9nJuiSHZpBRbc" alt=""><figcaption></figcaption></figure>

\
**Step 6.** Choose a previously uploaded contract or **upload a custom contract** to your Fork.

<figure><img src="https://lh3.googleusercontent.com/jJ_tBmRMNv71vis71iahyE3srD4jHtOOYWiwWIPTaWb6H66QrQjPXNg2041SLGvLJzbRd7x12s652QRhsuaDSJXDmxd20Xnso8ru3LpVQbs-B5qfHbtAb3olbf12ADRmHZq7frgffHIXyWFfaLOOA-U" alt=""><figcaption></figcaption></figure>

**Step 7. Fill in the remaining fields** and run the simulation on the Cronos Fork.



### Forks and simulation via API

#### Using Simulation API

If you prefer using Tenderly programmatically, you can integrate the Simulation API. This allows you to run a one-off simulation to visualize the execution of a transaction and utilize relevant data in your dapp. Use the following code to implement it:

{% embed url="https://gist.github.com/nvitorovic/a4f9f86f773cb19d99a593e68de368be" %}

#### Creating Forks via API

Simulation API also allows you to [integrate a Fork as a testing environment](https://docs.tenderly.co/simulations-and-forks/simulation-api/testing/local-tests-on-top-of-mainnet-data-in-the-cloud/a-bit-of-testing-infrastructure). To set up a Fork for testing, use the following code:\


{% embed url="https://gist.github.com/nvitorovic/41c2c49f590e3866a0fa023d31ca3984" %}

### Track and respond

After testing, optimizing, and deploying your smart contract, you can monitor its on-chain usage and behavior. Tenderly Alerting allows you to stay up to date with any relevant on-chain or off-chain events related to your contract. Here’s how to do this:

**Step 1.** Go to the **Alerts** tab on your left and click the **Set up Alert button**.

**Step 2. Choose the trigge**r that should activate your alert. For example, you can monitor state variable changes and get alert notifications once they happen.

**Step 3. Pick the target** for your alert such as an address within a specific contract.

**Step 4. Specify alert parameters** including the relevant contract and the value you’d like to monitor.

**Step 5. Set up a destination** for your alerts such as email, Slack, Telegram, webhook endpoints, or others.

\


<figure><img src="https://lh3.googleusercontent.com/x80-gCoPON_cuqBCaLS51-_oUJvgI4vluzDR0llzQWJep--AlX0Z7ocYDXtu7rihBtNwVJ9eDlkIaAMl_jm7rIRTnBBq4vp3KHcQ_TDkyFcNYNu1mk_AXuOjH8fayn44-eZrAJtsXCFt8YJNZwmcW-4" alt=""><figcaption></figcaption></figure>

If you’d like to execute custom code whenever you receive a specific alert or when some other on-chain or off-chain event happens, use Tenderly Web3 Actions to automate your responses.

Here’s how to set up a Web3 Action:&#x20;

**Step 1.** Click the **Web3 Actions** tab in the navigation menu and then **Add Action**.

**Step 2. Choose the event** (trigger type) your Action should be listening for, such as block mining.

**Step 3. Add the custom code** (function) your Action should execute.

**Step 4. Specify the trigger** for your Action (e.g. the Cronos network and every 100th block mined).

**Step 5. Add an Action name and description** for future reference.

**Step 6. Choose a destination** where Tenderly can send you notifications about failed executions.

<figure><img src="https://lh4.googleusercontent.com/_Ow9j47YMHOXgN7MoQ1uoc545XOf8Jajv-SCPmYPNtZ_YICAoRbfnud4fgmmanyprZwBJqKH2MWkWXbc0-s23414T4E3STGTiSLLYhya9YRgXi_9lW6IXFcnDSOHBw_3Vb78hHNdDGB1xGsUsXLzKyc" alt=""><figcaption></figcaption></figure>

## Resources

For more in-depth information and guidance on how to use Tenderly to accelerate your development on Cronos, explore the resources below.&#x20;

* Documentation: [https://docs.tenderly.co/](https://docs.tenderly.co/)&#x20;
* Blog: [https://blog.tenderly.co/](https://blog.tenderly.co/)&#x20;
* Case studies & community resources: [https://tenderly.co/community](https://tenderly.co/community)



