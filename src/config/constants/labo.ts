// CONFIGURE HERE THE VARIABLES THAT WILL BE CHANGED BEFORE THE PRESALE

//----------------------------------------------------------------------------------------------------------------------------------------------

// Labo ADDRESSES

const LaboBusdAddr = '0x306223ae4cd16a7623e9ff93bde461a60c5dcaf8'
const LaboBnbAddr = '0xf36067d88a49682d89638a3ed75431181585dbf4'
const LaboBusdAddrV2 = '0x306223ae4cd16a7623e9ff93bde461a60c5dcaf8'
const LaboBnbAddrV2 = '0xf36067d88a49682d89638a3ed75431181585dbf4'
const LaboAddr = '0xc078b878ae6BB14a8734d8a788F496984Cc7dde2'
const masterChef = '0x21262941bd12FB01218afCF64AD0E23655E9F5f9'
// testnet addresses
const LaboBusdAddrTestnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrTestnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-WONE LP
const LaboBusdAddrV2Testnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrV2Testnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-BUSD LP
const LaboAddrTestnet = '0xF2f587fD8A423880037F39828d593d4cE1961A98' // MIS ADDRESS
const masterChefTestnet = '0xDd62435ca34666f65c32ED62eA5331b2128ED262' // MIS MASTERCHEF

// Labo RELATED PIDS

const pidLaboBusd = 0
const pidLaboBnb = 1
const pidLabo = 2

// OTHER PIDS THAT ARE REFERENCED THROUGHOUT THE CODE

const pidBnbBusd = 3

// SET countBack TO TRUE TO COUNT BACK AS FAR AS countLength

const countBack = false
const countLength = 2

// CHANGE Labo FOR THE TOKEN BEIGN TESTED

const xPerBlock = "laboPerBlock" // referenced in getMasterChefAddress()
const pendingX = "pendingLabo"

// SEARCH AND REPLACE THIS STRING IF USING ANY OTHER THAN LABO: await masterChefContract.methods.pendingLabo in \src\state\pools\fetchPoolsUser.ts

// USE OUR CUSTOM WAY OF FETCHING PRICE

const fetchAutomatic = false;
const fetchPriceCustom = false;

// BitQuery RESPONSE POSITIONS

const busdPosition = 0
const tokenPosition = 1

// IS LOCKED

const unlockWalletButton = false;

// IS FARMS CONFIGURED

const isFullyConfigured = true;
const showFarmInfoModal = true;


//----------------------------------------------------------------------------------------------------------------------------------------------

// EDIT ABOVE NOT HERE

const labo = {
    addr: {
        LaboBusdAddr,
        LaboBnbAddr,
        LaboBusdAddrV2,
        LaboBnbAddrV2,
        LaboAddr,
        masterChef,
        LaboBusdAddrTestnet,
        LaboBnbAddrTestnet,
        LaboBusdAddrV2Testnet,
        LaboBnbAddrV2Testnet,
        LaboAddrTestnet,
        masterChefTestnet,
    },
    pids: {
        pidLaboBusd, 
        pidLaboBnb,
        pidLabo,
        pidBnbBusd,
        pidList: [
            pidLaboBusd, // Labo-BUSD LP [0]
            pidLaboBnb, // Labo-BNB LP [1]
            pidLabo, // Labo [2]
            pidBnbBusd, // BNB-BUSD LP [3]
            4, // ONE-1ETH LP [4]
            /* 2, // BTCB-BNB LP [4]
            3, // ETH-BNB LP [5]
            4, // DAI-BUSD LP [6]
            5, // USDC-BUSD LP [7]
            6, // DOT-BNB LP [8]
            7, // CAKE-BUSD LP [9]
            8, // CAKE-BNB LP [10] */
            // pidLabo, // Labo [3]
            /* 10, // BUSD [12]
            11, // WBNB [13]
            12, // EGG [14]
            18, // BTCB [15]
            14, // ETH [16]
            15, // DAI [17]
            16, // USDC [18]
            17, // DOT [19]
            19, // BSCX [20]
            13, // AUTO [21]
            22, // Labo-GYA [22]
            23, // Labo-DSL [23]
            24, // Labo-BUSD LP V2 [24]
            25, // Labo-BNB LP V2 [25]
            26, // BUSD-BNB LP V2 [26]
            27, // USDT-BUSD LP V2 [27]
            28, // BTCB-BNB LP V2 [28] 
            29, // ETH-BNB LP V2 [29]
            30, // DAI-BUSD LP V2 [30] 
            31, // USDC-BUSD LP V2 [31]
            31, // DOT-BNB LP V2 [32]
            32, // CAKE-BNB LP V2 [33]
            33, // ADA-WBNB LP V2 [34] */


        ],
    },
    strings: {
        xPerBlock,
        pendingX
    },
    fetch: {
        fetchAutomatic,
        fetchPriceCustom
    },
    queryPosition: {
        busd: busdPosition,
        token: tokenPosition
    },
    isLocked: {
        unlockWalletButton
    },
    isFullyConfigured,
    showFarmInfoModal
}
 
export default labo;