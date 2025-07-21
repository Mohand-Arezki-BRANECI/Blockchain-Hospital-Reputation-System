const { expect } = require("chai");

describe("HospitalAdditionUT", function () {
  let managerContract;
  let owner, hospital;

  beforeEach(async () => {
    [owner, hospital] = await ethers.getSigners();
    const Manager = await ethers.getContractFactory("ManagerHospital");
    managerContract = await Manager.connect(hospital).deploy();
  });

  it("It must register a hospital", async function () {
    await managerContract.connect(hospital).registerHospital("Hospital_1");
    const hospitalData = await managerContract.hospitals(hospital.address);
    expect(hospitalData.name).to.equal("Hospital_1"); // fixed typo here
    expect(hospitalData.score).to.equal(0);
    expect(hospitalData.status).to.equal(0); // 0 corresponds to Status.Active
  });
});
