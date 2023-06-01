"use client";

import { Tabs } from "@/infrastructure/ui/core/Tabs";
import { useSearchParamState } from "@/infrastructure/helpers/hooks/useSearchParamState";
import { FAQ_QUERY_PARAMS } from "modules/faq/constants";

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
