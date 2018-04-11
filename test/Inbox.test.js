const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
//const web3 = new Web3(ganache.provider()); //Older version has this

const provider = ganache.provider();
const web3 = new Web3(provider);

//module export object catch
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {

    //Get a list of all accounts available in ganache-cli
    accounts = await web3.eth.getAccounts();

    //Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data: bytecode, arguments: ['Hi there!']})
                        .send({from: accounts[0], gas: '1000000'});
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract to local ganache', () => {
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });
    
    it('has a default message assinged', async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async() => {
        await inbox.methods.setMessage('New Message').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'New Message');
    });
})