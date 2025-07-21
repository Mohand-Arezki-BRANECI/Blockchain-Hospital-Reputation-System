const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("reportMedicalErrorUT", function () {
  let patientContract;
  let admin, patient1;

  beforeEach(async () => {
    [admin, patient1] = await ethers.getSigners();
    const Patient = await ethers.getContractFactory("Patient");
    patientContract = await Patient.connect(admin).deploy();
    await patientContract.waitForDeployment();
  });


it("should let an authorized patient report a medical error with correct data", async function () {
  // Step 1: Register the patient
  await patientContract.connect(admin).registerPatient(patient1.address, "Smith", "Alice", "456 Avenue");

  // Step 2: Patient reports an error
  const description = "Wrong medication prescribed";
  const hospitalId = 42;

  const tx = await patientContract.connect(patient1).reportMedicalError(hospitalId, description);
  await tx.wait();

  // Step 3: Retrieve the errors for the given hospital
  const errors = await patientContract.getErrorByHopital(hospitalId);

  // Step 4: Assertions
  expect(errors.length).to.equal(1);
  const error = errors[0];

  expect(error.idHopital).to.equal(hospitalId);
  expect(error.idPatient).to.equal(patient1.address);
  expect(error.description).to.equal(description);
  expect(error.timestamp).to.be.gt(0); // timestamp should be > 0
  });
});
