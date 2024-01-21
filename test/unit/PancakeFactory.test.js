const { network, getNamedAccounts,ethers,deployments } = require("hardhat")
const { developmentChains,networkConfig } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

describe("PancakeFactory",async function(){

    let pancakefactory;

    beforeEach(async function(){
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["pancakefactory"]); //表明我们要部署所有内容
        pancakefactory = await ethers.getContract("PancakeFactory",deployer);
    })

    describe("PancakeFactory", async function(){
        it("testPancakeFactory", async function(){
            const expectFeeto = "0x49A0804c9D0DdA121C6a15bb46d528DBAe64f461";
            assert.equal(expectFeeto,await pancakefactory.feeToSetter());
        })
    })
})