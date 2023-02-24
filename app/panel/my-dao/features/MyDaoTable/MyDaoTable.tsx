"use client";

type DaoTableItem = {
  id: number;
  contractAddress: string;
};

type MyDaoTableProps = {
  daos: DaoTableItem[];
};

export const MyDaoTable = (props: MyDaoTableProps) => {
  const { daos } = props;

  return (
    <div>
      {daos.map((dao) => (
        <div key={dao.id}>{dao.contractAddress}</div>
      ))}
    </div>
  );
};
