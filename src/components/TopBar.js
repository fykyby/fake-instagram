import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import { PlusIcon, HomeIcon } from "@heroicons/react/outline";
import LogoutWindow from "./LogoutWindow";
import { useState } from "react";

export default function TopBar(props) {
  const [logoutWindowVisible, setLogoutWindowVisible] = useState(false);

  return (
    <nav className="sticky shadow-sm z-50 top-0 h-12 sm:h-16 border-b bg-white border-gray-200 w-full flex justify-between items-center px-3 lg:px-4">
      <Link to="/">
        <h1 className="font-grand-hotel text-2xl sm:text-3xl md:text-4xl select-none">
          Fake-Instagram
        </h1>
      </Link>
      <div className="flex justify-end items-center md:gap-4">
        <NavLink icon={HomeIcon} path={"/"} classList="hidden sm:block" />
        <NavLink icon={PlusIcon} path={"/upload"} classList="hidden sm:block" />
        <NavButton
          onClick={() => {
            setLogoutWindowVisible(true);
            document.body.style.overflow = "hidden";
          }}
          classList="hidden sm:block"
        />
      </div>
      {logoutWindowVisible ? (
        <LogoutWindow
          logout={props.logout}
          hideWindow={() => {
            setLogoutWindowVisible(false);
            document.body.style.overflow = "";
          }}
        />
      ) : null}
    </nav>
  );
}
