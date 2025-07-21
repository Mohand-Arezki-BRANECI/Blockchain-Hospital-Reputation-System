const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AuditorContract", function () {
  let AuditorContract, auditorContract;
  let ManagerHospital, managerHospital;
  let owner, auditor, hospital, patient;

  beforeEach(async () => {
    // Get test accounts
    [owner, auditor, hospital, patient] = await ethers.getSigners();

    // Deploy ManagerHospital
    ManagerHospital = await ethers.getContractFactory("ManagerHospital");
    managerHospital = await ManagerHospital.deploy();
    await managerHospital.waitForDeployment();

    // Register a hospital
    await managerHospital.connect(hospital).registerHospital("Test Hospital");

    // Deploy AuditorContract with the address of ManagerHospital
    AuditorContract = await ethers.getContractFactory("AuditorContract");
    auditorContract = await AuditorContract.deploy(managerHospital.getAddress());
    await auditorContract.waitForDeployment();
  });

  it("should allow the principal auditor to audit a medical error", async () => {
    // Call auditError from principal auditor (owner in this case)
    await expect(auditorContract.auditError(
      patient.address,
      hospital.address,
      true // isValidated
    )).to.not.be.reverted;

    // Verify the audit was stored
    const audit = await auditorContract.audits(0);
    expect(audit.patientAddress).to.equal(patient.address);
    expect(audit.hospitalAddress).to.equal(hospital.address);
    expect(audit.auditResult).to.equal("validated");

    // Verify hospital score is updated
    const hospitalData = await managerHospital.hospitals(hospital.address);
    expect(hospitalData.score).to.equal(-1);
  });

  it("should reject auditError if called by someone other than the principal auditor", async () => {
    await expect(
      auditorContract.connect(auditor).auditError(patient.address, hospital.address, false)
    ).to.be.revertedWith("Only the principal auditor can call this function");
  });
});
