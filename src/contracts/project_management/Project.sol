// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract Project {
    uint256 private count;
    mapping(string => uint256[]) private donorProjectMappings;

    constructor() {
        count = 0;
    }

    enum ProjectStatus {
        PENDING,
        STARTED,
        COMPLETED,
        CANCELLED,
        PAUSED
    }

    struct ProjectInfo {
        uint256 id;
        string name;
        string description;
        string location;
        uint256 estimatedBudget;
        uint256 fundedMoney;
        uint256 estimatedDuration;
        uint256 createdAt;
        string companyId;
        string accountNumber;
        ProjectStatus status;
        string[] donors;
    }

    event AddedProject(
        uint256 indexed id,
        string indexed name,
        string description,
        string location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        uint256 fundedMoney,
        uint256 createdAt,
        string indexed companyId,
        string accountNumber,
        ProjectStatus status
    );

    event DeletedProject(
        uint256 indexed id,
        string indexed name,
        string description,
        string location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        uint256 fundedMoney,
        uint256 createdAt,
        string indexed companyId,
        string accountNumber,
        ProjectStatus status
    );

    mapping(uint256 => ProjectInfo) private projects;

    function getProjectsCount() public view returns (uint256) {
        return count;
    }

    function getDonatedProjectsByUsername(string memory _username)
        public
        view
        returns (ProjectInfo[] memory)
    {
        uint256 length = donorProjectMappings[_username].length;
        ProjectInfo[] memory projectInfo = new ProjectInfo[](count);

        uint256 c = 0;
        for (uint256 index = 0; index < length; index++) {
            projectInfo[c] = projects[donorProjectMappings[_username][index]];
            c++;
        }
        return projectInfo;
    }

    function getProjectStatus()
        public
        view
        returns (uint256 donated, uint256 needed)
    {
        for (uint256 index = 0; index < count; index++) {
            donated += projects[index].fundedMoney;
            needed += projects[index].estimatedBudget;
        }
    }

    // add onlyTechnicalAdmin modifier to it
    function addProject(
        string memory name,
        string memory description,
        string memory location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        string memory companyId,
        string memory accountNumber
    ) public {
        count++;

        string[] memory emptyList;

        projects[count] = ProjectInfo(
            count,
            name,
            description,
            location,
            estimatedBudget,
            0,
            estimatedDuration,
            block.timestamp * 1000,
            companyId,
            accountNumber,
            ProjectStatus.PENDING,
            emptyList
        );
        emit AddedProject(
            count,
            name,
            description,
            location,
            estimatedBudget,
            estimatedDuration,
            0,
            block.timestamp * 1000,
            companyId,
            accountNumber,
            ProjectStatus.PENDING
        );
    }

    function getPatientByDonorName(string memory _donorUsername) public {}

    function addPaymentInfo(
        uint256 _projectId,
        uint256 _amount,
        string memory _donorUsername
    ) public {
        projects[_projectId].fundedMoney += _amount;
        projects[_projectId].donors.push(_donorUsername);
        donorProjectMappings[_donorUsername].push(_projectId);
    }

    function refundMoney(uint256 _projectId, uint256 _amount) public {
        projects[_projectId].fundedMoney -= _amount;
        // projects[_projectId].donors.push(_donorUsername);
        // donorProjectMappings[_donorUsername].push(_projectId);
    }

    function deleteProject(uint256 _id) public {
        delete projects[_id];
    }

    //TODO - when a user asks for projects return subproject and tasks tied
    function getProjectById(uint256 _id)
        public
        view
        returns (ProjectInfo memory)
    {
        return projects[_id];
    }

    /*
    This function returns array of subprojects so we can iterate over them
    */
    function getAllProjects() public view returns (ProjectInfo[] memory) {
        uint256 length;
        for (uint256 index = 0; index < count + 1; index++) {
            if (projects[index].id != 0) {
                length++;
            }
        }
        ProjectInfo[] memory sp = new ProjectInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            sp[counter] = projects[index];
            counter++;
        }
        return sp;
    }
}
