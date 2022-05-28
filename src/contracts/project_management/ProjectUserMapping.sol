//SPDX-License-Identifier: MIT

pragma solidity ^0.8;
// pragma experimental ABIEncoderV2;
import "./Project.sol";
import "./SubProject.sol";
import "./Task.sol";
 

contract ProjectUserMapping {
        uint256 private count;
        Project _projectAccessor;
        SubProject _subprojectAccessor;
        Task _taskAccessor;

    constructor(address _projectAddress, address _subProjectAddress, address _taskAddress) {
        count = 0;
        _projectAccessor = Project(_projectAddress);
        _subprojectAccessor = SubProject(_subProjectAddress);
        _taskAccessor = Task(_taskAddress);
    }
    // constructor() {
    //     count = 0;
    // }
    struct MappingInfo {
        uint256 projectId;
        string financialOfficerUsername;
        string projectManagerUsernmae;
        string budgetAndProcurementManagerUsername;
        string externalAuditorUsername;
    }

    event ProjectMapped (
        uint256 projectId,
        string financialOfficerUsername,
        string projectManagerUsernmae,
        string budgetAndProcurementManagerUsername,
        string externalAuditorUsername
    );

    mapping(uint256 => MappingInfo) private userProjectMappings;

    /*
    TODO only technical admin modifier
    This functions used to add project and users mapping to the blocks.
    */
    function addMapping(uint256 projectId, string memory financialOfficerUsername, string memory projectManagerUsernmae, string memory budgetAndProcurementManagerUsername, string memory externalAuditorUsername) public {
        count += 1;
        userProjectMappings[count] = MappingInfo(
            projectId, financialOfficerUsername, projectManagerUsernmae, budgetAndProcurementManagerUsername, externalAuditorUsername
        );
    }

    /*
    As we cannot create dynamic array which we can push to, we should use this function to return the length of projects
    the user is being participated
    */
    function getProjectCount(string memory _username) internal view returns(uint256 length) {
        for (uint256 index = 0; index < count + 1; index++) {
            if(
                    keccak256(abi.encodePacked(userProjectMappings[index].financialOfficerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].budgetAndProcurementManagerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].projectManagerUsernmae)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].externalAuditorUsername)) == keccak256(abi.encodePacked(_username))
                ) {
                    length++;
                }
        }
    }

    /*
    This function returns project using project id
    */
    function getProjectByIdFromMapping(uint256 _id) public view returns (Project.ProjectInfo memory) {
            return _projectAccessor.getProjectById(_id);
    }
    

    /*
    This function returns array of project ids so we can iterate over them and get projects
    */
    function getProjectsListByUsername(string memory _username) public view returns(Project.ProjectInfo[] memory) {
        uint256 length = getProjectCount(_username);
        Project.ProjectInfo[] memory projects = new Project.ProjectInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            if(
                    keccak256(abi.encodePacked(userProjectMappings[index].financialOfficerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].budgetAndProcurementManagerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].projectManagerUsernmae)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].externalAuditorUsername)) == keccak256(abi.encodePacked(_username))
                ) {
                    projects[counter] = getProjectByIdFromMapping(userProjectMappings[index].projectId);
                    counter++;
                    // projects.push(userProjectMappings[index].projectId);
                }
        }
        return projects;
    }

    function getSubProjectListByProjectId(uint256 _projectId) public view returns(SubProject.SubProjectInfo[] memory) {
        return _subprojectAccessor.getSubProjectsListByProjectId(_projectId);
    }

    function getTaskListByProjectId(uint256 _projectId) public view returns(Task.TaskInfo[] memory) {
        return _taskAccessor.getTasksListFromProjectId(_projectId);
    }

    function getTaskListBySubProject(uint256 _projectId) public view returns(Task.TaskInfo[] memory) {
        return _taskAccessor.getTasksListFromSubProjectId(_projectId);
    }

    function getTaskStatusByProjectId(uint256 _projectId) public view returns(uint256 approved, uint256 unapproved) {
        return _taskAccessor.getTaskStatusByProjectId(_projectId);
    }

}
