

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3'); //calling Constructor - talk JS <==> Ethereum
const compile = require('./compile');
// call compile with file, node
const {interface, bytecode} = compile.compileContract("inbox.sol",":Inbox");
console.log("Interface :"+interface+"\n\n")
const provider = new HDWalletProvider(
"",
"https://rinkeby.infura.io/GmIJH2gKPhtcbVc3yBQV"
);

const web3Instance = new Web3(provider);
let fetchedAccounts;
let deployResults;

async function deploy() {
      fetchedAccounts = await web3Instance.eth.getAccounts();
      console.log("\nGot account to deploy with, its: "+fetchedAccounts[0]);
      // needs to pass in an object
      deployResults = await new web3Instance.eth.Contract(JSON.parse(interface))
      .deploy({
            data: bytecode,
            //no arguments to the constructor
        })
      .send({
            from: fetchedAccounts[0],
            gas: '1000000'
      });

      console.log("\nDeployed to: "+deployResults.options.address+"\n")

}
deploy ()





// Infura API key
// GmIJH2gKPhtcbVc3yBQV
//Rinkby
//https://rinkeby.infura.io/GmIJH2gKPhtcbVc3yBQV
//https://mainnet.infura.io/GmIJH2gKPhtcbVc3yBQV
