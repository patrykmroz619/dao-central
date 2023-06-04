"use client";

import { useSearchParamState } from "@/infrastructure/helpers/hooks/client";
import { Tabs } from "@/infrastructure/ui/core/client";

import { FAQ_QUERY_PARAMS } from "../../constants";

type FaqTabOption = {
  value: string;
  label: string;
};

type FaqTabsProps = {
  options: FaqTabOption[];
};

export const FaqTabs = (props: FaqTabsProps) => {
  const { options } = props;

  const [activeCategory, setActiveCategory] = useSearchParamState(
    FAQ_QUERY_PARAMS.CATEGORY
  );

  const handleFaqCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const value = activeCategory || options[0].value;

  return (
    <Tabs options={options} value={value} onChange={handleFaqCategorySelect} />
  );
};
