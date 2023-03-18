"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "react-feather";

import { Table, TableConfig } from "modules/common/components/Table";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";

type DaoTableItem = {
  id: number;
  organization: string;
  contractAddress: string;
  owner: string;
  nftAddress: string;
  chainId: number;
  chainName: string;
};

type DaoTableProps = {
  daos: DaoTableItem[];
};

export const DaoTable = (props: DaoTableProps) => {
  const { daos } = props;

  const tableConfig: TableConfig<DaoTableItem> = useMemo(
    () => ({
      columns: {
        organization: {
          label: "Organization",
        },
        chainName: {
          label: "Network",
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
    }),
    [daos]
  );

  return (
    <div>
      <Table items={daos} config={tableConfig} />
    </div>
  );
};
