import Web3 from 'web3';
import lendingPoolSpec from './LendingPool';

let web3;
let lendingPool;

// declare constants
const receiver = '0x773eCfb8e34F65Db644EA3Dd447c41E5Cb5b19E2';
const params = '0x';
const daiAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108';
const batAddress = '0x85B24b3517E3aC7bf72a14516160541A60cFF19d';

const initWeb3 = (infuraKey, privateKey) => {
  // init web3
  const provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`);
  web3 = new Web3(provider);

  // add private key
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

  // init contract instance
  const lendingPoolABI = lendingPoolSpec.abi;
  const lendingPoolAddress = '0x9E5C7835E4b13368fd628196C4f1c6cEc89673Fa';
  lendingPool = new web3.eth.Contract(lendingPoolABI, lendingPoolAddress);
};

const submitFlashLoan = async daiToBat => {
  const reserveAddress = daiToBat ? daiAddress : batAddress;
  const amount = new web3.utils.BN('1000000000000000000');
  lendingPool.methods
    .flashLoan(receiver, reserveAddress, amount, params)
    .send({ from: web3.eth.defaultAccount, gas: 5500000 })
    .on('transactionHash', function(hash) {
      console.log(hash);
    })
    .on('receipt', function(receipt) {
      console.log(receipt);
    });
};

export { initWeb3, submitFlashLoan };
