"use client";

import { useMemo } from "react";
import { Table, TableConfig } from "shared/components/Table";
import { getChainData } from "shared/utils/getChainData";
import { truncateEthAddress } from "shared/utils/truncateEthAddress";

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
            <a
              href={`${
                getChainData(item.chainId)?.blockExplorers?.default.url
              }/address/${item.contractAddress}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {truncateEthAddress(item.contractAddress)}
            </a>
          ),
        },
        nftAddress: {
          label: "NFT Address",
          value: (item) => (
            <a
              href={`${
                getChainData(item.chainId)?.blockExplorers?.default.url
              }/address/${item.nftAddress}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {truncateEthAddress(item.nftAddress)}
            </a>
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
