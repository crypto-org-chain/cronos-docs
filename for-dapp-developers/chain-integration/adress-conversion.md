# Adress Conversion

As explained in [chain-id.md](../../cronos-chain-protocol/chain-id.md "mention"), Cronos uses the Bech32 address format. \
In order to convert between a Bech32 format address and an Ethereum format address, we provide the following sample code below:



### Python implementation

In order to convert from Bech32 `crc...` address to a Ethereum `0x...` address:

````python
```python
import bech32

bech32_address = input("Please enter a crc address: ")
#bech32_address = "crc1gwqac243g2z3vryqsev6acq965f9ttwhw9r7vk"

_, bz = bech32.bech32_decode(bech32_address)
hexbytes=bytes(bech32.convertbits(bz, 5, 8))
eth_address = '0x' + hexbytes.hex()
print(eth_address)
#0x4381dc2ab14285160c808659aee005d51255add7
```
````

Vice versa, in order to convert from an Ethereum `0x...` to a Bech32 `crc...` address:

````python
```python
import bech32

eth_address = input("Please enter a ETH address (0x...): ")
#eth_address = "0x4381dc2ab14285160c808659aee005d51255add7"
eth_address_bytes = bytes.fromhex(eth_address[2:])

bz = bech32.convertbits(eth_address_bytes, 8, 5)
bech32_address = bech32.bech32_encode("crc",bz)
print(bech32_address)
#crc1gwqac243g2z3vryqsev6acq965f9ttwhw9r7vk
```
````



