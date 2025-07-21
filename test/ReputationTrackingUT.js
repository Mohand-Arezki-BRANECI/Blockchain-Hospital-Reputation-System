/*const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReputationTracking", function () {
  let ManagerHospital, managerHospital;
  let AuditorContract, auditorContract;
  let ReputationTracking, reputationTracking;
  let owner, auditor, hospital, patient;

  beforeEach(async () => {
    [owner, auditor, hospital, patient] = await ethers.getSigners();

    // 1) Deploy ManagerHospital
    ManagerHospital = await ethers.getContractFactory("ManagerHospital");
    managerHospital = await ManagerHospital.deploy();
    await managerHospital.waitForDeployment();

    // register hospital
    await managerHospital.connect(hospital).registerHospital("Test Hospital");

    // 2) Deploy AuditorContract
    AuditorContract = await ethers.getContractFactory("AuditorContract");
    auditorContract = await AuditorContract.deploy(await managerHospital.getAddress());
    await auditorContract.waitForDeployment();

    // 3) principal auditor valide une erreur
    await auditorContract.auditError(
      patient.address,
      hospital.address,
      true // isValidated
    );

    // 4) Deploy ReputationTracking
    ReputationTracking = await ethers.getContractFactory("ReputationTracking");
    reputationTracking = await ReputationTracking.deploy(
      await auditorContract.getAddress()
    );
    await reputationTracking.waitForDeployment();
  });

  it("retourne l’historique des erreurs validées pour un hôpital", async () => {
    // 5) Call getHospitalErrorHistory
    const errors = await reputationTracking.getHospitalErrorHistory(
      hospital.address
    );

    // On attend exactement 1 auditError
    expect(errors.length).to.equal(1);

    // Vérifie le contenu (id, description… selon ton struct)
    const error = errors[0];
    expect(error.patientAddress).to.equal(patient.address);
    expect(error.date).to.be.gt(0); // exemple : champ date > 0
  });

  it("retourne un tableau vide si aucun audit validé", async () => {
    const otherHospital = (await ethers.getSigners())[4];
    const errors = await reputationTracking.getHospitalErrorHistory(
      otherHospital.address
    );
    expect(errors.length).to.equal(0);
  });
});
*/