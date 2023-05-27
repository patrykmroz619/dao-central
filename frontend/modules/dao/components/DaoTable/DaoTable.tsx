"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "react-feather";

import { Table, TableConfig } from "modules/common/components/Table";
import { NoData } from "modules/common/components/NoData";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { getChainData } from "modules/blockchain/utils/getChainData";
import { DaoData } from "modules/dao/types/daoData.type";

type DaoTableProps = {
  daos: DaoData[];
  isLoading: boolean;
};

export const DaoTable = (props: DaoTableProps) => {
  const { daos, isLoading } = props;

  const router = useRouter();

  const handleDaoRowClick = (daoId: number) => {
    router.push(`/panel/daos/${daoId}`);
  };

  const tableConfig: TableConfig<DaoData> = useMemo(
    () => ({
      columns: {
        organization: {
          label: "Organization",
        },
        chainName: {
          label: "Network",
          value: (item) => getChainData(item.chainId)?.name || "-",
        },
        contractAddress: {
          label: "Contract address",
          isSortable: true,
          value: (item) => (
            <BlockchainExplorerLink
              chainId={item.chainId}
              address={item.contractAddress}
            />
          ),
        },
        owner: {
          label: "Owner",
          value: (item) => (
            <BlockchainExplorerLink
              chainId={item.chainId}
              address={item.owner}
            />
          ),
        },
        nftAddress: {
          label: "NFT Address",
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
              href={`/panel/daos/${item.id}`}
              aria-label={`Details of ${item.organization}`}
            >
              <ExternalLink />
            </Link>
          ),
        },
      },
      onRowClick: handleDaoRowClick,
    }),
    [props.daos]
  );

  return (
    <div>
      {daos.length === 0 ? (
        <NoData>
          There are no any organizations to show.{" "}
          <Link href="/panel/new-dao">Create DAO</Link>
        </NoData>
      ) : (
        <Table items={daos} config={tableConfig} isLoading={isLoading} />
      )}
    </div>
  );
};
