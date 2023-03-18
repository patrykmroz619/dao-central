import { DefaultPageWrapper } from "modules/layout/components/DefaultPageWrapper";
import { H2 } from "modules/common/components/Typography";
import { Box } from "modules/common/components/Box";
import { DaoService } from "modules/dao/services/daoService";
import { DaoDetailsProvider } from "modules/dao/providers/DaoDetailsProvider";
import { DaoDetails } from "modules/dao/components/DaoDetails";
import { NewVotingButton } from "modules/dao/components/NewVotingButton";
import { ProposalsList } from "modules/dao/components/ProposalsList";

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

  const daoService = new DaoService();
  const dao = await daoService.getDaoById(daoId);

  return (
    <DefaultPageWrapper>
      <DaoDetailsProvider daoData={dao}>
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
      </DaoDetailsProvider>
    </DefaultPageWrapper>
  );
}
