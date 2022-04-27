// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
pragma experimental ABIEncoderV2;

contract PaymentInformations {

    uint256 count;
    
    struct PaymentInfo {
        string donorUsername;
        string projectId;
        uint256 amount;
        uint256 donatedAt;
    }

    event AddedPayment (
        string indexed donorUsername,
        string indexed projectId,
        uint256 amount,
        uint256 donatedAt
    );

    event DeletedPaymentInfo (
        string indexed donorUsername,
        string indexed projectId,
        uint256 amount,
        uint256 donatedAt
    );

    mapping(uint256 => PaymentInfo) public payments;

    //add only donor modifier
    function addPaymentInfo(string memory donorUsername, string memory projectId, uint256 amount, uint256 donatedAt) external {
        payments[++count] = PaymentInfo(donorUsername, projectId, amount, donatedAt);
        emit AddedPayment(donorUsername, projectId, amount, donatedAt);
    }

    function deletePaymentInfo(uint256 id) external {
        delete payments[id];
    }

        //add only donor modifier
    function getPaymentInfoByUsername(string memory _username) external returns(PaymentInfo[] memory) {
        PaymentInfo[] memory paymentInfos;
        uint256 counter = 0;
        for (uint256 index = 0; index < count; index++) {
            if(payments[index].donatedAt != 0) {
                if(keccak256(abi.encodePacked(payments[index].donorUsername)) == keccak256(abi.encodePacked(_username))) {
                    paymentInfos[counter] = payments[index];
                    counter++;
                }
            }
        }
        return paymentInfos;
    }
}


