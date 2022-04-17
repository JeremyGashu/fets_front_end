// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Task {
    uint256 public count;

    enum TaskStatus {
        CREATED,
        ALLOCATED_BY_FINANCIAL_MANAGER,
        APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER,
        APPROVED_BY_PROJECT_MANAGER,
        APPROVED_BY_EXTERNAL_AUDITOR
    }

    struct TaskInfo {
        string name;
        string description;
        uint256 projectId;
        uint256 subProjectId;
        uint256 estimatedDuration;
        TaskStatus status;
        uint256 allocatedBudget;
    }

    mapping(uint256 => TaskInfo) tasks;

    event AddedTask(
        string name,
        string description,
        uint256 projectId,
        uint256 subProjectId,
        uint256 estimatedDuration,
        string status,
        uint256 allocatedBudget
    );

    modifier statusIs(TaskInfo memory status, uint256 id) {
        require(tasks[id].status == TaskStatus.CREATED);
        _;
    }

    function addTask(
        string memory name,
        string memory description,
        uint256 projectId,
        uint256 subProjectId,
        uint256 estimatedDuration,
        string memory status,
        uint256 allocatedBudget
    ) external {
        tasks[++count] = TaskInfo(
            name,
            description,
            projectId,
            subProjectId,
            estimatedDuration,
            TaskStatus.CREATED,
            0
        );
        emit AddedTask(
            name,
            description,
            projectId,
            subProjectId,
            estimatedDuration,
            status,
            allocatedBudget
        );
    }

    //TODO add modifier to check whether the sender is financial manager of a specific project
    //TODO add modifier to check wheather the money is valid or not
    function financialManagerSubmitBudgetAllocation(
        uint taskid,
        uint allocatedBufget
    ) external {
        
    }

    function budgetAndProcurementManagerApproveTaskCompletion(uint256 taskid)
        external
    {}

    function projectManagerApproveTaskCompletion(uint256 taskid) external {}

    function externalAuditorApproveTaskCompletion(uint256 taskid) external {}

    function deleteTask(uint256 id) external {
        delete tasks[id];
    }
}
