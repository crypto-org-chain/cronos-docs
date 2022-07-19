# Cronos Play C++ SDK

## Cronos Play C++ SDK

### Pre-requisites

* python 3.8 or newer
* [rust](https://www.rust-lang.org/) 1.61 or newer
* C++ 14 or newer
* Optional:
  * GNU make
  * GNU make for mac and linux, ninja for windows
  * Visual Studio 2019 or newer for windows

## Pre-built Download

Please download the archive file based on your OS in the [release page](https://github.com/cronos-labs/play-cpp-sdk/releases), where:

* Visual Studio 2019 MSVC, x86\_64, toolset 14.29 or newer: `play_cpp_sdk_Windows_x86_64.zip`;
* macOS 10.15 or newer: `play_cpp_sdk_Darwin_x86_64.tar.gz`;
* Ubuntu 20.04 or newer: `play_cpp_sdk_Linux_x86_64.tar.gz`.

### Setup a demo project

#### Windows

**Visual Studio Project**

Start with a C++ project with `.sln` and `.vcxproj` files:

1.  Clone the current repository

    ```
    git clone https://github.com/crypto-com/play-cpp-sdk.git
    ```
2. Unzip the archive file into `demo` folder, and replace the original `sdk` folder
3. Open `demo.sln` which includes two projects: `demo` (dynamic build) and `demostatic` (static build). If you use Visual Studio 2022, retarget project, and upgrade PlatformToolset to v143.
4. Select `Release` profile.
5. Right click `demo` or `demostatic` project, click `Build` or `Rebuild` to build the project

**CMake Project**

Build modern, cross-platform C++ apps that don't depend on `.sln` or `.vcxproj` files:

1. Open Visual Studio, then open a local folder in welcome window (or click `File` > `Open` > `Folder...` in the menu), locate the `demo` folder and open it
2. Select configuration `x64-Release` in the tool bar
3. Click `Build` > `Build All` or `Rebuild All` to build the project

#### Mac

1.  Clone the current repository

    ```
    git clone https://github.com/crypto-com/play-cpp-sdk.git
    ```
2. Unzip the archive file into `demo` folder, and replace the original `sdk` folder
3.  Under `demo` folder and build the `demo` project

    ```
    make
    ```

#### Linux

1.  Clone the current repository

    ```
    git clone https://github.com/crypto-com/play-cpp-sdk.git
    ```
2. Unzip the archive file into `demo` folder, and replace the original `sdk` folder
3.  Under `demo` folder and build the `demo` project

    ```
    make
    ```

### Setup a c++ 14 (or newer) project

1.  Unzip the archive file into the root folder of your project, you should see a folder named `sdk` and its subdirectories/files.

    ```
     - sdk
       - CMakeLists.txt
       - include: c++ source files and header files
       - lib: static and dynamic libraries
       - CHANGELOG.md
       - LICENSE
    ```
2.  Include the following headers and use the namespaces in your source codes based on your need

    ```
    #include "sdk/include/defi-wallet-core-cpp/src/contract.rs.h" // erc20, erc721, erc1155 supports
    #include "sdk/include/defi-wallet-core-cpp/src/lib.rs.h" // wallet, EIP4361, query, signing, broadcast etc, on crypto.org and cronos
    #include "sdk/include/defi-wallet-core-cpp/src/nft.rs.h" // crypto.org chain nft support
    #include "sdk/include/defi-wallet-core-cpp/src/uint.rs.h" // uint256 type support
    #include "sdk/include/extra-cpp-bindings/src/lib.rs.h" // etherscan/cronoscan, crypto.com pay, wallet connect support
    #include "sdk/include/rust/cxx.h" // the important data types, e.g., rust::String, rust::str, etc

    using namespace rust;
    using namespace org::defi_wallet_core;
    using namespace com::crypto::game_sdk;
    ```
3. Link the `play_cpp_sdk` static or dynamic library, `cxxbridge1` static library, and sources (\*.cc) into your build system (Visual Studio solution, CMake or Makefile). For more details, check out [Cronos Play Docs](https://github.com/crypto-org-chain/cronos-play-docs).

## Build libraries and bindings from scratch

If the Pre-built release does not support your platform, you can build the binaries and bindings on your own.

### Windows

1. Run `windows_build.bat` in x64 Native Tools Command Prompt for VS 2019. It will clone necessary submodules, build `play-cpp-sdk` crate, finally setup and build the demo project.
2. Clean `~/.cargo/git/checkouts` if cxx fails to build, then run `windows_build.bat` again.
3. Run `windows_install.bat`, libraries and bindings will be copied into a new created folder: `install`

#### Notes about Visual Studio 2022

1. Open `demo.sln`. If you use Visual Studio 2022, retarget project, and upgrade PlatformToolset to `v143` before running `windows_build.bat`

### Mac

1. Run `make`
2. Run `make install`, libraries and bindings will be copied into a new created folder: `install`

#### Linux

1. Run `make`
2. Run `make install`, libraries and bindings will be copied into a new created folder: `install`

### Common functions

Full function list can be found [here](https://leslie-h-cheung.gitbook.io/cronos-play-c++-sdk/readme-1)

### Examples

Examples can be found [here](https://github.com/cronos-labs/play-cpp-sdk/tree/main/demo/examples/src)

### Wallet related functions

function `new_wallet` - Generates the HD wallet with a BIP39 backup phrase (English words) and password

```rust
::rust::Box<::org::defi_wallet_core::Wallet > new_wallet(
    ::rust::String password,
    ::org::defi_wallet_core::MnemonicWordCount word_count
)
```

function `restore_wallet` - Recovers/imports HD wallet from a BIP39 backup phrase (English words) and password

```rust
::rust::Box<::org::defi_wallet_core::Wallet > restore_wallet(
    ::rust::String mnemonic,
    ::rust::String password
)
```

function `new_privatekey`- Generates a random private key

```rust
::rust::Box<::org::defi_wallet_core::PrivateKey > new_privatekey()
```

function `new_privatekey_from_bytes` - Constructs private key from hex bytes

```rust
// constructs private key from bytes
::rust::Box<::org::defi_wallet_core::PrivateKey > new_privatekey_from_bytes(
    ::rust::Vec<::std::uint8_t > bytes
)
```

`function new_privatekey_from_hex` - Constructs private key from hex string

```rust
// constructs private key from hex string
::rust::Box<::org::defi_wallet_core::PrivateKey > new_privatekey_from_hex(
    ::rust::String hex
)
```

#### ERC20, ERC721, ERC1155 related functions

### [ERC20](https://leslie-h-cheung.gitbook.io/cronos-play-c++-sdk/readme-1/classes/structorg\_1\_1defi\_\_wallet\_\_core\_1\_1\_erc20)

function `balance_of` - Returns the decimal amount of tokens owned by account\_address.

```rust
::org::defi_wallet_core::U256 balance_of(
    ::rust::String account_address
) const
```

**Example**

```rust
Erc20 erc20 = new_erc20("0xf0307093f23311FE6776a7742dB619EB3df62969",
   "https://cronos-testnet-3.crypto.org:8545", 383)
 .legacy();
U256 = erc20.balance_of("0xf0307093f23311FE6776a7742dB619EB3df62969");
cout << balance.to_string() << endl;
```

function `name` -Returns the name of the token.

```rust
::rust::String name() const
```

**Example**

```rust
Erc20 erc20 = new_erc20("0xf0307093f23311FE6776a7742dB619EB3df62969",
   "https://cronos-testnet-3.crypto.org:8545", 383);
String name = erc20.name();
assert(name == "USDC");
```

function `symbol` - Returns the symbol of the token.

```rust
::rust::String symbol() const
```

**Example**

```rust
Erc20 erc20 = new_erc20("0xf0307093f23311FE6776a7742dB619EB3df62969",
   "https://cronos-testnet-3.crypto.org:8545", 383);
String symbol = erc20.symbol();
assert(symbol == "USDC");
```

function `decimals`- Returns the number of decimals the token uses.

```rust
::std::uint8_t decimals() const
```

**Example**

```rust
Erc20 erc20 = new_erc20("0xf0307093f23311FE6776a7742dB619EB3df62969",
   "https://cronos-testnet-3.crypto.org:8545", 383)
 .legacy();
uint8_t decimals = erc20.decimals();
assert(decimals == 6);
```

### [ERC721](https://leslie-h-cheung.gitbook.io/cronos-play-c++-sdk/readme-1/classes/structorg\_1\_1defi\_\_wallet\_\_core\_1\_1\_erc721)

function `balance_of` - Returns the number of tokens in owner's account\_address.

```rust
::org::defi_wallet_core::U256 balance_of(
    ::rust::String account_address
) const
```

function `owner_of` - Returns the owner of the token\_id token.

```rust
::rust::String owner_of(
    ::rust::String token_id
) const
```

function `name` - Get the descriptive name for a collection of NFTs in this contract.

```rust
::rust::String name() const
```

function `symbol` - Get the abbreviated name for NFTs in this contract.

```rust
::rust::String symbol() const
```

function `token_uri`- Get the distinct Uniform Resource Identifier (URI) for a given asset.

```rust
::rust::String token_uri(
    ::rust::String token_id
) const
```

function `transfer_from` - Transfers token\_id token from from\_address to to\_address.

```rust
::org::defi_wallet_core::CronosTransactionReceiptRaw transfer_from(
    ::rust::String from_address,
    ::rust::String to_address,
    ::rust::String token_id,
    const ::org::defi_wallet_core::PrivateKey & private_key
) const
```

function `safe_transfer_from` - Safely transfers `token_id` token from `from_address` to `to_address`.

```rust
::org::defi_wallet_core::CronosTransactionReceiptRaw safe_transfer_from(
    ::rust::String from_address,
    ::rust::String to_address,
    ::rust::String token_id,
    const ::org::defi_wallet_core::PrivateKey & private_key
) const
```

function `safe_transfer_from_with_data` - Safely transfers token\_id token from from\_address to to\_address with additional\_data.

```rust
::org::defi_wallet_core::CronosTransactionReceiptRaw safe_transfer_from_with_data(
    ::rust::String from_address,
    ::rust::String to_address,
    ::rust::String token_id,
    ::rust::Vec<::std::uint8_t > additional_data,
    const ::org::defi_wallet_core::PrivateKey & private_key
) const
```

### [ERC1155](https://leslie-h-cheung.gitbook.io/cronos-play-c++-sdk/readme-1/classes/structorg\_1\_1defi\_\_wallet\_\_core\_1\_1\_erc1155)

function `balance_of` - Returns the amount of tokens of `token_id` owned by `account_address`.

```rust
::org::defi_wallet_core::U256 balance_of(
    ::rust::String account_address,
    ::rust::String token_id
) const
```

function `balance_of_batch` - Batched version of balance\_of, get the balance of multiple account/token pairs

```rust
::rust::Vec<::rust::String > balance_of_batch(
    ::rust::Vec<::rust::String > account_addresses,
    ::rust::Vec<::rust::String > token_ids
) const
```

function `uri` - Get the distinct Uniform Resource Identifier (URI) for a given asset.

```rust
::rust::String uri(
    ::rust::String token_id
) const
```

function `safe_transfer_from` - Transfers amount tokens of `token_id` from `from_address` to `to_address` with `additional_data`.

```rust
::org::defi_wallet_core::CronosTransactionReceiptRaw safe_transfer_from(
    ::rust::String from_address,
    ::rust::String to_address,
    ::rust::String token_id,
    ::rust::String amount,
    ::rust::Vec<::std::uint8_t > additional_data,
    const ::org::defi_wallet_core::PrivateKey & private_key
) const
```

function `safe_batch_transfer_from` - Batched version of `safeTransferFrom`.

```rust
::org::defi_wallet_core::CronosTransactionReceiptRaw safe_batch_transfer_from(
    ::rust::String from_address,
    ::rust::String to_address,
    ::rust::Vec<::rust::String > token_ids,
    ::rust::Vec<::rust::String > amounts,
    ::rust::Vec<::std::uint8_t > additional_data,
    const ::org::defi_wallet_core::PrivateKey & private_key
) const
```
