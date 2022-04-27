// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Task {
    uint256 count;

    enum TaskStatus {
        CREATED,
        ALLOCATED_BY_FINANCIAL_MANAGER,

        APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER,
        APPROVED_BY_PROJECT_MANAGER,
        APPROVED_BY_EXTERNAL_AUDITOR,

        REJECTED_BY_BUDGET_AND_PROCUREMENT_MANAGER,
        REJECTED_BY_PROJECT_MANAGER,
        REJECTED_BY_EXTERNAL_AUDITOR
    }

    struct TaskInfo {
        uint256 id;
        string name;
        string description;
        uint256 projectId;
        uint256 subProjectId;
        uint256 estimatedDuration;
        TaskStatus status;
        uint256 allocatedBudget;
        string remark;
    }

    mapping(uint256 => TaskInfo) public tasks;

    event AddedTask(
        uint256 indexed id,
        string indexed name,
        string description,
        uint256 indexed projectId,
        uint256 subProjectId,
        uint256 estimatedDuration,
        string status,
        uint256 allocatedBudget
    );

    event ChangeedTaskStatus(
        uint256 indexed taskid,
        TaskStatus from,
        TaskStatus to,
        uint256 indexed date,
        address indexed changedBy
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
            count,
            name,
            description,
            projectId,
            subProjectId,
            estimatedDuration,
            TaskStatus.CREATED,
            0,
            ''
        );
        emit AddedTask(
            count,
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
        uint256 taskid,
        uint256 allocatedBudget
    ) external {
        tasks[taskid].allocatedBudget = allocatedBudget;
        tasks[taskid].status = TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER;
        emit ChangeedTaskStatus(taskid ,TaskStatus.CREATED, TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER, block.timestamp, msg.sender);
    }

    function budgetAndProcurementManagerApproveTaskCompletion(uint256 taskid)
        external
    {
        tasks[taskid].status = TaskStatus.APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER;
        emit ChangeedTaskStatus(taskid ,TaskStatus.CREATED, TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER, block.timestamp, msg.sender);
    }

    function projectManagerApproveTaskCompletion(uint256 taskid) external {}

    function externalAuditorApproveTaskCompletion(uint256 taskid) external {}

    function deleteTask(uint256 id) external {
        delete tasks[id];
    }
}
