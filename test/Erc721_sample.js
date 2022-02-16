const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("TEST...", function() {

    before(async function() {
        [account1, account2, account3, account4, account5] = await ethers.getSigners();
    });

    let erc721;

    describe("Erc721_sample Test", function() {
        it("Deployment.", async function() {
            const ERC721 = await ethers.getContractFactory("Erc721_sample");
            erc721 = await ERC721.connect(account1).deploy("TEST TOKEN","TEST",ethers.utils.parseEther("10.0"),"https://test.com/");
            assert.equal(await erc721.name(),"TEST TOKEN");
            assert.equal(await erc721.symbol(),"TEST");
        });
        it("Not for Sale", async function(){
            await expect(erc721.connect(account2).buy({value:ethers.utils.parseEther("10.0")}))
                .to.be.revertedWith("now not on sale.");
        });
        it("Buy token.", async function() {
            await erc721.connect(account1).controlTokenSale(true);
            await erc721.connect(account2).buy({value:ethers.utils.parseEther("10.0")});
            assert.equal(await erc721.balanceOf(account2.address),1);
            assert.equal(await erc721.ownerOf(0),account2.address);
            assert.equal(await erc721.tokenURI(0),"https://test.com/0");
        });
    });
});
