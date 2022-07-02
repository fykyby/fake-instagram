import Avatar from "./Avatar";
import { HeartIcon, AnnotationIcon, TrashIcon } from "@heroicons/react/outline";
import NavButton from "./NavButton";
import { useState, useContext } from "react";
import { FirebaseContext } from "../App";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export default function Post(props) {
  const firebase = useContext(FirebaseContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function deletePost() {
    setConfirmDeleteVisible(false);
    setDeleted(true);

    await deleteDoc(doc(firebase.db, "posts", props.data.id));

    const imgRef = ref(firebase.storage, `images/${props.data.id}.jpg`);
    await deleteObject(imgRef);
  }

  if (deleted) {
    return (
      <article className="bg-white flex flex-col shadow-sm w-full max-w-[48rem]">
        <section className="flex justify-between">
          <div className="px-3 py-2 sm:px-4 sm:py-3 flex gap-3 sm:gap-4 items-center justify-start">
            <Avatar src={props.data.profilePic} />
            <h6 className="font-bold text-md md:text-lg">
              {props.data.userName}
            </h6>
          </div>
        </section>
        <section className="flex items-center justify-center h-32 font-semibold">
          Post Deleted
        </section>
      </article>
    );
  } else {
    return (
      <article className="bg-white flex flex-col shadow-sm w-full max-w-[48rem]">
        <section className="flex justify-between">
          <div className="px-3 py-2 sm:px-4 sm:py-3 flex gap-3 sm:gap-4 items-center justify-start">
            <Avatar src={props.data.profilePic} />
            <h6 className="font-bold text-md md:text-lg">
              {props.data.userName}
            </h6>
          </div>
          {firebase.auth.currentUser.uid === props.data.userID ? (
            <div className="flex items-center justify-end px-3 py-2 sm:px-4 sm:py-3 gap-3">
              {confirmDeleteVisible ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      deletePost();
                    }}
                    className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDeleteVisible(false);
                    }}
                    className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <NavButton
                  icon={TrashIcon}
                  onClick={() => {
                    setConfirmDeleteVisible(true);
                  }}
                  classList="p-0"
                />
              )}
            </div>
          ) : null}
        </section>
        <img
          src={props.data.img}
          alt=""
          className="w-full max-h-[75vh] object-contain outline outline-1 outline-gray-200"
          onLoad={() => setImgLoaded(true)}
          style={{
            display: imgLoaded ? "" : "none",
          }}
        />
        {imgLoaded ? null : <div className="h-96" />}
        <div className="px-3 py-2 sm:px-4 sm:py-4">
          <section className="pb-2 flex gap-3 md:gap-5 items-center justify-start">
            <NavButton icon={HeartIcon} classList="p-0" />
            <NavButton icon={AnnotationIcon} classList="p-0" />
          </section>
          <h6 className="font-bold text-sm">{props.data.likeCount} likes</h6>
          <section className="flex justify-start place-items-start gap-2">
            <h6 className="font-bold text-sm md:text-base">
              {props.data.userName}
            </h6>
            <p className="text-sm md:text-base">{props.data.caption}</p>
          </section>
          {props.data.commentCount > 0 ? (
            <div>
              <button
                className="text-gray-500 font-bold"
                onClick={() => console.log("comments")}
              >
                Show all comments: {props.data.commentCount}
              </button>
              {props.data.lastComment ? (
                <section className="flex justify-start place-items-start gap-2">
                  <h6 className="font-bold">{props.data.lastComment.user}</h6>
                  <p className="">{props.data.lastComment.msg}</p>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>
    );
  }
}
