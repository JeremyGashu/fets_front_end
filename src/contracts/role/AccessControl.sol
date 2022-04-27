// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract AccessControl {
    event GrantRole(bytes32 indexed role, address indexed account);
    event RevokeRole(bytes32 indexed role, address indexed account);

    mapping(bytes32 => mapping(address => bool)) public roles;

    bytes32 private TECHNICAL_ADMIN = keccak256(abi.encodePacked('TEHNICAL_ADMIN'));
    bytes32 private PROJECT_MANAGER = keccak256(abi.encodePacked('PROJECT_MANAGER'));
    bytes32 private FINCANCIAL_OFFICER = keccak256(abi.encodePacked('FINCANCIAL_OFFICER'));
    bytes32 private BUDGET_PROCUREMENT_MANAGER = keccak256(abi.encodePacked('BUDGET_PROCUREMENT_MANAGER'));
    bytes32 private EXTERNAL_AUDITOR = keccak256(abi.encodePacked('EXTERNAL_AUDITOR'));

    
}
