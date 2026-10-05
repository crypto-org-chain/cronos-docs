import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { network } from "hardhat";

const { viem } = await network.create();

const TOKEN_URI = "https://example.com/api/token/{id}.json";

function deploy() {
    return viem.deployContract("MyERC1155", [TOKEN_URI]);
}

describe("MyERC1155", () => {
    let token: Awaited<ReturnType<typeof deploy>>;

    beforeEach(async () => {
        token = await deploy();
    });

    it("exposes the uri passed to the constructor", async () => {
        assert.equal(await token.read.uri([0n]), TOKEN_URI);
    });

    it("lets an account with MINTER_ROLE mint a single id", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.mint([
            alice.account.address,
            1n,
            10n,
            "0x",
        ]);
        await publicClient.waitForTransactionReceipt({ hash });

        assert.equal(
            await token.read.balanceOf([alice.account.address, 1n]),
            10n,
        );
    });

    it("lets an account with MINTER_ROLE mint a batch", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.mintBatch([
            alice.account.address,
            [1n, 2n],
            [5n, 7n],
            "0x",
        ]);
        await publicClient.waitForTransactionReceipt({ hash });

        assert.equal(await token.read.balanceOf([alice.account.address, 1n]), 5n);
        assert.equal(await token.read.balanceOf([alice.account.address, 2n]), 7n);
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        const [, alice] = await viem.getWalletClients();

        await assert.rejects(
            token.write.mint([alice.account.address, 1n, 10n, "0x"], {
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
            token.write.mint([alice.account.address, 1n, 10n, "0x"]),
        );
    });
});
