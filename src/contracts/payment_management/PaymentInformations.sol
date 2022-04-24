// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract PaymentInformations {

    uint256 counter;
    
    struct PaymentInfo {
        string donorUsername;
        string projectId;
        uint256 amount;
        uint256 donatedAt;
    }

    event AddedPayment {
        string indexed donorUsername,
        string indexed projectId,
        uint256 amount,
        uint256 donatedAt,
    }

    mapping(uint256 => PaymentInfo) public payments;

    function addPaymentInfo(string memory donorUsername, string memory projectId, uint256 amount, uint256 donatedAt) external {
        payments[++counter] = PaymentInfo(donorUsername, projectId, amount, donatedAt);
        emit AddedPayment(donorUsername, projectId, amount, donatedAt);
    }
}
