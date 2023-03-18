import { useAccount } from "wagmi";
import { Check, X } from "react-feather";

import { IconButton } from "modules/common/components/IconButton";
import { SingleBarChart } from "modules/common/components/SingleBarChart";
import { H3, Text } from "modules/common/components/Typography";

import styles from "./Proposal.module.scss";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

type ProposalProps = {
  description: string;
  start: Date;
  end: Date;
  approvals: number;
  denials: number;
};

export const Proposal = (props: ProposalProps) => {
  const { description, start, end, approvals, denials } = props;

  const { isConnected } = useAccount();

  const { userNFTs } = useDaoDetails();
  const numberOfUserNFTs = userNFTs.length;
  const hasUserNFTs = numberOfUserNFTs > 0;

  const currentDate = new Date();
  const isVotingActive = currentDate >= start && currentDate < end;

  return (
    <li className={styles.proposal}>
      <div className={styles.proposal__header}>
        <H3>{description}</H3>
      </div>
      <div className={styles.proposal__chart}>
        <SingleBarChart
          optionALabel="Approvals"
          optionAValue={approvals}
          optionBLabel="Denials"
          optionBValue={denials}
        />
      </div>
      <div className={styles.proposal__dates}>
        <Text>Start: {start.toLocaleString()}</Text>
        <Text>End: {end.toLocaleString()}</Text>
      </div>
      <div className={styles.proposal__footer}>
        {!isVotingActive ? (
          <Text>Voting is inactive.</Text>
        ) : !isConnected ? (
          <Text>Connect wallet to vote.</Text>
        ) : !hasUserNFTs ? (
          <Text>
            You need to have an NFT from the organization&apos;s official
            collection to vote
          </Text>
        ) : (
          <>
            <IconButton Icon={Check}>Approve (+{numberOfUserNFTs})</IconButton>
            <IconButton Icon={X}>Deny (-{numberOfUserNFTs})</IconButton>
          </>
        )}
      </div>
    </li>
  );
};
