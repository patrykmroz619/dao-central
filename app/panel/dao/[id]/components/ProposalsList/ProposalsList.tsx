"use client";

import { useDaoPageContext } from "../../context";
import { Proposal } from "./Proposal";

import styles from "./ProposalsList.module.scss";

export const ProposalsList = () => {
  const { proposals } = useDaoPageContext();

  return (
    <ul className={styles.list}>
      {proposals.map((proposal) => (
        <Proposal
          key={proposal.id}
          description={proposal.description}
          start={proposal.startTime}
          end={proposal.endTime}
          approvals={proposal.approvals}
          denials={proposal.denials}
        />
      ))}
    </ul>
  );
};
