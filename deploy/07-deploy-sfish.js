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
    let sFISH = contractList.sFISH;
    
    log("----------------------------------------------------");
    const SFISH = await ethers.getContractFactory('sFISH');
    console.log("Deploying contract...");
    const FishERC20 = await ethers.getContractFactory('FishERC20');
    const fish = await upgrades.deployProxy(FishERC20, ['Fish Token', 'FISH', deployer, '100000000000000000'], { initializer: 'initialize' });
    await fish.deployed();
    console.log(`fish address:${await fish.address}`);
        
    sFISH = await SFISH.deploy(fish.address);
    console.log("sFISH address:", sFISH.address);

            
    try {
      console.log("Approving sFISH to spend Fish tokens...");
      await fish.approve(sFISH.address, '1000000000000000000000000000000');
      console.log("fish.approve:sFISH succeeded");
    } catch (error) {
      console.error("fish.approve:sFISH failed:", error);
    }
    
    try {
      console.log("Setting executor for FishERC20...");
      await fish.setExecutor(deployer, true);
      console.log("fish.setExecutor succeeded");
    } catch (error) {
      console.error("fish.setExecutor failed:", error);
    }
    
    try {
      console.log("Minting Fish tokens...");
      await fish.mint(deployer, '1000000000000000000');
      console.log("fish.mint succeeded");
    
      console.log("Minting SFISH tokens...");
      await sFISH.mint('1000000000000000000');
      console.log("sFISH.mint succeeded");
    } catch (error) {
      console.error("Token minting failed:", error);
    }
    
    // await sleep(10000);
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(SFISH.address, arguments);
    }

    log("Enter sfish with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run deploy-07-deploy-sfish.js --network ${networkName}`);
    log("----------------------------------------------------");
}

module.exports.tags = ["all", "sfish"]