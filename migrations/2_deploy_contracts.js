const SpaghettiCoin = artifacts.require('./SpaghettiCoin.sol')
const SpaghettiSale = artifacts.require('./SpaghettiSale.sol')
const c = require('colors')

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
            console.log(c.green(`\n[SpaghettiCoin]: ${SpaghettiCoinInst.address}`))
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
            console.log(c.green(`[SpaghettiSale]: ${SpaghettiSaleInst.address}`))
            return SpaghettiCoinInst.approve(SpaghettiSaleInst.address, totalTokens, {from: wallet});
        }).then((tx) => {
            console.log(c.green(`[Approval transaction status]: ${tx.receipt.status == '0x1' ? 'success' : 'fail'}`))
        })
}
