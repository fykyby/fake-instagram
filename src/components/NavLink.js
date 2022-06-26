import { Link } from "react-router-dom";

export default function NavLink(props) {
  return <Link to={props.path}>{<props.icon size="1.6rem" />}</Link>;
}
