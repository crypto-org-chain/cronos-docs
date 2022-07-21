module.exports = {
  title: "Cronos | Crypto.org EVM Chain",
  description: "View our latest chain documentation on Cronos. Sign up to our newsletter to get the latest updates and read the documentation to connect to our Testnet.",
  themeConfig: {
    navbar: true,
    logo: '/chain_doc_nav_logo.svg',
    nav: [{
      text: "Home",
      link: "/"
    },
    {
      text: "Getting Started",
      link: "https://docs.cronos.org/getting-started/readme"
    },

      {
        text: "Cronos Chain",
        items: [
          {
            text: "Cronos Mainnet Beta",
            link: "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet"
          },
          {
            text: "Using Metamask",
            link: "https://docs.cronos.org/for-users/metamask"
          },
          {
            text: "Cronos Testnet",
            link: "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-testnet"
          },
          {
          text: "Cronos Gravity bridge Testnet",
          link: "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-gbtestnet"
          },
          {
            text: "Local network deployment",
            link: "https://docs.cronos.org/for-node-hosts/running-nodes/local-devnet"
          },
          {
            text: "Cronos node setup best practises",
            link: "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-node-best-practises"
          },          
          {
            text: "Deploy Smart Contract at Cronos",
            link: "https://docs.cronos.org/for-dapp-developers/cronos-smart-contract"
          },
          {
            text: "Best Practices for DeFi Project in Cronos",
            link: "https://docs.cronos.org/for-dapp-developers/cronos-smart-contract/defi-practice"
          },
          {
            text: "Block Explorer",
            link: "https://cronos-explorer.crypto.org"
          }

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
            link: "https://docs.cronos.org/getting-started/introduction"
          },
          {
            text: "Design Goals",
            link: "https://docs.cronos.org/getting-started/architecture"
          },
          {
            text: "Modules",
            link: "https://docs.cronos.org/about-cronos/module_overview"
          }
        ]
      },
      {
        text: "Bridge",
        items: [
          {
            text: "Via Crypto.com App and Exchange",
            link: "https://docs.cronos.org/for-users/bridge/app_n_ex"
          },
          {
            text: "From other chains (Cronos Bridge WebApp)",
            link: "https://docs.cronos.org/for-users/bridge/other_chain/webapp"
          }, 
          {
            text: "From other chains (Crypto.com DeFi Wallet)",
            link: "https://docs.cronos.org/for-users/bridge/other_chain/defiwallet"
          },      
          {
            text: "From other chains (Crypto.com DeFi Desktop Wallet)",
            link: "https://docs.cronos.org/for-users/bridge/other_chain/desktop"
          },
          {
            text: "Gravity Bridge (Cronos Bridge WebApp - Testnet only)",
            link: "https://docs.cronos.org/for-users/bridge/gb-testnet"
          }                     
        ]
      },   
      {
        text: "Cronos Play",
        items: [
          {
            text: "Introduction",
            link: "https://docs.cronos.org/cronos-play/cronos-play",           
          },
          {
            text: "Unity",
            link: "https://docs.cronos.org/cronos-play/unity",           
          },
          {
            text: "Unreal Engine",
            link: "https://docs.cronos.org/cronos-play/getting-started_unreal",           
          },          
          {
            text: "C++ SDK",
            link: "https://docs.cronos.org/cronos-play/getting-started_cpp",           
          }
        ]
      },

      {
        text: "Resources",
        items: [
          {
            text: "Integrating with Cronos Chain",
            link: "https://docs.cronos.org/for-dapp-developers/chain-integration"
          },
          {
            text: "Web extension integration",
            link: "https://docs.cronos.org/for-dapp-developers/chain-integration/web-extension-integration"
          },
          {
            text: "Technical Glossary",
            link: "https://docs.cronos.org/about-cronos/chain-details/technical-glossary"
          },
          {
            text: "Useful Projects on Cronos",
            link: "https://docs.cronos.org/for-dapp-developers/useful-projects-on-cronos"
          },
        ]
      }
    ],
    sidebar: {
      "/getting-started/": [
        "cronos-mainnet",
        "metamask",
        "cronos-testnet",
        "cronos-gbtestnet",        
        "local-devnet",
        "cronos-node-best-practises",
        "security-checklist.md",
        "defi-practice",
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
      "/bridge/": [
        "app_n_ex",
        "other_chain",
        "gb-testnet"
      ],
      "/play/": [
        "introduction",
        "getting-started",
        "getting-started_unreal",
        "getting-started_cpp"
      ],
      "/resources/": [
        "chain-integration",
        "web-extension-integration",
        "desktop-wallet-integration",
        "cosmos-grpc-docs",
        "technical-glossary",
        "useful-projects",
      ],
      "/api/": "auto"
    },
    displayAllHeaders: true
  },
  base: "/docs/",
  head: [
    [
      'script',
      {},
      [
        `
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-PSV99SS");
      `,
      ],
    ],
  ],
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
            "cronos Testnet": 2,
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
