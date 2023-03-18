import { restAPI } from "shared/api";
import { DefaultPageWrapper } from "modules/common/layout/DefaultPageWrapper";
import { H2 } from "modules/common/components/Typography";
import { Box } from "modules/common/components/Box";

import { DaoPageContextProvider } from "./context";
import { DaoDetails, NewVotingButton, ProposalsList } from "./components";

import styles from "./DaoDetailsPage.module.scss";

type DaoDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function DaoDetailsPage(props: DaoDetailsPageProps) {
  const {
    params: { id: daoId },
  } = props;

  const dao = await restAPI.dao.getById(daoId);

  return (
    <DefaultPageWrapper>
      <DaoPageContextProvider daoData={dao}>
        <section>
          <Box>
            <H2 className={styles.heading}>{dao.organization}</H2>
            <DaoDetails
              chainName={dao.chainName}
              chainId={dao.chainId}
              ownerAddress={dao.owner}
              contractAddress={dao.contractAddress}
              nftAddress={dao.nftAddress}
            />
          </Box>
        </section>
        <section>
          <Box className={styles.votingBox}>
            <div className={styles.votingBox__header}>
              <H2 className={styles.heading}>Vote on proposals</H2>
              <NewVotingButton />
            </div>
            <ProposalsList />
          </Box>
        </section>
      </DaoPageContextProvider>
    </DefaultPageWrapper>
  );
}
