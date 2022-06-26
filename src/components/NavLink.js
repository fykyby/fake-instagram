import { Link } from "react-router-dom";

export default function NavLink(props) {
  return (
    <Link to={props.path}>
      <div className={`p-2 ${props.classList || ""}`}>
        {<props.icon className="h-6 w-6 sm:h-8 sm:w-8" />}
      </div>
    </Link>
  );
}
