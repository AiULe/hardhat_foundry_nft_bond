const { ethers,network } = require("hardhat");
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { sleep } = require("../utils/sleep.js");

async function addLiquidity() {
    const [deployer] = await ethers.getSigners();
    const chainId = network.config.chainId;
    let contractList = {};
    if (chainId == 31337) {
        contractList = networkConfig[chainId]["contractList"];
    } else {
        contractList = networkConfig[chainId]["contractList"];
    }
    console.log("bug1=========>");
    const PancakeRouter = await ethers.getContractFactory('PancakeRouter');
    const pancakeRouter = PancakeRouter.attach(contractList.pancakeRouter);
    const PancakeFactory = await ethers.getContractFactory('PancakeFactory');
    let pancakeFactory = PancakeFactory.attach(contractList.pancakeFactory);
    const FishFactory = await ethers.getContractFactory('FishERC20');
    const fish = FishFactory.attach(contractList.fish);
    const UsdcFactory = await ethers.getContractFactory('FishERC20');
    const usdc = UsdcFactory.attach(contractList.usdc);
    console.log("fish====>",fish.address);
    console.log("usdc======>",usdc.address);
    console.log("bug2=========>");
    // await sleep(10000);
    pancakeFactory = await PancakeFactory.deploy("0x49A0804c9D0DdA121C6a15bb46d528DBAe64f461");
    await pancakeFactory.createPair(fish.address, usdc.address);
    var usdc_fish_lp_address = await pancakeFactory.getPair(fish.address, usdc.address);
    console.log("usdc_fish_lp_address:", usdc_fish_lp_address);
    contractList.usdc_fish_lp = usdc_fish_lp_address;
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
    // await sleep(10000);
}

addLiquidity()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })