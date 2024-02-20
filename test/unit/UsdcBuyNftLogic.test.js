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
    const fishNft =  '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';
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
        const pancakeRouter = PancakeRouter.attach(contractList.pancakeRouter);
        const PancakeFactory = await ethers.getContractFactory('PancakeFactory');
        let pancakeFactory = PancakeFactory.attach(contractList.pancakeFactory);
        const FishFactory = await ethers.getContractFactory('FishERC20');
        const fish = FishFactory.attach(contractList.fish);
        const UsdcFactory = await ethers.getContractFactory('FishERC20');
        const usdc = UsdcFactory.attach(contractList.usdc);
        console.log("fish====>",fish.address);
        console.log("usdc======>",usdc.address);
        // await sleep(10000);
        pancakeFactory = await PancakeFactory.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
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
        const FISHORACLE = await ethers.getContractFactory('FishOracle');
        console.log("usdc_fish_lp_address=====>",usdc_fish_lp_address);
        console.log();
        let fishOracle = await upgrades.deployProxy(FISHORACLE, [usdc_fish_lp_address, fish.address], { initializer: 'initialize' });
        await fishOracle.deployed();
        console.log("fishOracle==================>",fishOracle.address);

        const UsdcBuyNftLogic = await ethers.getContractFactory('usdcBuyNftLogic');
        usdcBuyNftLogic = await upgrades.deployProxy(UsdcBuyNftLogic, [
        fish.address,
        fishNft,
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

        console.log("fishOracle:peekSpot===========>",await fishOracle.peekSpot('0x'));
        console.log("peekSpot===========>",await usdcBuyNftLogic.peekSpot());
    })

    describe("usdcBuyNftLogic", async function(){
        it("testusdcBuyNftLogic", async function(){
            // console.log("peekSpot===========>",usdcBuyNftLogic.peekSpot());
        })
    })
})