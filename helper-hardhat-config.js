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
            pancakeRouter: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            pancakeFactory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
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
            weth9:'0x5FbDB2315678afecb367f032d93F642f64180aa3',
            wtest:'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
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