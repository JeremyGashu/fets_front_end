// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import './Project.sol';

contract SubProject {
    uint256 count;

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
    ) external {
        subprojects[count] = SubProjectInfo(
            count,
            name,
            description,
            projectId,
            estimatedDuration,
            createdAt
        );
        count++;
        emit AddedSubProject(
            count,
            name,
            description,
            projectId,
            estimatedDuration,
            createdAt
        );
    }

    function getSubProjectById(uint256 _id) external view returns(uint256 id,
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

    function deleteProject(uint256 id) external {
        delete subprojects[id];
    }
}
