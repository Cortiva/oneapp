import React from "react";
import Text from "./Text";
import Image from "next/image";

type AvatarProps = {
  imageUrl?: string;
  username: string;
};

const Avatar: React.FC<AvatarProps> = ({ imageUrl, username }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="rounded-full bg-light-bg dark:bg-dark-bg flex justify-center items-center h-[45px] w-[45px] 2xl:h-[65px] 2xl:w-[65px] overflow-hidden">
      {imageUrl ? (
        <Image src={imageUrl} alt={username} height={120} width={120} />
      ) : (
        <Text text={getInitials(username)} weight="font-semibold" />
      )}
    </div>
  );
};

export default Avatar;
