pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract SpaghettiCoin is StandardToken {
  string public name = "SPAGHETTI COIN";
  string public symbol = "SPAG";
  uint8 public decimals = 18;

  constructor(uint256 _totalSupply) public {
    totalSupply_ = _totalSupply;
    balances[msg.sender] = _totalSupply;
  }
}