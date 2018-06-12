const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //calling Constructor - talk JS <==> Ethereum

//const web3Instance = new Web3(ganache.provider());

class Car {

      park () {
        return "stopped";
      }

      drive () {
        return "vroom!";
      }
}

// let car
// beforeEach(function () {
//       car = new Car();
// })
//
// describe("CarTest", function () {
//
//       it("can park?", function(){
//               assert.equal(car.park(), "stopped");
//       });
//
//
//       it("can drive?", function(){
//               assert.equal(car.drive(), "vroom!");
//       });
// }); //describe
