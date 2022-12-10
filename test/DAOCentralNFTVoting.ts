import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAOCentralNFTVoting } from "../typechain-types";
import { deployContract } from "./utils";

describe("DAOCentralNFTVoting", () => {
  const fixtures = async () => {
    const [owner, user1] = await ethers.getSigners();

    const organizationName = "Organization";

    const DAOCentralNFTVoting = await deployContract<DAOCentralNFTVoting>(
      "DAOCentralNFTVoting",
      [organizationName, owner.address],
      owner
    );

    return { DAOCentralNFTVoting, owner, user1, organizationName };
  };

  describe("Deployment", () => {
    it("should be deployed with correct params", async () => {
      const { DAOCentralNFTVoting, owner, organizationName } =
        await loadFixture(fixtures);

      const currentOwner = await DAOCentralNFTVoting.owner();
      expect(currentOwner).to.be.eql(owner.address);

      const proposalsCount = await DAOCentralNFTVoting.proposalsCount();
      expect(proposalsCount).to.be.equal(0);

      const currentOrganizationName =
        await DAOCentralNFTVoting.organizationName();
      expect(currentOrganizationName).to.be.equal;
    });
  });

  describe("Adding proposal", () => {
    it("should revert when no owner tries add new proposal", async () => {
      const { DAOCentralNFTVoting, user1 } = await loadFixture(fixtures);

      const timestamp = await time.latest();

      const addingTx = DAOCentralNFTVoting.connect(user1).addProposal(
        "Proposal #1",
        timestamp,
        timestamp + 10
      );
      await expect(addingTx).to.be.rejectedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should revert when passed start time is from past", async () => {
      const { DAOCentralNFTVoting, user1, owner } = await loadFixture(fixtures);

      const timestamp = await time.latest();

      const addingTx = DAOCentralNFTVoting.connect(owner).addProposal(
        "Proposal #1",
        timestamp - 10,
        timestamp + 10
      );
      await expect(addingTx).to.be.revertedWithCustomError(
        DAOCentralNFTVoting,
        "InvalidStartTime"
      );
    });

    it("should revert when passed end time is before start time", async () => {
      const { DAOCentralNFTVoting, user1, owner } = await loadFixture(fixtures);

      const timestamp = await time.latest();

      const addingTx = DAOCentralNFTVoting.connect(owner).addProposal(
        "Proposal #1",
        timestamp + 30,
        timestamp + 10
      );
      await expect(addingTx).to.be.revertedWithCustomError(
        DAOCentralNFTVoting,
        "InvalidEndTime"
      );
    });

    it("should allow to add new proposal", async () => {
      const { DAOCentralNFTVoting, owner } = await loadFixture(fixtures);

      const timestamp = await time.latest();
      const proposalDescription = "Proposal #1";
      const startTime = timestamp + 10;
      const endTime = timestamp + 20;

      const addingTx = DAOCentralNFTVoting.connect(owner).addProposal(
        proposalDescription,
        startTime,
        endTime
      );

      const newProposalId = 1;

      await expect(addingTx)
        .emit(DAOCentralNFTVoting, "NewProposal")
        .withArgs(newProposalId);

      const proposalCount = await DAOCentralNFTVoting.proposalsCount();
      expect(proposalCount).to.be.equal(newProposalId);

      const proposal = await DAOCentralNFTVoting.proposals(1);
      expect(proposal.description).to.be.equal(proposalDescription);
      expect(proposal.startTime).to.be.equal(startTime);
      expect(proposal.endTime).to.be.equal(endTime);
      expect(proposal.approvals).to.be.equal(0);
      expect(proposal.denials).to.be.equal(0);
    });
  });
});
