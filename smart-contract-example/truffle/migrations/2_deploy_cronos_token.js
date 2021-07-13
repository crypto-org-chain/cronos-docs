const CronosToken = artifacts.require("CronosToken");

module.exports = function (deployer) {
  deployer.deploy(CronosToken, "Cronos Token", "CRT", "1000000000000000000000000");
};





