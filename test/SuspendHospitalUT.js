const { expect } = require("chai");

describe("HospitalSuspensionUT", function () {
  let managerContract;
  let owner, hospital;

  beforeEach(async () => {
    [owner, hospital] = await ethers.getSigners();
    const Manager = await ethers.getContractFactory("ManagerHospital");
    managerContract = await Manager.connect(owner).deploy();

    // Register the hospital
    await managerContract.connect(hospital).registerHospital("Hospital_SuspendTest");
  });

  it("It must suspend a hospital after 5 complaints", async function () {
    for (let i = 0; i < 5; i++) {
      await managerContract.connect(owner).updateHospitalScore(hospital.address, true);
    }

    const hospitalData = await managerContract.hospitals(hospital.address);
    expect(hospitalData.score).to.equal(-5);
    expect(hospitalData.status).to.equal(1); // Status.Suspended
  });
});
