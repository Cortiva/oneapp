import React from "react";
import { formatNumberN } from "@/utils/functions";
import Text from "./Text";

type BreadcrumbProps = {
  title: string;
  count?: number;
  actions?: React.ReactNode;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, count, actions }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row space-x-5 items-center">
        <Text text={title} isTitleText={true} />
        {count! > 0 && (
          <div className="flex flex-row items-center justify-center bg-light-card dark:bg-dark-card rounded-full h-[35px] px-4 text-[14px]">
            <Text
              text={`${formatNumberN(count)} in total`}
              weight="font-bold"
            />
          </div>
        )}
      </div>
      {actions}
    </div>
  );
};

export default Breadcrumb;
