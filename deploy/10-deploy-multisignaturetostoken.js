const { network, ethers,upgrades  } = require("hardhat");

const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")

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
    let multiSignatureToSToken = contractList.multiSignatureToSToken;
    
    const owners = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    const threshold = 1;
    
    log("----------------------------------------------------");
    const MultiSignatureToSToken = await ethers.getContractFactory("MultiSignatureToSToken");
    console.log("Deploying contract...");
    multiSignatureToSToken = await MultiSignatureToSToken.deploy(owners,threshold);
    console.log(`Deployed contract to:${await multiSignatureToSToken.address}`);
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(multiSignatureToSToken.address, arguments);
    }

    log("Enter multiSignatureToSToken with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run deploy-11-deploy-multiSignatureToSToken.js --network ${networkName}`);
    log("----------------------------------------------------");
}

module.exports.tags = ["all", "multisignaturetostoken"]