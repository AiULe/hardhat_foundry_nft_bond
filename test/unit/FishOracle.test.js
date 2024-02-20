const { network, getNamedAccounts,ethers,deployments } = require("hardhat")
const { developmentChains,networkConfig } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

describe("FishOracle",async function(){

    let fishOracle;

    beforeEach(async function(){
        const [deployer] = await ethers.getSigners();
        const chainId = network.config.chainId;
        let contractList = {};
        if (chainId == 31337) {
            contractList = networkConfig[chainId]["contractList"];
        } else {
            contractList = networkConfig[chainId]["contractList"];
        }
        const PancakeRouter = await ethers.getContractFactory('PancakeRouter');
        let pancakeRouter = PancakeRouter.attach(contractList.pancakeRouter);
        const PancakeFactory = await ethers.getContractFactory('PancakeFactory');
        let pancakeFactory = PancakeFactory.attach(contractList.pancakeFactory);
        const FishFactory = await ethers.getContractFactory('FishERC20');
        let fish = FishFactory.attach(contractList.fish);
        fish = await upgrades.deployProxy(FishFactory, ['Fish Token', 'FISH', deployer.address, '100000000000000000'], { initializer: 'initialize' });
        await fish.deployed();
        const UsdcFactory = await ethers.getContractFactory('FishERC20');
        let usdc = UsdcFactory.attach(contractList.usdc);
        usdc = await upgrades.deployProxy(UsdcFactory, ['USDC-test', 'USDC-test', deployer.address, '100000000000000000000000000'], { initializer: 'initialize' });
        await usdc.deployed();

        console.log("fish====>",fish.address);
        console.log("usdc======>",usdc.address);
        // await sleep(10000);
        pancakeFactory = await PancakeFactory.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        await pancakeFactory.createPair(fish.address, usdc.address);
        var usdc_fish_lp_address = await pancakeFactory.getPair(fish.address, usdc.address);
        console.log("usdc_fish_lp_address:", usdc_fish_lp_address);
        contractList.usdc_fish_lp = usdc_fish_lp_address;

        const WETH9 = await ethers.getContractFactory("WETH9");
        console.log("Deploying contract...");
        let weth9 = await WETH9.deploy();

        pancakeRouter = await PancakeRouter.deploy(pancakeFactory.address,weth9.address);
        console.log(`Deployed contract to:${await pancakeRouter.address}`);

        await usdc.approve(pancakeRouter.address, '1000000000000000000000000000000'); console.log("usdc.approve:");
        // await sleep(10000);
        await fish.approve(pancakeRouter.address, '1000000000000000000000000000000'); console.log("fish.approve:");
        // await sleep(10000);
        await pancakeRouter.addLiquidity(
            fish.address,
            usdc.address,
            '100000000000000000',//0.1 fish
            '1500000000000000000',//1.5u
            0,
            0,
            deployer.address,
            Math.round(new Date() / 1000) + 1000
        );
        console.log("addLiquidity");
        const FISHORACLE = await ethers.getContractFactory('FishOracle');
        console.log("usdc_fish_lp_address=====>",contractList.usdc_fish_lp);
        fishOracle = await upgrades.deployProxy(FISHORACLE, [usdc_fish_lp_address, fish.address], { initializer: 'initialize' });
        await fishOracle.deployed();
        console.log("fishOracle==================>",fishOracle.address);      
    })

    describe("FishOracle", async function(){
        it("testFishOracle", async function(){
            console.log("IUniswapV2Pair========>",await fishOracle.peekSpot('0x'));
        })
    })
})