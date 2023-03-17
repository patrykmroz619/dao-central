import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DAOCentralNFTVoting, TestNFT } from "../typechain-types";
import { deployContract } from "./utils";

enum Vote {
  NO_VOTE,
  APPROVAL,
  DENIAL,
}

describe("DAOCentralNFTVoting", () => {
  const fixtures = async () => {
    const [owner, user1, user2] = await ethers.getSigners();

    const organizationName = "Organization";

    const TestNFT = await deployContract<TestNFT>("TestNFT", [], owner);

    const DAOCentralNFTVoting = await deployContract<DAOCentralNFTVoting>(
      "DAOCentralNFTVoting",
      [organizationName, TestNFT.address],
      owner
    );

    return {
      DAOCentralNFTVoting,
      TestNFT,
      owner,
      user1,
      user2,
      organizationName,
    };
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
      expect(currentOrganizationName).to.be.equal(organizationName);
    });
  });

  describe("Adding proposal", () => {
    it("should revert when no owner tries to add a new proposal", async () => {
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

    it("should revert when the passed start time is from the past", async () => {
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

    it("should revert when the passed end time is before the start time", async () => {
      const { DAOCentralNFTVoting, owner } = await loadFixture(fixtures);

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

    it("should allow adding a new proposal", async () => {
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

  describe("Voting", () => {
    const fixturesWithProposal = async () => {
      const { DAOCentralNFTVoting, TestNFT, user1, user2, ...restFixtures } =
        await fixtures();

      const timestamp = await time.latest();
      const startTime = timestamp + time.duration.hours(1);
      const endTime = timestamp + time.duration.hours(2);

      await DAOCentralNFTVoting.addProposal("Proposal #1", startTime, endTime);

      const proposal = await DAOCentralNFTVoting.proposals(1);

      await TestNFT.safeMint(user1.address, 1);
      await TestNFT.safeMint(user1.address, 2);
      await TestNFT.safeMint(user1.address, 3);
      await TestNFT.safeMint(user2.address, 4);
      await TestNFT.safeMint(user2.address, 5);
      await TestNFT.safeMint(user2.address, 6);

      return {
        DAOCentralNFTVoting,
        TestNFT,
        proposal,
        user1,
        user2,
        ...restFixtures,
      };
    };

    it("should not allow casting a vote when the user doesn't have NFT with given ID", async () => {
      const { DAOCentralNFTVoting, user1, proposal } = await loadFixture(
        fixturesWithProposal
      );

      const votingTx = DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        0,
        [4]
      );

      await expect(votingTx).to.be.revertedWithCustomError(
        DAOCentralNFTVoting,
        "NotOwnerOfNFT"
      );
    });

    it("should not allow casting more than one vote with single NFT", async () => {
      const { DAOCentralNFTVoting, user1, proposal } = await loadFixture(
        fixturesWithProposal
      );

      const votingTx = DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        1,
        [1, 1]
      );

      await expect(votingTx).to.be.revertedWithCustomError(
        DAOCentralNFTVoting,
        "AlreadyVoted"
      );
    });

    it("should allow casting more than one vote with multiple NFTs", async () => {
      let { DAOCentralNFTVoting, user1, user2, proposal } = await loadFixture(
        fixturesWithProposal
      );

      await DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        Vote.APPROVAL,
        [1, 2, 3]
      );

      proposal = await DAOCentralNFTVoting.proposals(proposal.id);

      expect(proposal.approvals).to.be.equal(3);
      expect(proposal.denials).to.be.equal(0);

      const nftId1Vote = await DAOCentralNFTVoting.votes(proposal.id, 1);
      expect(nftId1Vote).to.be.equal(Vote.APPROVAL);

      const nftId2Vote = await DAOCentralNFTVoting.votes(proposal.id, 2);
      expect(nftId2Vote).to.be.equal(Vote.APPROVAL);

      const nftId3Vote = await DAOCentralNFTVoting.votes(proposal.id, 3);
      expect(nftId3Vote).to.be.equal(Vote.APPROVAL);

      await DAOCentralNFTVoting.connect(user2).castVote(
        proposal.id,
        Vote.DENIAL,
        [4, 5]
      );

      proposal = await DAOCentralNFTVoting.proposals(proposal.id);

      expect(proposal.approvals).to.be.equal(3);
      expect(proposal.denials).to.be.equal(2);

      const nftId4Vote = await DAOCentralNFTVoting.votes(proposal.id, 4);
      expect(nftId4Vote).to.be.equal(Vote.DENIAL);

      const nftId5Vote = await DAOCentralNFTVoting.votes(proposal.id, 5);
      expect(nftId5Vote).to.be.equal(Vote.DENIAL);
    });

    it("should allow to change a vote", async () => {
      let { DAOCentralNFTVoting, user1, user2, proposal } = await loadFixture(
        fixturesWithProposal
      );

      await DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        Vote.APPROVAL,
        [1]
      );

      await DAOCentralNFTVoting.connect(user2).castVote(
        proposal.id,
        Vote.DENIAL,
        [4]
      );

      proposal = await DAOCentralNFTVoting.proposals(proposal.id);

      expect(proposal.approvals).to.be.equal(1);
      expect(proposal.denials).to.be.equal(1);

      let nftId1Vote = await DAOCentralNFTVoting.votes(proposal.id, 1);
      expect(nftId1Vote).to.be.equal(Vote.APPROVAL);

      let nftId4Vote = await DAOCentralNFTVoting.votes(proposal.id, 4);
      expect(nftId4Vote).to.be.equal(Vote.DENIAL);

      // User 1 change his vote from APPROVAL to DENIAL
      await DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        Vote.DENIAL,
        [1]
      );

      // User 2 change his vote from DENIAL to APPROVAL
      await DAOCentralNFTVoting.connect(user2).castVote(
        proposal.id,
        Vote.APPROVAL,
        [4]
      );

      proposal = await DAOCentralNFTVoting.proposals(proposal.id);

      expect(proposal.approvals).to.be.equal(1);
      expect(proposal.denials).to.be.equal(1);

      nftId1Vote = await DAOCentralNFTVoting.votes(proposal.id, 1);
      expect(nftId1Vote).to.be.equal(Vote.DENIAL);

      nftId4Vote = await DAOCentralNFTVoting.votes(proposal.id, 4);
      expect(nftId4Vote).to.be.equal(Vote.APPROVAL);

      // User 1 change his vote from DENIAL to NO_VOTE
      await DAOCentralNFTVoting.connect(user1).castVote(
        proposal.id,
        Vote.NO_VOTE,
        [1]
      );

      // User 2 change his vote from APPROVAL to NO_VOTE
      await DAOCentralNFTVoting.connect(user2).castVote(
        proposal.id,
        Vote.NO_VOTE,
        [4]
      );

      proposal = await DAOCentralNFTVoting.proposals(proposal.id);

      expect(proposal.approvals).to.be.equal(0);
      expect(proposal.denials).to.be.equal(0);

      nftId1Vote = await DAOCentralNFTVoting.votes(proposal.id, 1);
      expect(nftId1Vote).to.be.equal(Vote.NO_VOTE);

      nftId4Vote = await DAOCentralNFTVoting.votes(proposal.id, 4);
      expect(nftId4Vote).to.be.equal(Vote.NO_VOTE);
    });
  });
});
