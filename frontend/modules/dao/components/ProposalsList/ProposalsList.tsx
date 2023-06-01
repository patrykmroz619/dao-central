"use client";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";
import { Proposal } from "./Proposal";

import styles from "./ProposalsList.module.scss";

export const ProposalsList = (props: InternationalizedProps) => {
  const { lang } = props;

  const { proposals } = useDaoDetails();

  return (
    <ul className={styles.list}>
      {proposals.map((proposal) => (
        <Proposal
          key={proposal.id}
          proposalId={proposal.id}
          description={proposal.description}
          start={proposal.startTime}
          end={proposal.endTime}
          approvals={proposal.approvals}
          denials={proposal.denials}
          lang={lang}
        />
      ))}
    </ul>
  );
};
