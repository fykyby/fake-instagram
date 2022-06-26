import { Link } from "react-router-dom";

export default function NavLink(props) {
  return (
    <Link to={props.path}>
      <div className={`p-2 ${props.classList || ""}`}>
        {<props.icon size="1.6rem" />}
      </div>
    </Link>
  );
}
