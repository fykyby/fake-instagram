import { BiHomeAlt, BiSearch } from "react-icons/bi";
import DefaultAvatar from "../images/avatar.png";
import NavButton from "./NavButton";
import NavLink from "./NavLink";

export default function Nav() {
  return (
    <nav className="md:hidden fixed bottom-0 h-12 border-t bg-white border-gray-200 w-screen flex justify-around items-center px-3">
      <NavLink icon={BiHomeAlt} path={"/"} />
      <NavLink icon={BiSearch} path={"/search"} />
      <NavButton
        img={DefaultAvatar}
        onClick={() => {
          console.log("logout");
        }}
      />
    </nav>
  );
}
