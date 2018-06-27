pragma solidity ^0.4.18;

contract Lottery {

    address public owner;
    address[] public players;
    uint public winner;


    /*constructor() public { //constructor - whoever creates it is the owner
        owner = msg.sender;
    }*/

    function Lottery () public { //constructor - whoever creates it is the owner
        owner = msg.sender;
    }

    modifier restricted () {
        require(msg.sender == owner);
        _;
    }

    function pickWinner() public restricted  {
        winner = randomGen() % players.length;
        players[winner].transfer(address(this).balance); //send winner the balance of this contract.
        players = new address[](0); //clear the players array
        //return winner; //not sure why its not returning this
    }


    function addPlayer() public payable {  //also pays into the contract
        require(msg.value > .01 ether);
        players.push(msg.sender);  //add sender to players array

    }

    //huge random number
    function randomGen() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function getPlayers() public view returns (address[]) {
        return players;

    }

}
