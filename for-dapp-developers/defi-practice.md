# Best Practices for DeFi Project in Cronos
## Introduction

Decentralized Finance (DeFi) is revolutionizing the finance industry and bringing boundless opportunities to the finance world. However, at the same time it has witnessed millions of funds being hacked. We believe it is critical for us to play a part to minimize such incidents as we place security as a top priority. With that, we have compiled a list of best practices to develop secure smart contracts for the Cronos ecosystem. This is by no means an exhaustive list but we believe it is a good foundation and minimum security baseline for any smart contract project.

## Secure Coding Practices:

- Static analysis tools are an important toolkit for smart contract auditors. These tools are automated, and hence saves time and improves quality as it helps to discover potential common vulnerabilities in your code. Below are some examples of some tools widely used:
  - [Slither](https://github.com/crytic/slither) runs a suite of vulnerability detectors, prints visual information about contract details, and provides an API to easily write custom analyses. Slither enables developers to find vulnerabilities, enhance their code comprehension, and quickly prototype custom analyses. 
  - [Mythril](https://github.com/ConsenSys/mythril) is a security analysis tool for EVM bytecode. It detects security vulnerabilities in smart contracts built for Ethereum. It uses symbolic execution, SMT solving and taint analysis to detect a variety of security vulnerabilities. 
  - [Echidna](https://github.com/crytic/echidna) is a smart contract fuzzing tool. Fuzzing is an automated testing technique that randomly feeds invalid and unexpected inputs and data into smart contracts in order to find coding errors and security vulnerabilities. Echidna uses grammar based fuzzing based on an EVM ABI to falsify user-defined predicates or Solidity assertions. 
- Testing is important, but more importantly, tests should be automated and have consistent run results. Tests find bugs and vulnerabilities easier, quicker and ensure it meets the functional requirements the smart contracts promised to deliver i.e. verification.
  - Ensure there is sufficient coverage of smart contracts, specifically on those with complex business logics.
  - Ensure deployment on mainnet is after the test suite passes.
  - Ensure testing is part of continuous integration (CI). Ideally, anyone can see the test result/execution from a repository like github.
  - Ensure anyone can checkout the repository and run the test without any additional setup.
  - Need to know [more about testing](https://guidelines.secureth.org/development/testing)
- Deployment
  - Smart contract code must be viewable from Cronos explorer.
  - Ideally, each release of smart contracts should be trackable from repositories like github, e.g. using tagging features of github.
- Study and review against smart contracts development best practices
  - [Consensys smart contracts best practices](https://consensys.github.io/smart-contract-best-practices/recommendations)
  - [List of known attack vectors](https://blog.sigmaprime.io/solidity-security.html)

## Security Audit

- Important to have at least one independent external security team to review smart contracts. The intent of this is for experts to review the code, test the overall quality and find subtle smart contract weaknesses that could be exploited by attackers.
- This is not a one-off exercise, it must be a continuous effort as the smart contracts are being re-factored for cases where it is upgradable.
- Ideally an external security audit is conducted before deployment of smart contracts to the mainnet.
- Ideally, a report from an external security audit team should be made available publicly as this can provide investors and users of the DeFi project to understand the quality and safety of the smart contracts.

## DeFi Administrator Operation

- Proper key management 
    - Using hardware wallets for privileged users or administrators of smart contracts. Recently, a DeFi project bZx has been [hacked](https://bzx.network/blog/prelminary-post-mortem) due to the administrator's private key being leaked. The private key was leaked because the administrator was a target of a phishing attack resulting in the user’s wallet mnemonic being compromised. To learn how to properly use a hardware wallet refer to [this](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/).  
    - Use timelock for smart contracts changes. There are standards such as one provided by OpenZeppelin for a transaction delay/cancel/other control authority.
  Related use issue check can refer to this [link](https://forum.openzeppelin.com/t/timelockcontroller-vulnerability-post-mortem/14958).
    - Use multisignature to avoid a single point (owner) of failure (lose/compromise private key).
    - Ownership management - it is unavoidable in some cases, actions in smart contracts need to be controlled by administrators. In such cases, it is advised to use proven open source libraries such as [OpenZeppelin - Access](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/access). 
- Clearly document the control or access available to issuers or owners of smart contracts in plain English. A good example please refer to this [link](https://guidelines.secureth.org/access-controls/access-controls-section/example-access-controls-doc)
- Refrain from having owners/issuers to have permission to transfer user’s funds.

## Bug Bounty
- Bug bounty program is a complement to security audit in which it allows ethical hackers to identify and disclose potential vulnerabilities in deployed smart contracts. Typically bug bounty attracts diverse and experienced talents.
- If an ethical hacker discovers a vulnerability, it is reported with severity and details in the bug bounty platform. This information is received by DeFi project selected developers who can check for the validity of the report. If it is a valid vulnerability, the DeFi project developers will patch it and test that the patch works. The DeFi project then pays out a bounty to the ethical hacker. The amount of the bounty typically depends on the severity and the impact of it.
- Bug bounty for smart contracts could easily be set up by the DeFi project on platforms such as [Immunefi](https://immunefi.com/).

## Security Policy
- For DeFi projects without bug bounty programs, it is recommended to have a publicly accessible security policy.
- The security policy may describe the scope of the project and how the project processes vulnerability reports submitted by ethical hackers. It should also outline the assets in/out scope and the do/don’t for ethical hackers.
- The security policy is important as it allows ethical hackers to disclose vulnerabilities securely with the right team. From the ethical hackers perspective, the security policy is a clear message from the project that they will not be prosecuted if vulnerabilities are reported and has been tested in accordance with rules governed in security policy.
- You could also use https://securitytxt.org/ to generate a basic security policy.
- An [example](https://github.com/yearn/yearn-security/blob/master/SECURITY.md) of a good DeFi project security policy: 

## Latest hacks
- Keep abreast with all hacks in smart contracts across EVM compatible blockchains. Some sources of news of hacks as follow:
    - [Rekt News](https://rekt.news/)
    - [Slowmist hack reports](https://hacked.slowmist.io) 
- Encouraged developers to learn from each hack and compile lessons learned from each of it, and to assess if there are any risks to your own respective projects
