const path = require('path');
const fs = require('fs');
const solc = require('solc')



function compileContract(contractFileName, nodeString) {
      console.log("\nIN COMPILE: The contract is: "+contractFileName+" and the node is: "+nodeString+"\n")
      const contractPath = path.resolve(__dirname, 'contracts', contractFileName)
      const source = fs.readFileSync(contractPath, 'utf8')


       if (nodeString) {
            //return solc.compile(source, 1).contracts[nodeString];

            let results = solc.compile(source, 1).contracts[nodeString];
            //console.log("Results are: "+JSON.stringify(results)+"\n");
            return results;

       }  else {

            let results = solc.compile(source, 1);
            //console.log("Results are: "+JSON.stringify(results)+"\n");
            return results;
       }

}



module.exports = {
     compileContract: compileContract
}

//Results are: {"contracts":{":Inbox":{"assembly":

async function testCompile() {

          // //const {interface, bytecode} = compileContract("lottery.sol", null);
          const {interface, bytecode} = await compileContract("lottery.sol",":Lottery");
          console.log("*> Compile Lottery Interface: \n"+interface+"\n");
          console.log("\n *>Compile Lottery The bytecode is "+bytecode+"\n");


          // const {interface, bytecode} = await compileContract("inbox.sol",":Inbox");
          // // //const {interface, bytecode} = compileContract("inbox.sol",null);
          //
          // console.log("*> Inbox Interface: \n"+interface+"\n");
          // console.log("\n *>The Inboc bytecode is "+bytecode+"\n");
}

//run it!!
//testCompile()
