"use client";

import { useMemo } from "react";
import { LayoutGroup } from "framer-motion";

import { useGetSearchParam } from "@/infrastructure/helpers/hooks/useGetSearchParam";
import { FAQ_QUERY_PARAMS } from "modules/faq/constants";
import { FaqItem } from "../FaqItem";

import styles from "./FaqList.module.scss";

type FaqDataItem = {
  question: string;
  answer: string;
  category: string;
};

type FaqListProps = {
  data: FaqDataItem[];
};

export const FaqList = (props: FaqListProps) => {
  const { data } = props;

  const selectedCategory =
    useGetSearchParam(FAQ_QUERY_PARAMS.CATEGORY) || "all";

  const filteredData = useMemo(() => {
    if (selectedCategory === "all") {
      return data;
    }
    return data.filter((item) => item.category === selectedCategory);
  }, [data, selectedCategory]);

  return (
    <ul className={styles.list}>
      <LayoutGroup>
        {filteredData.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </LayoutGroup>
    </ul>
  );
};
