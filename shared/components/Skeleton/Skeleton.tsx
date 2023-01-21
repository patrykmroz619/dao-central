import LoadingSkeleton from "react-loading-skeleton";

type SkeletonProps = {
  lines?: number;
  inline?: boolean;
  width?: string | number;
};

export const Skeleton = (props: SkeletonProps) => {
  const { lines, inline, width } = props;

  return <LoadingSkeleton count={lines} inline={inline} width={width} />;
};
