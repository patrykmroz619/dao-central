// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error InvalidStartTime();
error InvalidEndTime();
error NotOwnerOfNFT();
error AlreadyVoted();

contract DAOCentralNFTVoting is Ownable {
    event NewProposal(uint256 indexed proposalId);
    event NewVote(uint256 indexed nftId, uint256 indexed proposalId, Vote vote);

    string public organizationName;
    IERC721 public immutable nft;

    enum Vote {
        NO_VOTE,
        APPROVAL,
        DENIAL
    }

    struct Proposal {
        uint256 id;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 approvals;
        uint256 denials;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalsCount;

    mapping(uint256 => mapping(uint256 => Vote)) public votes;

    constructor(string memory _organizationName, IERC721 _nft) {
        organizationName = _organizationName;
        nft = _nft;
    }

    function addProposal(
        string memory description,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner {
        if (startTime < block.timestamp) {
            revert InvalidStartTime();
        }

        if (endTime < startTime) {
            revert InvalidEndTime();
        }

        proposalsCount++;

        proposals[proposalsCount] = Proposal(
            proposalsCount,
            description,
            startTime,
            endTime,
            0,
            0
        );

        emit NewProposal(proposalsCount);
    }

    function castVote(
        uint256 proposalId,
        Vote vote,
        uint256[] memory nftsIdToVote
    ) external {
        for (uint256 i = 0; i < nftsIdToVote.length; i++) {
            uint256 nftId = nftsIdToVote[i];

            if (nft.ownerOf(nftId) != msg.sender) {
                revert NotOwnerOfNFT();
            }

            Proposal storage currentProposal = proposals[proposalId];
            Vote previousVote = votes[proposalId][nftId];

            if (previousVote == vote) {
                revert AlreadyVoted();
            }

            votes[proposalId][nftId] = vote;

            if (vote == Vote.APPROVAL) {
                currentProposal.approvals++;

                if (previousVote == Vote.DENIAL) {
                    currentProposal.denials--;
                }
            } else if (vote == Vote.DENIAL) {
                currentProposal.denials++;

                if (previousVote == Vote.APPROVAL) {
                    currentProposal.approvals--;
                }
            } else {
                if (previousVote == Vote.DENIAL) {
                    currentProposal.denials--;
                } else {
                    currentProposal.approvals--;
                }
            }

            emit NewVote(nftId, proposalId, vote);
        }
    }
}
