"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "react-feather";

import { InternationalizedProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";
import { Table, TableConfig } from "modules/common/components/Table";
import { NoData } from "modules/common/components/NoData";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { getChainData } from "modules/blockchain/utils/getChainData";
import { DaoData } from "modules/dao/types/daoData.type";

type DaoTableProps = {
  daos: DaoData[];
  isLoading: boolean;
} & InternationalizedProps;

export const DaoTable = (props: DaoTableProps) => {
  const { daos, isLoading, lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-list");

  const router = useRouter();

  const handleDaoRowClick = (daoId: number) => {
    router.push(`${lang}/panel/daos/${daoId}`);
  };

  const tableConfig: TableConfig<DaoData> = useMemo(
    () => ({
      columns: {
        organization: {
          label: t("organization"),
        },
        chainName: {
          label: t("network"),
          value: (item) => getChainData(item.chainId)?.name || "-",
        },
        contractAddress: {
          label: t("contract-address"),
          isSortable: true,
          value: (item) => (
            <BlockchainExplorerLink
              chainId={item.chainId}
              address={item.contractAddress}
            />
          ),
        },
        owner: {
          label: t("owner"),
          value: (item) => (
            <BlockchainExplorerLink
              chainId={item.chainId}
              address={item.owner}
            />
          ),
        },
        nftAddress: {
          label: t("nft-address"),
          value: (item) => (
            <BlockchainExplorerLink
              chainId={item.chainId}
              address={item.nftAddress}
            />
          ),
        },
        link: {
          label: "",
          value: (item) => (
            <Link
              href={`${lang}/panel/daos/${item.id}`}
              aria-label={`Details of ${item.organization}`}
            >
              <ExternalLink />
            </Link>
          ),
        },
      },
      onRowClick: handleDaoRowClick,
    }),
    [props.daos, t]
  );

  return (
    <div>
      {daos.length === 0 ? (
        <NoData>
          {t("no-data")}{" "}
          <Link href={`${lang}/panel/new-dao`}>{t("create-dao")}</Link>
        </NoData>
      ) : (
        <Table items={daos} config={tableConfig} isLoading={isLoading} />
      )}
    </div>
  );
};
