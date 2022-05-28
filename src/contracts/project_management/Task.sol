// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract Task {
    uint256 private count;

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
        uint256 createdAt;
    }

    mapping(uint256 => TaskInfo) private tasks;

    event AddedTask(
        uint256 indexed id,
        string indexed name,
        string description,
        uint256 indexed projectId,
        uint256 subProjectId,
        uint256 estimatedDuration,
        TaskStatus status,
        uint256 allocatedBudget,
        uint256 createdAt
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

    /*
    Function to add new task to the BC providing all useful info.
    */
    function addTask(
        string memory name,
        string memory description,
        uint256 projectId,
        uint256 subProjectId,
        uint256 estimatedDuration,
        uint256 allocatedBudget
    ) public {
        count++;
        tasks[count] = TaskInfo(
            count,
            name,
            description,
            projectId,
            subProjectId,
            estimatedDuration,
            TaskStatus.CREATED,
            0,
            '',
            block.timestamp
        );
        
        emit AddedTask(
            count,
            name,
            description,
            projectId,
            subProjectId,
            estimatedDuration,
            TaskStatus.CREATED,
            allocatedBudget,
            block.timestamp
        );
    }

    //TODO add modifier to check whether the sender is financial manager of a specific project
    //TODO add modifier to check wheather the money is valid or not
    function financialManagerSubmitBudgetAllocation(
        uint256 taskid,
        uint256 allocatedBudget
    ) public {
        tasks[taskid].allocatedBudget = allocatedBudget;
        tasks[taskid].status = TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER;
        emit ChangeedTaskStatus(taskid ,TaskStatus.CREATED, TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER, block.timestamp, msg.sender);
    }

    function budgetAndProcurementManagerApproveTaskCompletion(uint256 _taskId)
        public
    {
        tasks[_taskId].status = TaskStatus.APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER;
        emit ChangeedTaskStatus(_taskId ,TaskStatus.ALLOCATED_BY_FINANCIAL_MANAGER, TaskStatus.APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER, block.timestamp, msg.sender);
    }

    function projectManagerApproveTaskCompletion(uint256 _taskId) public {
        tasks[_taskId].status = TaskStatus.APPROVED_BY_PROJECT_MANAGER;
        emit ChangeedTaskStatus(_taskId ,TaskStatus.APPROVED_BY_BUDGET_AND_PROCUREMENT_MANAGER, TaskStatus.APPROVED_BY_PROJECT_MANAGER, block.timestamp, msg.sender);
    }

    function externalAuditorApproveTaskCompletion(uint256 _taskId) public {
         tasks[_taskId].status = TaskStatus.APPROVED_BY_EXTERNAL_AUDITOR;
        emit ChangeedTaskStatus(_taskId ,TaskStatus.APPROVED_BY_PROJECT_MANAGER, TaskStatus.APPROVED_BY_EXTERNAL_AUDITOR, block.timestamp, msg.sender);
    }

    function deleteTask(uint256 _taskId) public {
        delete tasks[_taskId];
    }

    function getTaskById(uint256 _taskId) public view returns(TaskInfo memory) {
        return tasks[_taskId];
    }

    /*
    As we cannot create dynamic array which we can push to, we should use this function to return the 
    length of tasks with a given project id.    
    */
    function getTasksCountByProjectId(uint256 _projectId) internal view returns(uint256 length) {
        for (uint256 index = 0; index < count + 1; index++) {
            if(tasks[index].projectId == _projectId) {
                    length++;
                }
        }
    }

    /*
    As we cannot create dynamic array which we can push to, we should use this function to return the 
    length of tasks with a given project id.    
    */
    function getTasksCountBySubProjectId(uint256 _subProjectId) internal view returns(uint256 length) {
        for (uint256 index = 0; index < count + 1; index++) {
            if(tasks[index].subProjectId == _subProjectId) {
                    length++;
                }
        }
    }
    

    /*
    This function returns array of tasks that belong to one project
    */
    function getTasksListFromProjectId(uint256 _projectId) public view returns(TaskInfo[] memory) {
        uint256 length = getTasksCountByProjectId(_projectId);
        TaskInfo[] memory ft = new TaskInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            if(tasks[index].projectId == _projectId) {
                    ft[counter] = tasks[index];
                    counter++;
                }
        }
        return ft;
    }

    /*
    This function returns array of tasks that belongs to one subproject
    */
    function getTasksListFromSubProjectId(uint256 _subProjectId) public view returns(TaskInfo[] memory) {
        uint256 length = getTasksCountBySubProjectId(_subProjectId);
        TaskInfo[] memory ft = new TaskInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            if(tasks[index].subProjectId == _subProjectId) {
                    ft[counter] = tasks[index];
                    counter++;
                }
        }
        return ft;
    }

    /*
    Function to return status of completed and in progress tasks by project id
    */
    function getTaskStatusByProjectId(uint256 _projectId) public view returns(uint256 approved, uint256 unapproved) {
        for (uint256 i = 1; i <= count; i++) {
            if(tasks[i].status == TaskStatus.APPROVED_BY_PROJECT_MANAGER && tasks[i].projectId == _projectId) {
                approved += 1;
            }
            else if(tasks[i].projectId == _projectId){
                unapproved += 1;
            }
        }
        return (approved, unapproved);
    }

    /*
    Function to return status of completed and in progress tasks by sub-project id
    */
    function getTaskStatusBySubProjectId(uint256 _subProjectId) public view returns(uint256 approved, uint256 unapproved) {
        for (uint256 i = 1; i <= count; i++) {
            if(tasks[i].status == TaskStatus.APPROVED_BY_PROJECT_MANAGER && tasks[i].subProjectId == _subProjectId) {
                approved += 1;
            }
            else if(tasks[i].projectId == _subProjectId){
                unapproved += 1;
            }
        }
        return (approved, unapproved);
    }
}
