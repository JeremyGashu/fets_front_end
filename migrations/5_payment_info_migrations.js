const PaymentInformations = artifacts.require("PaymentInformations");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(PaymentInformations, { from: accounts[0] });
};
