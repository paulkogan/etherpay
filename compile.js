const path = require('path');
const fs = require('fs');
const solc = require('solc')



function compileContract(contractFileName, nodeString) {
      console.log("\nIN COMPILE: The contract is:"+contractFileName+" and the node is:"+nodeString+"\n")
      const contractPath = path.resolve(__dirname, 'contracts', contractFileName)
      const source = fs.readFileSync(contractPath, 'utf8')
      return solc.compile(source, 1).contracts[nodeString];
      //return solc.compile(source, 1).contracts[':Inbox'];
}




module.exports = {
     compileContract: compileContract
}


//if running standalone
//console.log(compileCon())
