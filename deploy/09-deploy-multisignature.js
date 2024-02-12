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
    if (chainId == 31337) {
        contractList = networkConfig[chainId]["contractList"];
    } else {
        contractList = networkConfig[chainId]["contractList"];
    }
    let multiSignature = contractList.multiSignature;
    const owners = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    const threshold = 1;
    
    log("----------------------------------------------------");
    const MultiSignature = await ethers.getContractFactory("MultiSignature");
    if(contractList.multiSignature){
        multiSignature = MultiSignature.attach(contractList.multiSignature);
        console.log(`Deployed contract to:${await multiSignature.address}`);
    } else {
        console.log("Deploying contract...");
        multiSignature = await MultiSignature.deploy(owners,threshold);
        console.log(`Deployed contract to:${await multiSignature.address}`);
    }
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(multiSignature.address, arguments);
    }

    log("Enter MultiSignature with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run deploy-00-deploy-MultiSignature.js --network ${networkName}`);
    log("----------------------------------------------------");
}

module.exports.tags = ["all", "multisignature"]