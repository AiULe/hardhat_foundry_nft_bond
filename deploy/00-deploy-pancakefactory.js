const { network, ethers,upgrades  } = require("hardhat");

const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId;
    let contractList = {};
    const FEETOSETTER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    if (chainId == 31337) {
        contractList = networkConfig[chainId]["contractList"];
    } else {
        contractList = networkConfig[chainId]["contractList"];
    }
    let pancakeFactory = contractList.pancakeFactory;
    const args = [FEETOSETTER];
    
    log("----------------------------------------------------");
    const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
    console.log("Deploying contract...");
    pancakeFactory = await PancakeFactory.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log(`Deployed contract to:${await pancakeFactory.address}`);
    console.log("INIT_CODE_PAIR_HASH==================>",await pancakeFactory.INIT_CODE_PAIR_HASH());
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pancakeFactory.address, arguments);
    }

    log("Enter pancakeFactory with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run deploy-00-deploy-pancakeFactory.js --network ${networkName}`);
    log("----------------------------------------------------");
}

module.exports.tags = ["all", "pancakefactory"]