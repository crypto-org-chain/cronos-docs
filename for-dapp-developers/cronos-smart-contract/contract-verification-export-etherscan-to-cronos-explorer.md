---
hidden: true
---

# Contract Verification Export: Etherscan To Cronos Explorer

## Cronos EVM: how to verify smart contracts on multiple blockchain explorers

As a developer, you may have submitted your smart contract code to a blockchain explorer (e.g. [Etherscan](https://etherscan.io/)) as part of your smart contract deployment script. You can also submit it to other platforms for verification (e.g. [Cronos Explorer](https://explorer.cronos.com/)).

This guide explains how to export data from one explorer and upload it into another. However, this only works for one smart contract at a time.

## Step 1: Obtain smart contract data from a blockchain explorer (e.g. Etherscan)

Etherscan provides an [endpoint](https://docs.etherscan.io/api-endpoints/contracts#get-contract-source-code-for-verified-contract-source-codes) for registered users to retrieve contract source code and compilation settings:

{% code overflow="wrap" %}
```url
https://api.etherscan.io/v2/api
?chainid=25
&module=contract
&action=getsourcecode
&address={YourContractAddress}
&apikey={YourApiKeyToken}
```
{% endcode %}

The parameters are as follows:

* YourContractAddress: address of your smart contract on Cronos EVM chain.
* YourApiKeyToken: API key on the [Ethercan API Dashboard](https://etherscan.io/apidashboard).

The output may look like this:

<figure><img src="../../.gitbook/assets/image3.png" alt=""><figcaption></figcaption></figure>

The endpoint's response includes the following fields:

* ContractName: Name of contract
* CompilerVersion: Version name of compiler for contact
* ConstructorArguments: Argument inputs used when creating the contract
* OptimizationUsed: the value is "1" if optimization was used when compiling this contract
* Runs: Number of times the optimization was run
* SourceCode: The source code field's value must be reformatted first. See the instructions below.

## Step 2: Reformat the SourceCode fields' value

The source code field's value may be provided in one of the three following formats:

### Scenario 1: Standard JSON input (starts with "\{{" and ends with "\}}").

In this case, you need to create a .JSON file by following these steps:

* Remove the outer brackets "{" and "}"
* "Unescape" the JSON string. This means replacing the backslashed characters with non-backslashed characters. You can use various tools for this, such as [freeformatter](https://www.freeformatter.com/json-escape.html#before-output) (click: Unescape JSON).
* Paste the resulting string into a new JSON file that you can name, for example, source\_code.json. The JSON file should now be in [this format](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description).

### Scenario 2: Source code only, with a single source file (starts with actual source code).

In this case, you need to create a .SOL file. Copy the code and paste it into a new solidity file that you can name, for example, source\_code.sol.

### Scenario 3: Source code only, with multiple source files (starts with a single “{“ and ends with a single "}").

In this case, you need to create a .JSON file by following these steps:

* "Unescape" the JSON string (Once only). This means replacing the backslashed characters with non-backslashed characters. You can use various tools for this, such as [freeformatter](https://www.freeformatter.com/json-escape.html#before-output) (click: Unescape JSON).
* Create a new JSON file that you can name, for example, source\_code.json, using the template below:

```json
{
    "language": "Solidity",
    "sources":**Paste here**   ,
    "settings": {
        "optimizer": {
            "enabled": true,
            "runs": 200
        }
    }
}

```

* In the JSON file that you just created, update the "enabled" and "runs" values to match the OptimizationUsed (where 1 should be converted to true) and Runs values from the Etherscan API response.
* Paste the unescaped JSON string into the JSON file, where "\*\*Paste here\*\*" is a placeholder for where you should insert the unescaped JSON string obtained in the previous step.

```json
{
    "language": "Solidity",
    "sources": {
        "XXX.sol": {
            "content": "Source code of XXX..."
        },
        "YYY.sol": {
            "content": "Source code of YYY..."
        }
    },
    "settings": {
        "optimizer": {
            "enabled": true,
            "runs": 200
        }
    }
}

```

## Step 3: Submit contract verification into the other blockchain explorer (e.g. Cronos Explorer)

Please visit the [Cronos Explorer User Interface](https://explorer.cronos.com/verifyContract), which looks like this:

<figure><img src="../../.gitbook/assets/image2.png" alt=""><figcaption></figcaption></figure>

You can use the elements from [**Step 1**](contract-verification-export-etherscan-to-cronos-explorer.md#step-1-obtain-smart-contract-data-from-a-blockchain-explorer-e.g.-etherscan) to complete the corresponding inputs:

* Contract Name: Refer to the ContractName field from the Etherscan response.
* Contract Address: Address of the contract.
* Compiler Type: there are two possible scenarios, depending on the format of the source code file generated in [**Step 2**](contract-verification-export-etherscan-to-cronos-explorer.md#step-2-reformat-the-sourcecode-fields-value).
  * Scenario 1: The source code is a Solidity file (such as _**source\_code.sol**_), generated from a SourceCode value in Source code-only format with a single source file. In that case:
    * Compiler Type: select Solidity Files.
    * Contract Files: Upload the solidity file (.sol) generated in Step 2.
    * Optimizer Enabled: Toggle yes if the OptimizationUsed field from the Etherscan response is 1.
    * Optimizer Runs: If Optimizer Enabled is toggled, use the value from the Runs field in the Etherscan response.
  * Scenario 2: The source code is a JSON file (such as _**source\_code.json**_) generated from a SourceCode value either in Standard JSON input format or in Source code-only format with multiple source files. In that case:
    * Compiler Type: select Solidity Standard-Json-Input.
    * Check and, if necessary, edit the value of the JSON file as follows:
      * Double check the value of the `settings.optimizer.enabled` field. It must be set to true if the OptimizationUsed field from the Etherscan response is 1. If there is a mismatch, fix it manually in the source\_code.json file.
      * Double check the value of the `settings.optimizer.runs`field. It must be set to match the value of the Runs field from the Etherscan response. If there is a mismatch, fix it manually in the _**source\_code.json**_ file.
* Contract Files: Upload the JSON file (.json) generated in Step 2.
* Compiler Version: Use the value of the CompilerVersion field from the Etherscan response.
* Constructor Arguments: Use the ConstructorArguments field from the Etherscan response.

An example of the completed form is shown below:

<figure><img src="../../.gitbook/assets/image1.png" alt=""><figcaption></figcaption></figure>

After submitting the form, you are done!

## Troubleshooting

If you need Technical Support please log a Support Ticket on the [Cronos Discord Server](https://discord.com/channels/783264383978569728/1133334988142690365) and provide the following details:

* The smart contract address.
* Attach the JSON or SOL file generated in Step 2.
* Attach a screenshot of the verification form you completed.

Most errors are caused when generating the JSON or SOL source code file.

\
