//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
pragma experimental ABIEncoderV2;

contract ProjectUserMapping {
    uint256 public count;
    struct MappingInfo {
        uint256 projectId;
        string financialOfficerUsername;
        string projectManagerUsernmae;
        string budgetAndProcurementManagerUsername;
        string externalAuditorUsername;
    }

    event ProjectMapped (
        uint256 projectId,
        string financialOfficerUsername,
        string projectManagerUsernmae,
        string budgetAndProcurementManagerUsername,
        string externalAuditorUsername
    );

    mapping(uint256 => MappingInfo) public userProjectMappings;

    //TODO only technical admin modifier
    function addMapping(uint256 projectId, string memory financialOfficerUsername, string memory projectManagerUsernmae, string memory budgetAndProcurementManagerUsername, string memory externalAuditorUsername) external {
        userProjectMappings[++count] = MappingInfo(
            projectId, financialOfficerUsername, projectManagerUsernmae, budgetAndProcurementManagerUsername, externalAuditorUsername
        );
    }

    function getProjectsByUsername(string memory _username) external returns(uint256[] memory) {
        uint256[] memory projects;
        uint256 counter = 0;
        for (uint256 index = 0; index < count; index++) {
            if(userProjectMappings[index].projectId != 0) {
                if(
                    keccak256(abi.encodePacked(userProjectMappings[index].financialOfficerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].budgetAndProcurementManagerUsername)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].projectManagerUsernmae)) == keccak256(abi.encodePacked(_username)) ||
                    keccak256(abi.encodePacked(userProjectMappings[index].externalAuditorUsername)) == keccak256(abi.encodePacked(_username))
                ) {
                    projects[counter] = userProjectMappings[index].projectId;
                    counter++;
                }
            }
        }
        return projects;
    }
}
