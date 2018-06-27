const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //calling Constructor - talk JS <==> Ethereum

const ganacheProvider = ganache.provider()  //fixed bug
const web3Instance = new Web3(ganacheProvider);
const compile = require('../compile')
const {interface, bytecode} = compile.compileContract("lottery.sol",":Lottery");


let fetchedAccounts;
let lotteryResults;

beforeEach(async function () {
//this will run before any test in any file
//get a list of all accounts
          fetchedAccounts = await web3Instance.eth.getAccounts();

          //console.log("\n *> got list of accounts: \n");
          //console.log("*> Test Interface: \n"+interface+"\n");
          //console.log("\n *>The Test bytecode is "+bytecode+"\n");

//use first account to deploy
          lotteryResults = await new web3Instance.eth.Contract(JSON.parse(interface))
          .deploy({
                data: bytecode
                // arguments:["Hi there!"]
            })
          .send({
                from: fetchedAccounts[0],
                gas: '1000000'
          });

}); //beforeEach




describe("LotteryTest", function () {

      let players;

      it("deploys a contract", function(){
        assert.ok(lotteryResults.options.address)
        //console.log("\n\ninbox results:");
        //console.log(inboxResults);
      });


       it('allows one player to be added', async function ()  {
        //lets call a method on our contract to retrieve some data
       await lotteryResults.methods.addPlayer().send({
            from: fetchedAccounts[0],
            value: web3Instance.utils.toWei('0.02','ether')
        });
        players = await lotteryResults.methods.getPlayers().call(
          {
            from: fetchedAccounts[0]
          });

        assert.equal(fetchedAccounts[0],players[0]);
        assert.equal(1,players.length);
      });


    it('allows several players to be added', async function ()  {
       //add three players
       for (let i=0;i<3;i++) {
                  await lotteryResults.methods.addPlayer().send({
                     from: fetchedAccounts[i],
                     value: web3Instance.utils.toWei('0.02','ether')
                   });

                  players = await lotteryResults.methods.getPlayers().call(
                   {
                     from: fetchedAccounts[i] //why do you need a sender?
                   });

                  assert.equal(fetchedAccounts[i],players[i]);
        } //for

                  assert.equal(3,players.length);
     });



       it('requires a minimm of ether to enter', async function ()  {
                  try {

                        await lotteryResults.methods.addPlayer().send({
                                from: fetchedAccounts[0],
                                value: 200
                        });
                        assert(false); //if it ran, then our test fails

                        } catch (err){
                            assert(err)
                    }

      }); //test for low wei

      it('only manager can PickWinner', async function ()  {
                 try {
                       await lotteryResults.methods.addPlayer().send({
                               from: fetchedAccounts[1],
                               value: web3Instance.utils.toWei('0.02','ether')
                       });

                       await lotteryResults.methods.pickWinner().send({
                               from: fetchedAccounts[0]
                       });
                        assert((false)); //if it ran, then our test fails

                       } catch (err){
                           console.log("pickwinner returned error : "+err)
                           assert(err)
                       }

     }); //test for low wei


//add one player
    it('sends money to the winner', async function ()  {


            const initialBalance = await web3Instance.eth.getBalance(fetchedAccounts[1]);
            //have one guy enter
            await lotteryResults.methods.addPlayer().send({
                    from: fetchedAccounts[1],
                    value: web3Instance.utils.toWei('2','ether')
            });

            const playerBalance = await web3Instance.eth.getBalance(fetchedAccounts[1]);


            await lotteryResults.methods.pickWinner().send({
                    from: fetchedAccounts[0]
            });

            const winnerBalance = await web3Instance.eth.getBalance(fetchedAccounts[1]);
            const winnings = winnerBalance - playerBalance;
            const gasSpend = winnerBalance - initialBalance;
            const winningsEth = web3Instance.utils.fromWei(winnings.toString(),'ether');
            const gasSpendEth = web3Instance.utils.fromWei(gasSpend.toString(),'ether');
            console.log("Initial Balance is "+initialBalance+"\n")
            console.log("Player Balance is "+playerBalance+"\n")
            console.log("Winner Balance is "+winnerBalance+"\n")
            console.log("The winnings are "+winnings+" wei    --  and"+winningsEth+"  ether\n")
            console.log("Gas Spend is   "+gasSpend+" wei and "+gasSpendEth+" ether\n")
            assert (winnings > web3Instance.utils.toWei('1.8','ether'));




    }); //send money test



}); //describe
