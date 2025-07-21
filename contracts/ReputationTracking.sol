/*// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auditor.sol";

contract ReputationTracking {
    struct Reputation {
        address hospital;
        int[] scores;
        uint[] dates;
    }

    AuditorContract auditorContract;

    mapping(address => Reputation) public reputations;

    constructor(address _auditeurAddress) {
        auditorContract = AuditorContract(_auditeurAddress);
    }

    function getHospitalErrorHistory(address _hospital) public view returns (AuditorContract.AuditError[])
    {
        AuditorContract.AuditError[] auditErrors = new AuditorContract.AuditError[](0);
        for (uint i = 0; i < auditorContract.audits.length; i++) {

            if ((auditorContract.audits[i].hospitalAddress == _hospital) && auditorContract.audits[i].auditResult == "validated")
            {
                auditErrors.push(auditorContract.audits[i]);
            }
        }

        return auditErrors;
    }

    // function getScoreHistory(address _hospital) public view returns (int[] scoreHistory)
    // {

    // }
}
*/