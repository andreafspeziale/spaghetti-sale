const Migrations = artifacts.require('./Migrations.sol')
const c = require('colors')

module.exports = (deployer, network) => {
    console.log(c.magenta(`[network]: ${network}`))
    deployer.deploy(Migrations)
}
