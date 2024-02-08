const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
        contractList: {
            pancakeRouter: '',
            pancakeFactory: '',
            multiSignature: '',
            multiSignatureToSToken: '',
            usdc: '',
            fish: '',
            fishOracle: '',
            sFISH: '',
            dev: '',
            op: '',
            usdc_fish_lp: '',
            fishNft: '',
            usdcBuyNftLogic: '',
            weth9:'',
            wtest:''
        },
    },
    31337: {
        name: "localhost",
        contractList: {
            pancakeRouter: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            pancakeFactory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            multiSignature: '',
            multiSignatureToSToken: '',
            usdc: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            fish: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            fishOracle: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            sFISH: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            dev: '',
            op: '',
            usdc_fish_lp: '0x8579E3b3bECaA0A5E0aA3D3BD34B389a00cFcC2F',
            fishNft: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            usdcBuyNftLogic: '',
            weth9:'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            wtest:'0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
        },
    },
    11155111: {
        name: "sepolia",
        contractList: {
            pancakeRouter: '',
            pancakeFactory: '',
            multiSignature: '',
            multiSignatureToSToken: '',
            usdc: '',
            fish: '',
            fishOracle: '',
            sFISH: '',
            dev: '',
            op: '',
            usdc_fish_lp: '',
            fishNft: '',
            usdcBuyNftLogic: '',
            weth9:'',
            wtest:''
        },
    },
    1: {
        name: "mainnet",
        contractList: {
            pancakeRouter: '',
            pancakeFactory: '',
            multiSignature: '',
            multiSignatureToSToken: '',
            usdc: '',
            fish: '',
            fishOracle: '',
            sFISH: '',
            dev: '',
            op: '',
            usdc_fish_lp: '',
            fishNft: '',
            usdcBuyNftLogic: '',
            weth9:'',
            wtest:''
        },
    },
}

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
const frontEndContractsFile = "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json";
const frontEndAbiFile = "../nextjs-smartcontract-lottery-fcc/constants/abi.json";

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
    frontEndAbiFile,
}