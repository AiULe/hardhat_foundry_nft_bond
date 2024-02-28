const { ethers,upgrades  } = require("hardhat");
const { networkConfig } = require("../../helper-hardhat-config.js");
const { assert } = require("chai");

describe("UsdcBuyNftLogic",async function(){
    let usdcBuyNftLogic;
    // let pancakeRouter =  '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
    // let pancakeFactory = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const multiSignature = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const multiSignatureToSToken = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
    // let usdc = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
    // let fish = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
    const sFISH = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
    const dev = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const op = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    // const fishNft =  '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';
    // const usdc_fish_lp = '0x8579E3b3bECaA0A5E0aA3D3BD34B389a00cFcC2F';

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
        let fishOracle = await upgrades.deployProxy(FISHORACLE, [usdc_fish_lp_address, fish.address], { initializer: 'initialize' });
        await fishOracle.deployed();

        const FishNft = await ethers.getContractFactory('FishNft');
        let fishNft = await upgrades.deployProxy(FishNft, ["0xFishBone Nft", 'FB-NFT', fish.address], { initializer: 'initialize' });
        await fishNft.deployed();
        contractList.fishNft = fishNft.address;
        console.log(`fishNft address:${await fishNft.address}`);

        const UsdcBuyNftLogic = await ethers.getContractFactory('usdcBuyNftLogic');
        usdcBuyNftLogic = await upgrades.deployProxy(UsdcBuyNftLogic, [
        fish.address,
        fishNft.address,
        pancakeFactory.address,
        pancakeRouter.address,
        multiSignature,
        multiSignatureToSToken,
        dev,
        op,
        sFISH,
        fishOracle.address,
        usdc.address], { initializer: 'initialize' });
        await usdcBuyNftLogic.deployed();
        console.log("usdcbuynft address:",usdcBuyNftLogic.address);

        //设置执行者
        await fish.setExecutor(fishNft.address, true); console.log("fish.setExecutor");
        await fish.setExecutor(usdcBuyNftLogic.address, true); console.log("fish.setExecutor");
        await fishNft.setExecutor(usdcBuyNftLogic.address, true); console.log("fishNft.setExecutor");
        await usdc.approve(usdcBuyNftLogic.address, '1000000000000000000000000000000'); console.log("usdc.approve:usdcBuyNftLogic");
    })

    describe("usdcBuyNftLogic", async function(){
        it("testusdcBuyNftLogic", async function(){
            console.log("buyNft===========>",await usdcBuyNftLogic.buyNft(1));
        });
        it("testusdcBuyNftLogicPeekSpot", async function(){
            console.log("PeekSpot===========>",await usdcBuyNftLogic.peekSpot());
        });
    })
})