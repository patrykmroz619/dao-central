import { Text } from "shared/components/Typography";
import { useAccount, useBalance, useNetwork } from "wagmi";

import styles from "./InitialInfo.module.scss";

export const InitialInfo = () => {
  const { address, isConnecting } = useAccount();
  const { data, isFetching } = useBalance({ address });
  const { chain } = useNetwork();

  console.log(chain);

  const dataItems = [
    {
      label: "Address",
      value: address,
      isLoading: isConnecting,
    },
    {
      label: "Balance",
      value: `${data?.formatted} ${data?.symbol}`,
      isLoading: isFetching,
    },
    {
      label: "Connected chain",
      value: chain?.unsupported ? "Unsupported" : chain?.name,
      isLoading: false,
    },
  ];

  return (
    <ul className={styles.list}>
      {dataItems.map((item) => (
        <li key={item.label} className={styles.list__item}>
          <strong>{item.label}:</strong> {item.value}
        </li>
      ))}
      <Text>
        The contract will be deployed via a connected wallet. Please make sure
        that your selected wallet and chain are correct.
      </Text>
    </ul>
  );
};
