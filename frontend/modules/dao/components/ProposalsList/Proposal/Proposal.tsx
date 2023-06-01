import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { Check, X } from "react-feather";

import { InternationalizedProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { IconButton } from "@/infrastructure/ui/IconButton";
import { SingleBarChart } from "@/infrastructure/ui/SingleBarChart";
import { H3, Text } from "@/infrastructure/ui/Typography";
import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";
import { useVotingHandler } from "./useVotingHandler";

import styles from "./Proposal.module.scss";

type ProposalProps = {
  proposalId: number;
  description: string;
  start: Date;
  end: Date;
  approvals: number;
  denials: number;
} & InternationalizedProps;

export const Proposal = (props: ProposalProps) => {
  const { description, start, end, approvals, denials, proposalId, lang } =
    props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  const { handleVote } = useVotingHandler(proposalId);

  const { isConnected } = useAccount();
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

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
          optionALabel={t("approvals")}
          optionAValue={approvals}
          optionBLabel={t("denials")}
          optionBValue={denials}
        />
      </div>
      <div className={styles.proposal__dates}>
        <Text>
          {t("start")}: {start.toLocaleString()}
        </Text>
        <Text>
          {t("end")}: {end.toLocaleString()}
        </Text>
      </div>
      <div className={styles.proposal__footer}>
        {!isVotingActive ? (
          <Text>{t("voting-is-inactive")}</Text>
        ) : !isConnected ? (
          <Text>{t("connect-wallet-to-vote")}</Text>
        ) : !isAuthenticated ? (
          <Text>{t("login-to-vote")}</Text>
        ) : !hasUserNFTs ? (
          <Text>{t("you-need-to-have-organization-nfts")}</Text>
        ) : (
          <>
            <IconButton onClick={() => handleVote(true)} Icon={Check}>
              {t("approve")} (+{numberOfUserNFTs})
            </IconButton>
            <IconButton onClick={() => handleVote(false)} Icon={X}>
              {t("deny")} (-{numberOfUserNFTs})
            </IconButton>
          </>
        )}
      </div>
    </li>
  );
};
