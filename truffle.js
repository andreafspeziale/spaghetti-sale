module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: { // $ ganache-cli --port 7545
      host: 'localhost',
      port: 7545,
      network_id: '*', // Match any network id
      gas: 6721975,
      gasPrice: 65000000000,
    },
    parity: { // private parity remote node
      host: 'eidoo-dev-1.bchainapi.net', //wally-api-dev.undo.it',
      port: 8545,
      gas: 4700000,
      gasPrice: 65000000000,
      network_id: '8995'
    },
    docker: { // private parity local node
      host: 'localhost',
      port: 8545,
      gas: 4700000,
      gasPrice: 65000000000,
      network_id: '8996'
    },
    ropsten: { // private parity ropsten node
      host: '206.189.124.70',
      port: 8545,
      gas: 4700000,
      gasPrice: 65000000000,
      network_id: '3'
    },
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'EUR',
      gasPrice: 21
    }
  }
}