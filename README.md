# Sample token sale

## Requirements
- node v9.10.1
- npm 5.8.0

## Install
- `$ npm install`

## Set path for dependencies usage
- `$ source set_path.sh`

## Migrate
- `$ truffle migrate --network NETWORK_NAME`

or 

- `npm run migrate:development`
- `npm run migrate:parity`

## Test
- `$ truffle test --network NETWORK_NAME` 

or 

- `npm run test:development`
- `npm run test:parity`

# Local development
Run Ganache:

- `$ ganache-cli -p 7545 -i 8994` or `npm run ganache`
