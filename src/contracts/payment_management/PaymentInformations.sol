// SPDX-License-Identifier: MIT

pragma solidity ^0.8;
pragma experimental ABIEncoderV2;

contract PaymentInformations {
    uint256 count;

    struct PaymentInfo {
        string donorUsername;
        string projectId;
        uint256 amount;
        uint256 donatedAt;
    }

    event AddedPayment(
        string indexed donorUsername,
        string indexed projectId,
        uint256 amount,
        uint256 donatedAt
    );

    event RefundedPayment(
        string indexed donorUsername,
        string indexed projectId,
        uint256 amount,
        uint256 donatedAt
    );

    mapping(uint256 => PaymentInfo) public payments;

    //add only donor modifier
    function addPaymentInfo(
        string memory donorUsername,
        string memory projectId,
        uint256 amount,
        uint256 donatedAt
    ) external {
        payments[++count] = PaymentInfo(
            donorUsername,
            projectId,
            amount,
            donatedAt
        );
        emit AddedPayment(donorUsername, projectId, amount, donatedAt);
    }

    function deletePaymentInfo(uint256 id) external {
        delete payments[id];
    }

    function getPaymentInfoCountByUsername(string memory _username)
        internal
        view
        returns (uint256 length)
    {
        for (uint256 index = 0; index < count + 1; index++) {
            if (
                keccak256(abi.encodePacked(payments[index].donorUsername)) ==
                keccak256(abi.encodePacked(_username))
            ) {
                length++;
            }
        }
    }

    //add only donor modifier
    function getPaymentInfoByUsername(string memory _username)
        external
        view
        returns (PaymentInfo[] memory)
    {
        uint256 length = getPaymentInfoCountByUsername(_username);
        PaymentInfo[] memory ft = new PaymentInfo[](length);
        uint256 counter = 0;
        for (uint256 index = 1; index < count + 1; index++) {
            if (
                keccak256(abi.encodePacked(payments[index].donorUsername)) ==
                keccak256(abi.encodePacked(_username))
            ) {
                ft[counter] = payments[index];
                counter++;
            }
        }
        return ft;
    }
}
