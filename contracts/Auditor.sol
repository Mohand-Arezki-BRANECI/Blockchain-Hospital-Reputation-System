// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./ManagerHospital.sol";

contract AuditorContract {

    ManagerHospital public hospitalManager;
    address public principalAuditor;

    struct Auditor {
        string firstName;
        string lastName;
        uint auditorNumber;
        string company;
        address wallet;
    }
    struct AuditError {
        address patientAddress;
        address hospitalAddress;
        string auditResult;
        uint auditDate;
    }
    

    mapping(address => Auditor) public auditors;
    AuditError[] public audits;

    constructor(address _managerAddress) {
        principalAuditor = msg.sender;
        hospitalManager = ManagerHospital(_managerAddress);
    }

    modifier onlyAuditor() {
        require(msg.sender == principalAuditor, "Only the principal auditor can call this function");
        _;
    }

    function addAuditor(string memory _firstName, string memory _lastName, uint _auditorNumber, string memory _company, address _wallet
    ) public onlyAuditor {
        auditors[_wallet] = Auditor(_firstName, _lastName, _auditorNumber, _company, _wallet);
    }

    function revokeAuditor(address _wallet) public onlyAuditor {
        require(auditors[_wallet].wallet != address(0), "Auditor does not exist");
        delete auditors[_wallet];
    }

    function auditError(address _patient, address _hospital, bool isValidated) public {
        string memory result = isValidated ? "validated" : "rejected";

        audits.push(AuditError({
            patientAddress: _patient,
            hospitalAddress: _hospital,
            auditResult: result,
            auditDate: block.timestamp
        }));

        hospitalManager.setScoreFromAuditor(_hospital, isValidated);
    }
}
