import React from "react";
import { formatNumberN } from "@/utils/functions";
import Text from "./Text";

type BreadcrumbProps = {
  title: string;
  count: number;
  actions?: React.ReactNode;
  color?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  count,
  actions,
  color = "text-white",
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row space-x-5 items-center">
        <Text text={title} isTitleText titleColor={color} />
        <div className="flex flex-row items-center justify-center bg-secondary rounded-full h-[30px] px-4 text-[12px] text-white">
          {`${formatNumberN(count)} ${title}`}
        </div>
      </div>
      {actions}
    </div>
  );
};

export default Breadcrumb;
