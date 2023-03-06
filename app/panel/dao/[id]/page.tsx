import { restAPI } from "shared/api";
import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { H2 } from "shared/components/Typography";
import { Box } from "shared/components/Box";
import { DaoDetails } from "./components";
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
    </DefaultPageWrapper>
  );
}
