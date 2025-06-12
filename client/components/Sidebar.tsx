"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Tooltip from "./Tooltip";
import Text from "./Text";
import {
  ArrowLeft,
  ArrowRight,
  Laptop2,
  LayoutDashboard,
  Users,
  Users2,
} from "lucide-react";
import { useTheme } from "next-themes";

type SidebarProps = {
  isShrunk: boolean;
  setIsShrunk: (val: boolean) => void;
};

const Sidebar = ({ isShrunk, setIsShrunk }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const navigate = (page: string) => {
    router.push(page);
  };

  const adminMenu = [
    { title: "Dashboard", url: "/", icon: <LayoutDashboard size={18} /> },
    { title: "Employees", url: "/employees", icon: <Users2 size={18} /> },
    { title: "Devices", url: "/devices", icon: <Laptop2 size={18} /> },
    { title: "IT Managers", url: "/promos", icon: <Users size={18} /> },
  ];

  return (
    <div
      className={`h-screen ${
        isShrunk ? "w-[4%]" : "w-[14%]"
      } bg-slate-900 dark:bg-slate-800 flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]`}
    >
      <div className="h-[8%] flex items-center px-5">
        {isShrunk ? (
          <Image
            src={"/icon.png"}
            alt="O"
            width={63}
            height={63}
            className="object-contain"
          />
        ) : (
          <div className="flex flex-row items-center text-[37px] text-white font-semibold ">
            <Image
              src={theme === "dark" ? "/logodark.png" : "/logolight.png"}
              alt="oneapp"
              width={200}
              height={63}
              className="object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-3 border-y-1 border-slate-800">
        {adminMenu.map((menu, index) => (
          <div
            key={index}
            className={`flex flex-row items-center space-x-3 px-6 py-4 text-[13px] xl:text-[14px] 2xl:text-[15px] text-white cursor-pointer hover:bg-slate-700 hover:border-r-2 hover:border-primary ${
              pathname === menu.url
                ? "bg-slate-700 border-r-2 border-primary"
                : ""
            }`}
            onClick={() => navigate(menu.url)}
          >
            <span>{menu.icon}</span>
            {!isShrunk && <span>{menu.title}</span>}
          </div>
        ))}
      </div>

      <div className="h-[5%] flex flex-row justify-between items-center w-full px-2 shadow-md">
        <Text
          text={`${isShrunk ? "V " : "Version "} 1.0.1`}
          size="small"
          color="text-white"
        />
        <div
          onClick={() => setIsShrunk(!isShrunk)}
          className="flex justify-center items-center cursor-pointer"
        >
          <Tooltip
            title={
              !isShrunk ? (
                <ArrowLeft size={20} color="#FF6D3D" />
              ) : (
                <ArrowRight size={20} color="#FF6D3D" />
              )
            }
            content={!isShrunk ? "Shrink" : "Expand"}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
