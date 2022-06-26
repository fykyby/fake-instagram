import NavLink from "./NavLink";
import { BiAddToQueue, BiNavigation } from "react-icons/bi";

export default function TopBar() {
  return (
    <nav className="sticky z-50 top-0 h-12 border-b bg-white border-gray-200 w-screen flex justify-between items-center px-3">
      <h1 className="font-grand-hotel text-2xl select-none">Fake-Instagram</h1>
      <div className="flex gap-2 justify-end items-center">
        <NavLink icon={BiAddToQueue} path={"/"} />
        <NavLink icon={BiNavigation} path={"/"} />
      </div>
    </nav>
  );
}
