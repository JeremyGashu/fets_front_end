const Project = artifacts.require("Project");

module.exports = function (deployer) {
  deployer.deploy(Project);
};
