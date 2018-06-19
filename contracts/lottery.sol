pragma solidity ^0.4.18;

contract Lottery {

    address public owner;
    address[] public players;
    uint winner;


    constructor() public { //constructor - whoever creates it is the owner
        owner = msg.sender;
    }

    modifier restricted () {
        require(msg.sender == owner);
        _;
    }

    function pickWinner() public restricted returns (uint) {
        winner = randomGen() % players.length;
        players[winner].transfer(address(this).balance); //send winner the balance of this contract.
        players = new address[](0)
        return winner;
    }


    function addPlayer() public payable {  //also pays into the contract
        require(msg.value > .01 ether);
        players.push(msg.sender);

    }
    //huge random number
    function randomGen() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function getPlayers() public view returns (address[]) {
        return players;

    }

}
