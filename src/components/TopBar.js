import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import {
  PlusIcon,
  ChatAltIcon,
  HomeIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import DefaultAvatar from "../images/avatar.png";

export default function TopBar() {
  return (
    <nav className="sticky shadow-sm z-50 top-0 h-12 sm:h-16 border-b bg-white border-gray-200 w-full flex justify-between items-center px-3 lg:px-4">
      <Link to="/">
        <h1 className="font-grand-hotel text-2xl sm:text-3xl lg:text-4xl select-none">
          Fake-Instagram
        </h1>
      </Link>
      <div className="flex justify-end items-center md:gap-4">
        <NavLink icon={HomeIcon} path={"/"} classList="hidden sm:block" />
        <NavLink
          icon={SearchIcon}
          path={"/search"}
          classList="hidden sm:block"
        />
        <NavLink icon={PlusIcon} path={"/"} />
        <NavLink icon={ChatAltIcon} path={"/"} />
        <NavButton
          img={DefaultAvatar}
          onClick={() => {
            console.log("logout");
          }}
          classList="hidden sm:block"
        />
      </div>
    </nav>
  );
}
