import { expect } from "chai";
import { ethers } from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { MyERC20 } from "../typechain-types";

describe("MyERC20", () => {
    const NAME = "My token name";
    const SYMBOL = "My token symbol";
    const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;

    let token: MyERC20;
    let deployer: HardhatEthersSigner;
    let alice: HardhatEthersSigner;

    beforeEach(async () => {
        [deployer, alice] = await ethers.getSigners();
        token = await ethers.deployContract("MyERC20", [NAME, SYMBOL]);
    });

    it("exposes the name and symbol passed to the constructor", async () => {
        expect(await token.name()).to.equal(NAME);
        expect(await token.symbol()).to.equal(SYMBOL);
    });

    it("mints the initial supply to the deployer", async () => {
        expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
        expect(await token.balanceOf(deployer.address)).to.equal(INITIAL_SUPPLY);
    });

    it("lets an account with MINTER_ROLE mint", async () => {
        await token.mint(alice.address, 500);
        expect(await token.balanceOf(alice.address)).to.equal(500);
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        await expect(
            token.connect(alice).mint(alice.address, 500),
        ).to.be.revertedWithCustomError(
            token,
            "AccessControlUnauthorizedAccount",
        );
    });

    it("blocks transfers while paused", async () => {
        await token.pause();
        await expect(
            token.transfer(alice.address, 1),
        ).to.be.revertedWithCustomError(token, "EnforcedPause");
    });

    it("allows transfers again after unpausing", async () => {
        await token.pause();
        await token.unpause();
        await token.transfer(alice.address, 1);
        expect(await token.balanceOf(alice.address)).to.equal(1);
    });
});
