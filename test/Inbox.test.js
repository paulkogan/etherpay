const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //calling Constructor - talk JS <==> Ethereum

const ganacheProvider = ganache.provider()
const web3Instance = new Web3(ganacheProvider);
const compile = require('../compile')
const {interface, bytecode} = compile.compileCon("inbox.sol",":Inbox");


let fetchedAccounts;
let inboxResults;

beforeEach(async function () {
//this will run before any test in any file
//get a list of all accounts

          fetchedAccounts = await web3Instance.eth.getAccounts();
          //console.log("\n *> got list of accounts: \n");
          //console.log("*> Interface: \n"+interface);
          //console.log("\n the bytecode is "+bytecode);

//use one of those to deploy the contract
          inboxResults = await new web3Instance.eth.Contract(JSON.parse(interface))
          .deploy({
                data: bytecode,
                arguments:["Hi there!"]
            })
          .send({
                from: fetchedAccounts[0],
                gas: '1000000'
          });

}); //beforeEach




describe("InboxTest", function () {
      it("deploys a contract?", function(){
        assert.ok(inboxResults.options.address)
        //console.log("\n\ninbox results:");
        //console.log(inboxResults);
      });

      it('has a default message?', async function ()  {
        //lets call a method on our contract to retrieve some data
        const message = await inboxResults.methods.message().call();
        assert.equal(message, 'Hi there!');
      });

      it('can chamge a message?', async function ()  {
        //lets call a method on our contract to retrieve some data
        let resultsHash = await inboxResults.methods.setMessage("New and different messgae").send({from: fetchedAccounts[0]});
        const message = await inboxResults.methods.message().call();
        assert.equal(message, 'New and different messgae');
      });


}); //describe
