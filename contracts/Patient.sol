// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Patient {

    address public admin; 

    struct PatientStruct{
    string firstName;
    string lastName;
    address wallet;
    string physicalAddress;
    }
    
    struct MedicalError {
        uint idHopital;
        address idPatient;
        uint timestamp;
        string description;
    }

    constructor() {
        admin = msg.sender;
    }

    mapping(address => PatientStruct) public patients;
    mapping(address => bool) public isAutorized;
    MedicalError[] public erreurs;

    modifier onlyAdmin{
        require(msg.sender == admin, "Acces reserved to Admin only");
        _;
    }

    modifier onlyPatient() {
        require(isAutorized[msg.sender], "You are not allowed!");
        _;
    }

    // Ajoute un patient avec ses infos
    function registerPatient(address _wallet, string memory _lastName, string memory _firstName, string memory _physicalAddress) public onlyAdmin {
        patients[_wallet] = PatientStruct(_firstName, _lastName, _wallet, _physicalAddress);
        isAutorized[_wallet] = true;
    }

    // Révoque un patient existant
    function revokePatient(address _wallet) public onlyAdmin {
        isAutorized[_wallet] = false;
    }

    // Permet à un patient autorisé de contester une erreur
    function reportMedicalError(uint _idHospital, string memory _description) public onlyPatient {
        erreurs.push(MedicalError(_idHospital, msg.sender, block.timestamp, _description));
    }

    // Récupère toutes les erreurs liées à un hôpital spécifique
    function getErrorByHopital(uint _idHopital) public view returns (MedicalError[] memory) {
        uint count = 0;

        for (uint i = 0; i < erreurs.length; i++) {
            if (erreurs[i].idHopital == _idHopital) {
                count++;
            }
        }

        MedicalError[] memory result = new MedicalError[](count);
        uint index = 0;

        for (uint i = 0; i < erreurs.length; i++) {
            if (erreurs[i].idHopital == _idHopital) {
                result[index] = erreurs[i];
                index++;
            }
        }

        return result;
    
    }

}