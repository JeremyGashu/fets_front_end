// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract Project {
    uint256 private count;

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

    // add onlyTechnicalAdmin modifier to it
    function addProject(
        string memory name,
        string memory description,
        string memory location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        uint256 fundedMoney,
        uint256 createdAt,
        string memory companyId,
        string memory accountNumber,
        ProjectStatus status
    ) public {
        count++;

        projects[count] = ProjectInfo(
            count,
            name,
            description,
            location,
            estimatedBudget,
            estimatedDuration,
            fundedMoney,
            createdAt,
            companyId,
            accountNumber,
            status
        );
        emit AddedProject(
            count,
            name,
            description,
            location,
            estimatedBudget,
            estimatedDuration,
            fundedMoney,
            createdAt,
            companyId,
            accountNumber,
            status
        );
    }

    function deleteProject(uint256 _id) public {
        delete projects[_id];
    }

    //TODO - when a user asks for projects return subproject and tasks tied
    function getProjectById(uint256 _id) public view returns (ProjectInfo memory){
            return projects[_id];
    }
}
