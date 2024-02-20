const { network, ethers,upgrades  } = require("hardhat");

const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify.js");
const { sleep } = require("../utils/sleep.js");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId;
    let contractList = {};
    if (chainId == 31337) {
        contractList = networkConfig[chainId]["contractList"];
    } else {
        contractList = networkConfig[chainId]["contractList"];
    }
    const FishFactory = await ethers.getContractFactory('FishERC20');
    const fish = FishFactory.attach(contractList.fish);
    const FishNftFactory = await ethers.getContractFactory('FishNft');
    const fishNft = FishNftFactory.attach(contractList.fish);
    const UsdcFactory = await ethers.getContractFactory('FishERC20');
    const usdc = UsdcFactory.attach(contractList.usdc);
    
    log("----------------------------------------------------");
    const UsdcBuyNftLogic = await ethers.getContractFactory('usdcBuyNftLogic');
    let usdcBuyNftLogic = await upgrades.deployProxy(UsdcBuyNftLogic, [
    contractList.fish,
    contractList.fishNft,
    contractList.pancakeFactory,
    contractList.pancakeRouter,
    contractList.multiSignature,
    contractList.multiSignatureToSToken,
    contractList.dev,
    contractList.op,
    contractList.sFISH,
    contractList.fishOracle,
    contractList.usdc], { initializer: 'initialize' });
    await usdcBuyNftLogic.deployed();

    contractList.usdcBuyNftLogic = usdcBuyNftLogic.address;
    console.log("usdcBuyNftLogic:", contractList.usdcBuyNftLogic);
    // await sleep(10000);

    console.log("bug1===========>");
    //设置执行者
    await fish.setExecutor(contractList.fishNft, true); console.log("fish.setExecutor");
    // await sleep(10000);
    await fish.setExecutor(contractList.usdcBuyNftLogic, true); console.log("fish.setExecutor");
    // await sleep(10000);
    await fishNft.setExecutor(contractList.usdcBuyNftLogic, true); console.log("fishNft.setExecutor");
    // await sleep(10000);


    //approve usdcBuyNftLogic 测试买入用
    await usdc.approve(contractList.usdcBuyNftLogic, '1000000000000000000000000000000'); console.log("usdc.approve:usdcBuyNftLogic");
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(UsdcBuyNftLogic.address, arguments);
    }

    log("Enter usdcbuynftlogic with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run deploy-09-deploy-usdcbuynftlogic.js --network ${networkName}`);
    log("----------------------------------------------------");
}

module.exports.tags = ["all", "usdcbuynftlogic"]