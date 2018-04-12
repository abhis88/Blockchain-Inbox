const HdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile.js');

const provider = new HdWalletProvider (
    'stool flat rather source solution measure gas screen loud piano nice heart',
    'https://rinkeby.infura.io/wYjPf0UlLqPd9kEys3vU'
)

const web3 = new Web3(provider);

const deploy = async() => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy contract using account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data:bytecode, arguments: ['Hi there!']})
                    .send({gas: '1000000', from: accounts[0]});
    
    console.log('Contract deployed to ', result.options.address);
}
deploy();