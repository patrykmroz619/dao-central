import { Text } from "../Typography";
import styles from "./SingleBarChart.module.scss";

type SingleBarChartProps = {
  optionALabel: string;
  optionAValue: number;
  optionBLabel: string;
  optionBValue: number;
};

export const SingleBarChart = (props: SingleBarChartProps) => {
  const { optionALabel, optionAValue, optionBLabel, optionBValue } = props;

  const barWidth =
    optionAValue + optionBValue > 0
      ? (optionAValue / (optionAValue + optionBValue)) * 100
      : 50;

  return (
    <div className={styles.chart}>
      <div className={styles.chart__labels}>
        <Text className={styles.chart__label}>
          {optionALabel}: {optionAValue}
        </Text>
        <Text className={styles.chart__label}>
          {optionBLabel}: {optionBValue}
        </Text>
      </div>
      <div
        className={styles.chart__bar}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          "--bar-width": `${barWidth}%`,
        }}
      />
    </div>
  );
};
