import DefaultAvatar from "../images/avatar.png";
import { useContext } from "react";
import { FirebaseContext } from "../App";

export default function Avatar(props) {
  const firebase = useContext(FirebaseContext);

  return (
    <div
      className={
        "h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10 rounded-full overflow-hidden"
      }
    >
      <img
        src={props.src || firebase.auth.currentUser.photoURL || DefaultAvatar}
        height="320px"
        width="320px"
        alt=""
      />
    </div>
  );
}
