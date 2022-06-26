import { HomeIcon, SearchIcon } from "@heroicons/react/outline";
import DefaultAvatar from "../images/avatar.png";
import NavButton from "./NavButton";
import NavLink from "./NavLink";

export default function Nav() {
  return (
    <nav className="sm:hidden fixed bottom-0 h-12 sm:h-16 border-t bg-white border-gray-200 w-screen flex justify-around items-center px-3">
      <NavLink icon={HomeIcon} path={"/"} />
      <NavLink icon={SearchIcon} path={"/search"} />
      <NavButton
        img={DefaultAvatar}
        onClick={() => {
          console.log("logout");
        }}
      />
    </nav>
  );
}
