"use client";

import { useContext, useEffect, useState } from "react";
import { LayoutDashboard, Users2, Laptop2, Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Text from "./Text";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser) {
      console.log("No User Loaded");
    } else {
      try {
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, [currentUser]);

  const handleFullScreenClicked = () => {
    if (!isFullScreen && typeof document !== "undefined") {
      document.body.requestFullscreen();
    }
  };

  const handleExitFullScreenClicked = () => {
    if (isFullScreen && typeof document !== "undefined") {
      document.exitFullscreen();
    }
  };

  const handleLockScreen = async () => {
    console.log("Lock screen triggered");
  };

  const handleLogout = async () => {
    try {
      dispatch(logOut());
      router.push("/login");
    } catch (err) {
      console.log(err.data);
      toast.error(`Logout error: ${err?.data?.data?.message || err.data}`);
    }
  };

  const to = (page) => {
    setShowMenu(false);
    router.push(page);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", handleFullScreenChange);
      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullScreenChange
        );
      };
    }
  }, []);

  const handleDropdownMenu = (type, status) => {
    if (type === "profile") {
      setIsProfileOpen(status);
    }
  };

  const profileUrls = [
    {
      title: "Profile",
      url: "/profile",
      isLink: true,
      icon: <User size={18} color="currentColor" />,
    },
    {
      title: "Help",
      url: "/",
      isLink: false,
      icon: <InfoCircle size={18} color="currentColor" />,
    },
    {
      title: "Sign Out",
      url: "/",
      isLink: false,
      icon: <Logout size={18} color="currentColor" />,
    },
  ];

  const adminMenu = [
    { title: "Dashboard", url: "/", icon: <LayoutDashboard size={18} /> },
    { title: "Employees", url: "/employees", icon: <Users2 size={18} /> },
    { title: "Devices", url: "/devices", icon: <Laptop2 size={18} /> },
    { title: "IT Managers", url: "/promos", icon: <Users size={18} /> },
  ];

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {!showMenu && (
        <div className="h-[8%] flex justify-between items-center bg-light-card dark:bg-dark-card pl-5 lg:pl-10 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.1)]">
          <div className="md:hidden cursor-pointer" onClick={toggleShowMenu}>
            <RiMenu4Line size={20} color="#0097B2" />
          </div>

          <div className="h-full flex items-center">
            <div className="flex items-center px-3 cursor-pointer hover:bg-primary/30 text-[#545454] dark:text-white text-2xl">
              {!isFullScreen ? (
                <RiFullscreenLine onClick={handleFullScreenClicked} />
              ) : (
                <RiFullscreenExitLine onClick={handleExitFullScreenClicked} />
              )}
            </div>

            <div
              className="flex items-center px-3 cursor-pointer hover:bg-primary/30 text-[#545454] dark:text-white text-2xl"
              onClick={toggleTheme}
            >
              {theme === "light" ? <RiSunLine /> : <RiMoonLine />}
            </div>

            <div className="relative px-5">
              <div className="cursor-pointer">
                {user && (
                  <div
                    className="flex items-center pr-2"
                    onClick={() =>
                      handleDropdownMenu("profile", !isProfileOpen)
                    }
                  >
                    <Avatar
                      imageUrl={user.imageUrl}
                      username={`${user.firstName} ${user.lastName}`}
                      borderColor="primary"
                    />
                    <div className="flex-col pl-3">
                      <Text
                        text={`${user.firstName} ${user.lastName}`}
                        weight="font-semibold"
                      />
                      <Text text={user.roles[0]} size="small" />
                    </div>
                  </div>
                )}

                <div
                  className={`absolute right-0 mt-1 w-[300px] bg-light-card dark:bg-dark-card shadow-xl rounded ${
                    isProfileOpen ? "block" : "hidden"
                  }`}
                >
                  <ul>
                    {profileUrls.slice(0, 4).map((url, i) => (
                      <li
                        key={i}
                        className="flex items-center py-3 px-4 hover:bg-light-bg dark:hover:bg-dark-bg"
                        onClick={() => {
                          setIsProfileOpen(false);
                          to(url.url);
                        }}
                      >
                        <IconHolder>{url.icon}</IconHolder>
                        <span className="ml-2">
                          <Text text={url.title} />
                        </span>
                      </li>
                    ))}
                    <li className="h-[1px] w-full bg-light-bg dark:bg-dark-bg"></li>
                    <li>
                      <div className="flex w-full">
                        {profileUrls.slice(-2).map((url2, index) => (
                          <div
                            key={index}
                            className={`w-1/2 flex justify-center items-center hover:bg-light-bg dark:hover:bg-dark-bg py-3 border-r ${
                              index !== 0
                                ? "border-light-bg dark:border-dark-bg"
                                : ""
                            }`}
                            onClick={
                              index === 0 ? handleLockScreen : handleLogout
                            }
                          >
                            <IconHolder>{url2.icon}</IconHolder>
                            <span className="ml-2">
                              <Text text={url2.title} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <DigitalClock militaryTime={false} separatorBlink={true} />
          </div>
        </div>
      )}

      {showMenu && (
        <div className="h-screen w-full bg-slate-900 dark:bg-slate-800 flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="h-[8%] flex justify-between items-center px-5">
            <div className="flex items-center text-[37px] text-white font-semibold">
              <img src={images.iconLight} width={50} alt="Staze" />
              <span className="ml-2">staze</span>
            </div>
            <div className="cursor-pointer" onClick={() => setShowMenu(false)}>
              <CloseSquare color="#FFFFFF" size={33} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-3 border-y border-slate-800">
            {adminMenu.map((menu, i) => (
              <div
                key={i}
                className={`flex items-center space-x-3 px-6 py-4 text-sm text-white cursor-pointer hover:bg-slate-700 hover:border-r-2 hover:border-primary ${
                  pathname === menu.url
                    ? "bg-slate-700 border-r-2 border-primary"
                    : ""
                }`}
                onClick={() => to(menu.url)}
              >
                <span>{menu.icon}</span>
                <span>{menu.title}</span>
              </div>
            ))}
          </div>

          <div className="h-[5%] flex justify-between items-center w-full px-2 shadow-md">
            <Text text={`Version 1.0.1`} size="small" color="text-white" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
