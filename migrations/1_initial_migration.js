var Migrations = artifacts.require("./Ecommerce_mob.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
