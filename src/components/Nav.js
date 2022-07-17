import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import NavButton from "./NavButton";
import NavLink from "./NavLink";
import LogoutWindow from "./LogoutWindow";
import { useState } from "react";

export default function Nav(props) {
  const [logoutWindowVisible, setLogoutWindowVisible] = useState(false);

  return (
    <nav className="sm:hidden fixed bottom-0 h-12 border-t bg-white border-gray-200 w-screen flex justify-around items-center px-3">
      <NavLink icon={HomeIcon} path={"/"} />
      <NavLink icon={PlusIcon} path={"/upload"} />
      <NavButton
        onClick={() => {
          setLogoutWindowVisible(true);
          document.body.style.overflow = "hidden";
        }}
      />
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
