const { network, getNamedAccounts,ethers,deployments } = require("hardhat")
const { developmentChains,networkConfig } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

describe("PancakeRouter",async function(){

    let pancakeRouterFactory;
    const FACTORYADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const WETHADDR = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    beforeEach(async function(){
        const PancakeRouterFactory = await ethers.getContractFactory("PancakeRouter");
        console.log("Deploying contract...");
        pancakeRouterFactory = await PancakeRouterFactory.deploy(FACTORYADDR,WETHADDR);
        console.log("WETH==================>",await pancakeRouterFactory.WETH());
    })

    describe("PancakeRouter", async function(){
        it("testPancakeRouter", async function(){
            // const expectFeeto = "0x49A0804c9D0DdA121C6a15bb46d528DBAe64f461";
            // assert.equal(expectFeeto,await pancakefactory.feeToSetter());
        })
    })
})