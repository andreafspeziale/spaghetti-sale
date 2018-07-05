pragma solidity ^0.4.24;

import "./SpaghettiCoin.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract SpaghettiSale {
    using SafeMath for uint;

    SpaghettiCoin public token;
    address public wallet;

    uint public price;

    uint public startTime;

    uint public endTime;

    uint public totalTokens;

    uint public remainingTokens;

    constructor(
        address _token, 
        address _wallet, 
        uint _startTime, 
        uint _endTime, 
        uint _price, 
        uint _totalTokens)
        public
    {
        token = SpaghettiCoin(_token);
        wallet = _wallet;
        startTime = _startTime;
        endTime = _endTime;
        price = _price;
        totalTokens = _totalTokens;
        remainingTokens = _totalTokens;
    }

    function releaseTokensTo(address buyer) internal returns(bool) {
        require(now >= startTime && now < endTime);
        uint amount = msg.value.mul(price);
        remainingTokens = remainingTokens.sub(amount);
        wallet.transfer(msg.value);
        require(token.transferFrom(wallet, buyer, amount));
        return true;
    }

    function started() public view returns(bool) {
        return now >= startTime;
    }

    function ended() public view returns(bool) {
        return now >= endTime || remainingTokens == 0;
    }

    function startTime() public view returns(uint) {
        return startTime;
    }

    function endTime() public view returns(uint) {
        return endTime;
    }

    function totalTokens() public view returns(uint) {
        return totalTokens;
    }

    function remainingTokens() public view returns(uint) {
        return remainingTokens;
    }

    function price() public view returns(uint) {
        return price;
    }

    function() public payable {
        releaseTokensTo(msg.sender);
    }
}