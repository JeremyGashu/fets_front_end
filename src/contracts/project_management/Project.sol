// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {
    uint256 public count;

    struct ProjectInfo {
        uint256 id;
        string name;
        string description;
        string location;
        uint256 estimatedBudget;
        uint256 estimatedDuration;
        string companyId;
        string accountNumber;
        bool status;
        address financialOfficerAddress;
        address projectManagerAddress;
        address budgetAndProcurementManagerAddress;
        address externalAuditorAddress;
    }

    event AddedProject(
        uint256 indexed id,
        string name,
        string description,
        string location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        string indexed companyId,
        string accountNumber,
        bool status,
        address financialOfficerAddress,
        address projectManagerAddress,
        address budgetAndProcurementManagerAddress,
        address externalAuditorAddress
    );

    event DeletedProject(
        uint256 indexed id,
        string name,
        string description,
        string location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        string indexed companyId,
        string accountNumber,
        bool status,
        address financialOfficerAddress,
        address projectManagerAddress,
        address budgetAndProcurementManagerAddress,
        address externalAuditorAddress
    );

    mapping(uint256 => ProjectInfo) projects;

    //add onlyTechnicalAdmin modifier to it
    function addProject(
        string memory name,
        string memory description,
        string memory location,
        uint256 estimatedBudget,
        uint256 estimatedDuration,
        string memory companyId,
        string memory accountNumber,
        bool status,
        address financialOfficerAddress,
        address projectManagerAddress,
        address budgetAndProcurementManagerAddress,
        address externalAuditorAddress
    ) external {
        projects[++count] = ProjectInfo(
            count,
            name,
            description,
            location,
            estimatedBudget,
            estimatedDuration,
            companyId,
            accountNumber,
            status,
            financialOfficerAddress,
            projectManagerAddress,
            budgetAndProcurementManagerAddress,
            externalAuditorAddress
        );

        emit AddedProject(
            count,
            name,
            description,
            location,
            estimatedBudget,
            estimatedDuration,
            companyId,
            accountNumber,
            status,
            financialOfficerAddress,
            projectManagerAddress,
            budgetAndProcurementManagerAddress,
            externalAuditorAddress
        );
    }

    function deleteProject(uint256 _id) external {
        delete projects[_id];
    }
}
