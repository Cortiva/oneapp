import React from "react";
import Text from "./Text";
import { File } from "lucide-react";

type AppEmptyStateProps = {
  text: string;
  buttonText: string;
  onClick?: () => void;
};

const AppEmptyState: React.FC<AppEmptyStateProps> = ({
  text,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <File size={100} className="mb-5" />

      <Text text={text} weight="font-semibold" mb="mb-2" isTitleText={true} />

      <div className="flex space-x-2 cursor-pointer">
        <Text
          text={buttonText}
          hasUnderline={true}
          hasHover={true}
          weight="font-semibold"
          size="big"
          onClick={onClick}
        />
        <Text text=" to add new record." weight="font-semibold" />
      </div>
    </div>
  );
};

export default AppEmptyState;
