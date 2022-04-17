// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract SubProject {
    uint256 public count;

    struct SubProjectInfo {
        string name;
        string description;
        uint projectId;
        uint256 estimatedDuration;
    }

    mapping(uint256 => SubProjectInfo) subprojects;

    event AddedSubProject(
        string name,
        string description,
        uint projectId,
        uint256 estimatedDuration
    );

    function addSubProject(
        string memory name,
        string memory description,
        uint projectId,
        uint256 estimatedDuration
    ) external {
        subprojects[++count] = SubProjectInfo(
            name,
            description,
            projectId,
            estimatedDuration
        );
        emit AddedSubProject(name, description, projectId, estimatedDuration);
    }

    function deleteProject(uint256 id) external {
        delete subprojects[id];
    }
}
