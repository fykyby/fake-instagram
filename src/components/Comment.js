import { TrashIcon } from "@heroicons/react/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseContext } from "../App";
import { useContext, useState } from "react";

export default function Comment(props) {
  const firebase = useContext(FirebaseContext);
  const [deleted, setDeleted] = useState(false);

  async function deleteComment() {
    await deleteDoc(
      doc(firebase.db, "posts", props.data.postID, "comments", props.data.id)
    );

    props.deleteComment(props.data.id);
    setDeleted(true);
  }

  if (deleted) {
    return (
      <article className="flex w-full justify-start place-items-start gap-3 sm:gap-4">
        Comment deleted
      </article>
    );
  } else {
    return (
      <article className="flex w-full justify-start place-items-start gap-3 sm:gap-4">
        <div>
          <div
            className={"h-6 w-6 md:h-7 md:w-7  rounded-full overflow-hidden"}
          >
            <img
              src={props.data.profilePic}
              height="320px"
              width="320px"
              alt=""
            />
          </div>
        </div>
        <h6 className="font-bold text-sm md:text-base whitespace-nowrap">
          {props.data.userName}
        </h6>
        <p className="text-sm md:text-base break-all">{props.data.comment}</p>
        {props.data.userID === firebase.auth.currentUser.uid ? (
          <button onClick={deleteComment} className="ml-auto">
            <TrashIcon className="h-6 w-6" />
          </button>
        ) : null}
      </article>
    );
  }
}
