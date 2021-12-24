// CONFIGURE HERE THE VARIABLES THAT WILL BE CHANGED BEFORE THE PRESALE

//----------------------------------------------------------------------------------------------------------------------------------------------

// Labo ADDRESSES

const LaboUstAddr = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const LaboBnbAddr = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const LaboUstAddrV2 = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const LaboBnbAddrV2 = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const LaboAddr = '0xD74433B187Cf0ba998Ad9Be3486B929c76815215'
const masterChef = '0x59C777cd749b307Be910f15c54A3116ff88f9706'
const misWheel = '0x9F310757333e6083372d2603CFbd3B61c0F21C54'
// testnet addresses
const LaboBusdAddrTestnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrTestnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-WONE LP
const LaboBusdAddrV2Testnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrV2Testnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-BUSD LP
const LaboAddrTestnet = '0xF2f587fD8A423880037F39828d593d4cE1961A98' // MIS ADDRESS
const masterChefTestnet = '0xDd62435ca34666f65c32ED62eA5331b2128ED262' // MIS MASTERCHEF

// Labo RELATED PIDS

const pidLaboUst = 0
const pidLaboBnb = 2
const pidLabo = 200

// OTHER PIDS THAT ARE REFERENCED THROUGHOUT THE CODE

const pidBnbBusd = 1

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
        LaboUstAddr,
        LaboBnbAddr,
        LaboUstAddrV2,
        LaboBnbAddrV2,
        LaboAddr,
        masterChef,
        misWheel,
        LaboBusdAddrTestnet,
        LaboBnbAddrTestnet,
        LaboBusdAddrV2Testnet,
        LaboBnbAddrV2Testnet,
        LaboAddrTestnet,
        masterChefTestnet,
    },
    pids: {
        pidLaboBnb,
        pidLaboUst, 
        pidLabo,
        pidBnbBusd,
        pidList: [
            pidLaboUst, 
            pidBnbBusd, 
            pidLaboBnb, 
            3, 
            4, 
            5, 
            6, 
            7,
            8, 
            9, 
            10, 
            11, 
            12,
            13,
            14,
            15, 
            16,
            17,
            18,
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