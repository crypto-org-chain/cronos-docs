module.exports = {
  title: "Cronos Testnet",
  description: "Welcome to Cronos Testnet documentation!",
  themeConfig: {
    navbar: true,
    logo: '/chain_doc_nav_logo.svg',
    nav: [{
        text: "Home",
        link: "/"
      },
      {
        text: "Getting Started",
        link: "/getting-started/"
      },

      {
        text: "Cronos Testnet",
        items: [
//          {
//            text: "Mainnet",
//            link: "/getting-started/mainnet"
//          },
          {
            text: "Cronos Testnet",
            link: "/getting-started/croeseid-testnet"
          },
          {
            text: "Local network deployment",
            link: "/getting-started/local-devnet"
          },
          {
            text: "Deploy Smart Contract at Cronos",
            link: "/getting-started/cronos-smart-contract"
          },
//          {
//              text: "Block Explorer",
//              link: "https://crypto.org/explorer"
//          },

//          {
//            text: "Cronos Testnet Faucet",
//              link: "https://crypto.org/faucet"
//            text}
        ]
      },
      {
        text: "Design",
        items: [
          {
            text: "Introduction",
            link: "/chain-details/introduction.md"
          },
          {
            text: "Design Goals",
            link: "/chain-details/architecture.md"
          },
          {
            text: "Modules",
            link: "/chain-details/module_overview.md"
          }
        ]
      },      
      {
        text: "Wallet",
        items: [
          {
            text: "chain-maind",
            link: "/wallets/cli.html#chain-maind"
          },
          {
            text: "Ledger Hardware Wallets with chain-maind",
            link: "/wallets/ledger.html#ledger-hardware-wallets"
          },
          {
            text: "Ledger Hardware Wallets with Desktop Wallet",
            link: "/wallets/ledger_desktop_wallet.html#ledger-hardware-wallets"
          },
          {
            text: "Keplr Wallet: Using Ledger Device with Keplr",
            link: "/wallets/keplr_ledger_guide.html#using-ledger-device-with-keplr"
          },
          {
            text: "Keplr Wallet: Conducting IBC Transfer with ",
            link: "/wallets/keplr_IBC_guide.html#conducting-ibc-transfer-with-keplr-wallet"
          },                    
          {
            text: "Mainnet Address Generation",
            link: "/wallets/mainnet-address-generation.md"
          },
          {
            text: "Mainnet Address Verification",
            link: "/wallets/mainnet-address-verification.md"
          }
        ]
      },
        {
            text: "Resources",
            items: [
              {
                text: "Integrating Crypto.org Chain ",
                link: "/resources/chain-integration"
            },              
                {
                    text: "Technical Glossary",
                    link: "/resources/technical-glossary"
                },
                {
                  text: "gRPC API",
                  link: "/resources/cosmos-grpc-docs"
              }               
            ]
        }
    ],
    sidebar: {
      "/getting-started/": [
        "",
        "local-devnet",
        "security-checklist.md",
        "croeseid-testnet",
        "cronos-smart-contract"
      ],
      "/chain-details/": [
        "introduction",
        "architecture",
        "chain-id",
        "genesis_file",
        "module_overview",
        "parameters",
        "govprocess"
      ],
      "/wallets/": [
        "cli"
      ],
      "/resources/": [
        "chain-integration",
        "node-and-rpc-setup-notes",
        "blocks-and-transactions",
      ],
      "/api/" : "auto"
    },
    displayAllHeaders: true
  },
  base: "/docs/",
  plugins: [
    [
      "vuepress-plugin-export",
      {
        page: {
          format: 'A4',
          printBackground: true,
          margin: {
            top: 60,
            left: 20,
            right: 20,
            bottom: 60
          }
        },
        sorter: function (a, b) {
          var ordering = {
            Home: 0,
            "Getting Started": 1,
            "Croeseid Testnet": 2,
            "Devnet": 3,
            "Send Your First Transaction": 4,
            Consensus: 5,
            Genesis: 7,
            "Transaction Accounting Model": 7,
            Transaction: 8,
            Serialization: 9,
            "Signature Schemes": 10,
            "Transaction Flow": 11,
            "Enclave Architecture": 12,
            "Transaction Privacy": 13,
            "node-joining": 14,
            Staking: 15,
            "reward-and-punishments": 16,
            "network-parameters": 17,
            "Notes on Performance": 18,
            "Notes on Production Deployment": 19,
            "Threat Model": 20,
            "technical_glossary": 21
            
          };
          return ordering[a["title"]] - ordering[b["title"]];
        }
      }
    ]
  ]
};
