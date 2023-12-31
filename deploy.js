const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");
const dotenv = require("dotenv");

dotenv.config();

const provider = new HDWalletProvider(
	process.env.MNEMONIC,
	"https://goerli.infura.io/v3/97efa9cd4cc84782baaaf1f1c9fd251d"
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Attempting to deploy from account", accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
		.send({ gas: "1000000", from: accounts[0] });

	console.log("Contract deployed to", result.options.address);
	provider.engine.stop();
};
deploy();
