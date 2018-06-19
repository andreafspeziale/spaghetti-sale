const SpaghettiCoin = artifacts.require('./SpaghettiCoin.sol')
const SpaghettiSale = artifacts.require('./SpaghettiSale.sol')

module.exports = (deployer, network, accounts) => {
    
    const wallet      = accounts[1]
    const openingTime = web3.eth.getBlock('latest').timestamp + 10  // Starts after 10 seconds in the future
    const closingTime = openingTime + 86400 * 20                    // Ends after 20 days
    const rate        = new web3.BigNumber(1000)
    const totalTokens  = 10 * 10^21                                  // 10K Ether in Wei

    return deployer
        .then(() => {
            return deployer.deploy(SpaghettiCoin, totalTokens, {from: wallet})
        })
        .then((instance) => {
            SpaghettiCoinInst = instance
            return deployer.deploy(
                SpaghettiSale,
                SpaghettiCoin.address,
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
            return SpaghettiCoinInst.approve(SpaghettiSaleInst.address, totalTokens, {from: wallet});
        })
}