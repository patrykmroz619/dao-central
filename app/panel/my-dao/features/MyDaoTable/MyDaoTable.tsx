"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "react-feather";

import { Table, TableConfig } from "shared/components/Table";
import { BlockchainExplorerLink } from "shared/features/common/BlockchainExplorerLink";

type DaoTableItem = {
  id: number;
  organization: string;
  contractAddress: string;
  nftAddress: string;
  chainId: number;
  chainName: string;
};

type MyDaoTableProps = {
  daos: DaoTableItem[];
};

export const MyDaoTable = (props: MyDaoTableProps) => {
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
              href={`/panel/dao/${item.id}`}
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
