// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {
    uint256 count;

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
        string financialOfficerUsername,
        string projectManagerUsernmae,
        string budgetAndProcurementManagerUsername,
        string externalAuditorUsername
    }

    event AddedProject(
        uint256 indexed id,
        string indexed name,
        string description,
        string indexed location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        uint256 fundedMoney,
        uint256 createdAt,
        string indexed companyId,
        string accountNumber,
        ProjectStatus status,
        string financialOfficerUsername,
        string projectManagerUsernmae,
        string budgetAndProcurementManagerUsername,
        string externalAuditorUsername
    );

    event DeletedProject(
        uint256 indexed id,
        string name,
        string description,
        string location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        uint256 fundedMoney,
        uint256 createdAt,
        string indexed companyId,
        string accountNumber,
        ProjectStatus status,
        string financialOfficerUsername,
        string projectManagerUsernmae,
        string budgetAndProcurementManagerUsername,
        string externalAuditorUsername
    );

    mapping(uint256 => ProjectInfo) public projects;

    //add onlyTechnicalAdmin modifier to it
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
        ProjectStatus status,
        string memory financialOfficerUsername,
        string memory projectManagerUsernmae,
        string memory budgetAndProcurementManagerUsername,
        string memory externalAuditorUsername
    ) external {
        projects[++count] = ProjectInfo(
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
            status,
            financialOfficerUsername,
            projectManagerUsernmae,
            budgetAndProcurementManagerUsername,
            externalAuditorUsername
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
            status,
            financialOfficerUsername,
            projectManagerUsernmae,
            budgetAndProcurementManagerUsername,
            externalAuditorUsername
        );
    }

    function deleteProject(uint256 _id) external {
        delete projects[_id];
        //TODO emit deleted project event after arranging the project struct
    }
}
