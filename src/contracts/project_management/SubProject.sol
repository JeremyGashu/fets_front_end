// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import './Project.sol';

contract SubProject {
    uint256 private count;

    struct SubProjectInfo {
        uint256 id;
        string name;
        string description;
        uint256 projectId;
        uint256 estimatedDuration;
        uint256 createdAt;
    }

    mapping(uint256 => SubProjectInfo) private subprojects;

    event AddedSubProject(
        uint256 indexed id,
        string indexed name,
        string description,
        uint256 indexed projectId,
        uint256 estimatedDuration,
        uint256 createdAt
    );

    function addSubProject(
        string memory name,
        string memory description,
        uint256 projectId,
        uint256 estimatedDuration,
        uint256 createdAt
    ) public {
        count++;
        
        subprojects[count] = SubProjectInfo(
            count,
            name,
            description,
            projectId,
            estimatedDuration,
            createdAt
        );
        
        emit AddedSubProject(
            count,
            name,
            description,
            projectId,
            estimatedDuration,
            createdAt
        );
    }

    function getSubProjectById(uint256 _id) public view returns(uint256 id,
        string memory name,
        string memory description,
        uint256 projectId,
        uint256 estimatedDuration,
        uint256 createdAt) {
            SubProjectInfo memory subproject = subprojects[_id];
            id = _id;
            name = subproject.name;
            description = subproject.description;
            projectId = subproject.projectId;
            estimatedDuration = subproject.estimatedDuration;
            createdAt = subproject.createdAt;
        }
        
    /*
    This functions deletes sub projects that have been saved in the ledger
    Needs only  project manager or technical admin authorization
    */
    function deleteSubProject(uint256 id) public {
        delete subprojects[id];
    }

    /*
    As we cannot create dynamic array which we can push to, we should use this function to return the 
    length of subprojects with a given project id.    
    */
    function getSubProjectCount(uint256 _id) internal view returns(uint256 length) {
        for (uint256 index = 0; index < count + 1; index++) {
            if(subprojects[index].projectId == _id) {
                    length++;
                }
        }
    }
    

    /*
    This function returns array of project ids so we can iterate over them and get projects
    */
    function getSubProjectsListByProjectId(uint256 _id) public view returns(SubProjectInfo[] memory) {
        uint256 length = getSubProjectCount(_id);
        SubProjectInfo[] memory sp = new SubProjectInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            if(subprojects[index].projectId == _id) {
                    sp[counter] = subprojects[index];
                    counter++;
                }
        }
        return sp;
    }
}
