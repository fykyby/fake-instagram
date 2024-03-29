import { TrashIcon } from "@heroicons/react/24/outline";
import { FirebaseContext } from "../App";
import { useContext, useEffect, useState } from "react";

export default function Comment(props) {
  const firebase = useContext(FirebaseContext);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  useEffect(() => {
    setConfirmDeleteVisible(false);
  }, [props.comments]);

  return (
    <article className="flex w-full justify-start place-items-start gap-3 sm:gap-4">
      <div className="h-6 w-6 md:h-7 md:w-7 rounded-full overflow-hidden">
        <img src={props.data.profilePic} height="320px" width="320px" alt="" />
      </div>
      <h6 className="font-bold text-sm md:text-base whitespace-nowrap">
        {props.data.userName}
      </h6>
      <p className="text-sm md:text-base break-all">{props.data.comment}</p>
      {props.data.userID === firebase.auth.currentUser.uid ? (
        <div className="ml-auto mb-[-1rem]">
          {confirmDeleteVisible ? (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  props.deleteComment(props.data.id);
                }}
                className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold focus:outline-black"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setConfirmDeleteVisible(false);
                }}
                className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold focus:outline-black"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDeleteVisible(true)}>
              <TrashIcon className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          )}
        </div>
      ) : null}
    </article>
  );
}
