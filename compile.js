const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//console.log(solc.compile(source,1)); // no of contracts to be compiled is 1

//outputs a json object with interface and bytecode
module.exports = solc.compile(source,1).contracts[':Inbox']; 
