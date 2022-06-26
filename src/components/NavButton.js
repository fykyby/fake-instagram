import Avatar from "./Avatar";

export default function NavButton(props) {
  return (
    <button className="p-2" href={props.path} onClick={props.onClick}>
      {props.icon ? <props.icon size="1.6rem" /> : <Avatar />}
    </button>
  );
}
