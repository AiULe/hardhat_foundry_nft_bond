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
    const FEETOSETTER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    if (chainId == 31337) {
        contractList = networkConfig[chainId]["contractList"];
    } else {
        contractList = networkConfig[chainId]["contractList"];
    }

    log("----------------------PancakeFactoryStart------------------------------");
    let pancakeFactory = contractList.pancakeFactory;
    
    
    const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
    console.log("Deploying contract...");
    pancakeFactory = await PancakeFactory.deploy(FEETOSETTER);
    console.log(`pancakeFactory address:${await pancakeFactory.address}`);
    console.log("INIT_CODE_PAIR_HASH==================>",await pancakeFactory.INIT_CODE_PAIR_HASH());
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(pancakeFactory.address, arguments);
    }
    log("----------------------PancakeFactoryEnd------------------------------");

    

    log("----------------------WETH9Start------------------------------");
    let weth9 = contractList.weth9;
    const weth9Args = [];
    const WETH9 = await ethers.getContractFactory("WETH9");
    console.log("Deploying contract...");
    weth9 = await deploy("WETH9",{
        from: deployer,
        log:true,
        args:weth9Args,
    });
    console.log(`weth9 address:${await weth9.address}`);
    
    

    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...");
    //     await verify(USDCERC20.address, arguments);
    // }
    log("----------------------WETH9End------------------------------");

    log("-----------------------WTESTStart-----------------------------");
    let wtest = contractList.weth9;
    const wtestArgs = [];
    const WTEST = await ethers.getContractFactory("WTEST");
    console.log("Deploying contract...");
    wtest = await deploy("WTEST",{
        from: deployer,
        log:true,
        args:wtestArgs,
    });
    console.log(`wtest address:${await wtest.address}`);
    
    

    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...");
    //     await verify(USDCERC20.address, arguments);
    // }
    log("-----------------------WTESTEnd-----------------------------");

    
    
    log("-----------------------PancakeRouterStart-----------------------------");
    
    let pancakeRouter = contractList.pancakeRouter;
    const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
    console.log("Deploying contract...");
    pancakeRouter = await PancakeRouter.deploy(pancakeFactory.address,weth9.address);
    console.log(`pancakeRouter address:${await pancakeRouter.address}`);
    
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(PancakeRouter.address, arguments);
    }
    log("-----------------------PancakeRouterEnd-----------------------------");

    
    log("----------------------USDCERC20Start------------------------------");
    let usdc = contractList.usdc;
    const USDCERC20 = await ethers.getContractFactory("FishERC20");
    console.log("Deploying contract...");
    usdc = await upgrades.deployProxy(USDCERC20, ['USDC-test', 'USDC-test', deployer, '100000000000000000000000000'], { initializer: 'initialize' });
    await usdc.deployed();
    // await usdc.waitForDeployment();
    console.log(`usdc address:${await usdc.address}`);

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(USDCERC20.address, arguments);
    }
    log("----------------------USDCERC20End------------------------------");

    
    log("-----------------------FishERC20Start-----------------------------");
    let fish = contractList.fish;
    const FishERC20 = await ethers.getContractFactory("FishERC20");
    console.log("Deploying contract...");
    fish = await upgrades.deployProxy(FishERC20, ['Fish Token', 'FISH', deployer, '100000000000000000'], { initializer: 'initialize' });
    await fish.deployed();
    console.log(`fish address:${await fish.address}`);
    
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(FISHERC20.address, arguments);
    }
    log("-----------------------FishERC20End-----------------------------");

    
    log("------------------------addLiquidityStart----------------------------");
    // await sleep(10000);
    await pancakeFactory.createPair(fish.address, usdc.address);
    var usdc_fish_lp_address = await pancakeFactory.getPair(fish.address, usdc.address);
    console.log("usdc_fish_lp_address:", usdc_fish_lp_address);
    contractList.usdc_fish_lp = usdc_fish_lp_address;

    console.log("usdc.approve...");
    await usdc.approve(pancakeRouter.address, '1000000000000000000000000000000'); 
    // await sleep(10000);
    console.log("fish.approve...");
    await fish.approve(pancakeRouter.address, '1000000000000000000000000000000'); 
    // await sleep(10000);
    console.log("deployer======>",deployer);
    await pancakeRouter.addLiquidity(
        fish.address,
        usdc.address,
        '100000000000000000',//0.1 fish
        '1500000000000000000',//1.5u
        0,
        0,
        deployer,
        Math.round(new Date() / 1000) + 1000
    );
    console.log("addLiquidity");
    log("------------------------addLiquidityEnd----------------------------");

    
    log("------------------------FishOracleStart----------------------------");
    let fishOracle = contractList.fishOracle;
    const FISHORACLE = await ethers.getContractFactory('FishOracle');
    fishOracle = await upgrades.deployProxy(FISHORACLE, [usdc_fish_lp_address, fish.address], { initializer: 'initialize' });
    await fishOracle.deployed();
    console.log(`fishOracle address:${await fishOracle.address}`);
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(FISHORACLE.address, arguments);
    }
    log("------------------------FishOracleEnd----------------------------");

    
    
    log("-------------------------sFISHStart---------------------------");
    let sFISH = contractList.sFISH;
    const SFISH = await ethers.getContractFactory('sFISH');
    console.log("Deploying contract...");        
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
    log("-------------------------sFISHEnd---------------------------");
    
    log("--------------------------FishNftStart--------------------------");
    const FishNft = await ethers.getContractFactory('FishNft');
    let fishNft = await upgrades.deployProxy(FishNft, ["0xFishBone Nft", 'FB-NFT', fish.address], { initializer: 'initialize' });
    await fishNft.deployed();
    contractList.fishNft = fishNft.address;
    console.log(`fishNft address:${await fishNft.address}`);
    
    // await sleep(10000);
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(FishNft.address, arguments);
    }

    log("--------------------------FishNftEnd--------------------------");

    
    
    log("-----------------------MultiSignature-----------------------------");
    let multiSignature = contractList.multiSignature;
    const msOwners = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    const msThreshold = 1;
    const MultiSignature = await ethers.getContractFactory("MultiSignature");
    console.log("Deploying contract...");
    multiSignature = await MultiSignature.deploy(msOwners,msThreshold);
    console.log(`multiSignature address:${await multiSignature.address}`);
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(multiSignature.address, arguments);
    }

    log("-----------------------MultiSignature-----------------------------");

    
    
    log("--------------------------MultiSignatureToSToken--------------------------");
    let multiSignatureToSToken = contractList.multiSignatureToSToken;
    
    const mstOwners = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    const mstThreshold = 1;
    const MultiSignatureToSToken = await ethers.getContractFactory("MultiSignatureToSToken");
    console.log("Deploying contract...");
    multiSignatureToSToken = await MultiSignatureToSToken.deploy(mstOwners,mstThreshold);
    console.log(`multiSignatureToSToken address:${await multiSignatureToSToken.address}`);
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(multiSignatureToSToken.address, arguments);
    }

    log("--------------------------MultiSignatureToSToken--------------------------");

    
    log("-----------------------usdcBuyNftLogic-----------------------------");
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
    console.log(`usdcBuyNftLogic address:${await usdcBuyNftLogic.address}`);
    // await sleep(10000);

    //设置执行者
    await fish.setExecutor(fishNft.address, true); console.log("fish.setExecutor");
    // await sleep(10000);1
    await fish.setExecutor(usdcBuyNftLogic.address, true); console.log("fish.setExecutor");
    // await sleep(10000);
    await fishNft.setExecutor(usdcBuyNftLogic.address, true); console.log("fishNft.setExecutor");
    // await sleep(10000);


    //approve usdcBuyNftLogic 测试买入用
    await usdc.approve(usdcBuyNftLogic.address, '1000000000000000000000000000000'); console.log("usdc.approve:usdcBuyNftLogic");
    
    

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(UsdcBuyNftLogic.address, arguments);
    }
    log("-----------------------usdcBuyNftLogic-----------------------------");






}

module.exports.tags = ["all", "nftbond"]