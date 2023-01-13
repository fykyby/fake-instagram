import Avatar from "./Avatar";

export default function NavButton(props) {
  return (
    <button className={`p-2 ${props.classList || ""}`} onClick={props.onClick}>
      {props.icon ? (
        <props.icon className="h-6 w-6 sm:h-7 sm:w-7" />
      ) : (
        <Avatar />
      )}
    </button>
  );
}
