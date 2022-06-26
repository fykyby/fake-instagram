import DefaultAvatar from "../images/avatar.png";

export default function Avatar(props) {
  return (
    <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10 rounded-full overflow-hidden">
      <img
        src={props.src || DefaultAvatar}
        height="320px"
        width="320px"
        alt=""
      />
    </div>
  );
}
