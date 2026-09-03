import { expect } from "chai";
import { ethers } from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { MyERC1155 } from "../typechain-types";

describe("MyERC1155", () => {
    const TOKEN_URI = "https://example.com/api/token/{id}.json";

    let token: MyERC1155;
    let alice: HardhatEthersSigner;

    beforeEach(async () => {
        [, alice] = await ethers.getSigners();
        token = await ethers.deployContract("MyERC1155", [TOKEN_URI]);
    });

    it("exposes the uri passed to the constructor", async () => {
        expect(await token.uri(0)).to.equal(TOKEN_URI);
    });

    it("lets an account with MINTER_ROLE mint a single id", async () => {
        await token.mint(alice.address, 1, 10, "0x");
        expect(await token.balanceOf(alice.address, 1)).to.equal(10);
    });

    it("lets an account with MINTER_ROLE mint a batch", async () => {
        await token.mintBatch(alice.address, [1, 2], [5, 7], "0x");
        expect(await token.balanceOf(alice.address, 1)).to.equal(5);
        expect(await token.balanceOf(alice.address, 2)).to.equal(7);
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        await expect(
            token.connect(alice).mint(alice.address, 1, 10, "0x"),
        ).to.be.revertedWithCustomError(
            token,
            "AccessControlUnauthorizedAccount",
        );
    });

    it("blocks minting while paused", async () => {
        await token.pause();
        await expect(
            token.mint(alice.address, 1, 10, "0x"),
        ).to.be.revertedWithCustomError(token, "EnforcedPause");
    });
});
