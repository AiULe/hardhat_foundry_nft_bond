const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "localhost",
        contractList: {
            pancakeRouter: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            pancakeFactory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            multiSignature: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            multiSignatureToSToken: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            usdc: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            fish: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
            fishOracle: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            sFISH: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            dev: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            op: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            usdc_fish_lp: '0x8579E3b3bECaA0A5E0aA3D3BD34B389a00cFcC2F',
            fishNft: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
            usdcBuyNftLogic: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            weth9:'0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            wtest:'0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
        },
    },
    31337: {
        name: "hardhat",
        contractList: {
            pancakeRouter: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            pancakeFactory: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            multiSignature: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            multiSignatureToSToken: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            usdc: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            fish: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
            fishOracle: '0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6',
            sFISH: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            dev: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            op: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            usdc_fish_lp: '0x8579E3b3bECaA0A5E0aA3D3BD34B389a00cFcC2F',
            fishNft: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
            usdcBuyNftLogic: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
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