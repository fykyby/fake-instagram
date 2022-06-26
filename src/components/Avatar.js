import DefaultAvatar from "../images/avatar.png";

export default function Avatar(props) {
  return (
    <div className="h-[1.6rem] w-[1.6rem] sm:h-[1.9rem] sm:w-[1.9rem] rounded-full overflow-hidden">
      <img
        src={props.src || DefaultAvatar}
        height="320px"
        width="320px"
        alt=""
      />
    </div>
  );
}
