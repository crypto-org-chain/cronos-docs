import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { network } from "hardhat";

const { viem } = await network.create();

const NAME = "My token name";
const SYMBOL = "My token symbol";
const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;

function deploy() {
    return viem.deployContract("MyERC20", [NAME, SYMBOL]);
}

describe("MyERC20", () => {
    let token: Awaited<ReturnType<typeof deploy>>;

    beforeEach(async () => {
        token = await deploy();
    });

    it("exposes the name and symbol passed to the constructor", async () => {
        assert.equal(await token.read.name(), NAME);
        assert.equal(await token.read.symbol(), SYMBOL);
    });

    it("mints the initial supply to the deployer", async () => {
        const [deployer] = await viem.getWalletClients();
        assert.equal(await token.read.totalSupply(), INITIAL_SUPPLY);
        assert.equal(
            await token.read.balanceOf([deployer.account.address]),
            INITIAL_SUPPLY,
        );
    });

    it("lets an account with MINTER_ROLE mint", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.mint([alice.account.address, 500n]);
        await publicClient.waitForTransactionReceipt({ hash });

        assert.equal(await token.read.balanceOf([alice.account.address]), 500n);
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        const [, alice] = await viem.getWalletClients();

        await assert.rejects(
            token.write.mint([alice.account.address, 500n], {
                account: alice.account,
            }),
        );
    });

    it("blocks transfers while paused", async () => {
        const [, alice] = await viem.getWalletClients();
        const publicClient = await viem.getPublicClient();

        const hash = await token.write.pause();
        await publicClient.waitForTransactionReceipt({ hash });

        await assert.rejects(token.write.transfer([alice.account.address, 1n]));
    });
});
