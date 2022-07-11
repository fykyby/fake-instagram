import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import NavButton from "./NavButton";
import NavLink from "./NavLink";

export default function Nav(props) {
  return (
    <nav className="sm:hidden fixed bottom-0 h-12 border-t bg-white border-gray-200 w-screen flex justify-around items-center px-3">
      <NavLink icon={HomeIcon} path={"/"} />
      <NavLink icon={PlusIcon} path={"/upload"} />
      <NavButton onClick={props.logout} />
    </nav>
  );
}
