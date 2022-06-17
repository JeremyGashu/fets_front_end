const Project = artifacts.require("Project");
const SubProject = artifacts.require("SubProject");
const Task = artifacts.require("Task");
const ProjectUserMapping = artifacts.require("ProjectUserMapping");
// const account = '0x4299e6Ce4a7EEF69FD8bf6b78250B96E5C77000f'

module.exports = async (deployer) => {
    // console.log(accounts)
    await deployer.deploy(Project);
    await deployer.deploy(SubProject);
    await deployer.deploy(Task);
    await deployer.deploy(ProjectUserMapping, Project.address, SubProject.address, Task.address)
    console.log('project address => ', Project.address)
    console.log('subproject address => ', SubProject.address)
    console.log('task address => ', Task.address)
    console.log('mapping', ProjectUserMapping.address)

}
