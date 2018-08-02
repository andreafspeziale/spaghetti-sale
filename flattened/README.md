# Contract flattener
Since Etherscan is suggesting the [solidity-flattener](https://github.com/BlockCatIO/solidity-flattener) library for the contract flattening you can find below the instructions for the flattening.

## Requirements
- Python 3.5+, pip
- solc

## Create a virtualenv
- `$ virtualenv -p python3 env`

## Activate the virtualenv
- `$ source env/bin/activate`

## Install the library
- `$ pip3.X install -r requirements.txt`

## Check install
- `$ pip3.X freeze`

## Flat
- `$ solidity_flattener --solc-path="--allow-paths $PWD/node_modules/zeppelin-solidity/ zeppelin-solidity=$PWD/node_modules/zeppelin-solidity" contracts/MyToken.sol`

