const FlashLoanReceiver = artifacts.require('FlashLoanReceiver');

module.exports = function(deployer) {
  deployer.deploy(FlashLoanReceiver, '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728');
};
