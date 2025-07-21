// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ManagerHospital {
    enum Status { Active, Suspended }

    struct Hospital {
        uint id;
        string name;
        address adress;
        int score;
        Status status;
    }

    address private owner;
    uint private hospitalCounter = 0;
    
    mapping(address => Hospital) public hospitals;
    mapping(address => int[]) public scoreHistory;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this taks.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerHospital(string memory _name) public {
        require(hospitals[msg.sender].adress == address(0), "Already registered hospital");
        hospitalCounter++;
        hospitals[msg.sender] = Hospital(hospitalCounter, _name, msg.sender, 0, Status.Active);
        scoreHistory[msg.sender].push(0);
    }

    function updateHospitalScore(address _hospital, bool _complaint) public onlyOwner {
        require(hospitals[_hospital].adress != address(0), "Hospital does not exist.");

        if (_complaint) {
            hospitals[_hospital].score -= 1;
        } else {
            hospitals[_hospital].score += 1;
        }

        scoreHistory[_hospital].push(hospitals[_hospital].score);
        suspendHospital(_hospital); // Automated trigger
    }

    function suspendHospital(address _hospital) internal {
        if (hospitals[_hospital].score <= -5) {
            hospitals[_hospital].status = Status.Suspended;
        }
    }

    function getScoreHistory(address _hospital) public view returns (int[] memory) {
        return scoreHistory[_hospital];
    }

    function setScoreFromAuditor(address _hospital, bool _complaint) public {
    if (hospitals[_hospital].adress == address(0)) revert("Hospital does not exist.");

    if (_complaint) {
        hospitals[_hospital].score -= 1;
    } else {
        hospitals[_hospital].score += 1;
    }

    scoreHistory[_hospital].push(hospitals[_hospital].score);
    suspendHospital(_hospital);
    }

}