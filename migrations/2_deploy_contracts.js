const SpaghettiCoin = artifacts.require('./SpaghettiCoin.sol')
const SpaghettiSale = artifacts.require('./SpaghettiSale.sol')

module.exports = (deployer, network, accounts) => {
    
    const wallet      = accounts[0]
    const openingTime = web3.eth.getBlock('latest').timestamp       // Starts immediately
    const closingTime = openingTime + 86400 * 20                    // Ends after 20 days
    const rate        = 5                                           // Multiplier 1 ether gives you back 5 token
    const totalTokens = 1000000*10**18                              // 1 mln of tokens

    return deployer
        .then(() => {
            return deployer.deploy(SpaghettiCoin, totalTokens, {from: wallet})
        })
        .then((instance) => {
            SpaghettiCoinInst = instance
            console.log(`\nDEPLOYED SPAGHETTI COIN ADDRESS: ${SpaghettiCoinInst.address}`)
            return deployer.deploy(
                SpaghettiSale,
                SpaghettiCoinInst.address,
                wallet,
                openingTime,
                closingTime,
                rate,
                totalTokens,
                {from: wallet}
            )
        })
        .then((instance) => {
            SpaghettiSaleInst = instance
            console.log(`DEPLOYED SPAGHETTI SALE ADDRESS: ${SpaghettiSaleInst.address}`)
            return SpaghettiCoinInst.approve(SpaghettiSaleInst.address, totalTokens, {from: wallet});
        }).then((tx) => {
            console.log(`APPROVAL DONE, TX: ${JSON.stringify(tx.receipt.transactionHash)}`)
        })
}
