# EIP-4844 Blob Transactions

## EIP-4844 Blob Transactions

Cronos EVM does not implement EIP-4844 blob functionality.

Blob transaction fields are accepted for tooling compatibility but are no-op, transactions execute as standard calls. Blob-related opcodes (e.g., `BLOBHASH`, `BLOBBASEFEE`) return zero.

