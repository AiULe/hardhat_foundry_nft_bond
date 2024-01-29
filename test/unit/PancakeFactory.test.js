const { network, getNamedAccounts,ethers,deployments } = require("hardhat")
const { developmentChains,networkConfig } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

describe("PancakeFactory",async function(){

    let pancakefactory;

    beforeEach(async function(){
        const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
        console.log("Deploying contract...");
        pancakefactory = await PancakeFactory.deploy("0x49A0804c9D0DdA121C6a15bb46d528DBAe64f461");
        console.log(`Deployed contract to:${await pancakefactory.address}`);
        console.log("INIT_CODE_PAIR_HASH==================>",await pancakefactory.INIT_CODE_PAIR_HASH());        
    })

    describe("PancakeFactory", async function(){
        it("testPancakeFactory", async function(){
            const expectFeeto = "0x49A0804c9D0DdA121C6a15bb46d528DBAe64f461";
            assert.equal(expectFeeto,await pancakefactory.feeToSetter());
        })
    })
})