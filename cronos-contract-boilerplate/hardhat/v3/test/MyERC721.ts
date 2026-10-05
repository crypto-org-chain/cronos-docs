import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { network } from "hardhat";

const { viem } = await network.create();

const TOKEN_URI = "ipfs://token/0";

function deploy() {
    return viem.deployContract("MyERC721");
}

describe("MyERC721", () => {
    let token: Awaited<ReturnType<typeof deploy>>;

    beforeEach(async () => {
        token = await deploy();
    });

    it("uses the hardcoded collection name and symbol", async () => {
        assert.equal(await token.read.name(), "MyToken");
        assert.equal(await token.read.symbol(), "MTK");
    });

    it("lets an account with MINTER_ROLE mint with a token URI", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.safeMint([
            alice.account.address,
            TOKEN_URI,
        ]);
        await publicClient.waitForTransactionReceipt({ hash });

        assert.equal(
            (await token.read.ownerOf([0n])).toLowerCase(),
            alice.account.address.toLowerCase(),
        );
        assert.equal(await token.read.tokenURI([0n]), TOKEN_URI);
    });

    it("increments token ids across mints", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        for (const uri of [TOKEN_URI, "ipfs://token/1"]) {
            const hash = await token.write.safeMint([
                alice.account.address,
                uri,
            ]);
            await publicClient.waitForTransactionReceipt({ hash });
        }

        assert.equal(await token.read.tokenURI([1n]), "ipfs://token/1");
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        const [, alice] = await viem.getWalletClients();

        await assert.rejects(
            token.write.safeMint([alice.account.address, TOKEN_URI], {
                account: alice.account,
            }),
        );
    });

    it("blocks minting while paused", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.pause();
        await publicClient.waitForTransactionReceipt({ hash });

        await assert.rejects(
            token.write.safeMint([alice.account.address, TOKEN_URI]),
        );
    });
});
