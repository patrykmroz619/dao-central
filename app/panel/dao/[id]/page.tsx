import { restAPI } from "shared/api";
import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { H2 } from "shared/components/Typography";
import { Box } from "shared/components/Box";
import { DaoDetails } from "./components";
import { DaoProposals, NewVotingButton } from "./containers";
import styles from "./DaoDetailsPage.module.scss";
import { DaoPageContextProvider } from "./context";

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
            <DaoProposals />
          </Box>
        </section>
      </DaoPageContextProvider>
    </DefaultPageWrapper>
  );
}
