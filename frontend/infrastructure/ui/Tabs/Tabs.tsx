"use client";

import { useId } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./Tabs.module.scss";

export type TabOption = {
  label: string;
  value: string;
};

type TabsProps = {
  options: TabOption[];
  onChange: (value: string) => void;
  value: string;
};

export const Tabs = (props: TabsProps) => {
  const { options, onChange, value } = props;

  const reactId = useId();

  const handleButtonClick = (value: string) => () => onChange(value);

  return (
    <ul className={styles.list}>
      {options.map((option) => (
        <li
          className={classNames({
            [styles.tab]: true,
            [styles.tab__active]: value === option.value,
          })}
          key={option.value}
        >
          <button onClick={handleButtonClick(option.value)}>
            {option.label}
          </button>
          {value === option.value && (
            <motion.div
              className={styles.tab__underline}
              layoutId={`${reactId}-tab-underline`}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
