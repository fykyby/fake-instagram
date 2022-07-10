import Avatar from "./Avatar";
import { HeartIcon, AnnotationIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import NavButton from "./NavButton";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../App";
import {
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  increment,
  setDoc,
  collection,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import CommentsWindow from "./CommentsWindow";

export default function Post(props) {
  const firebase = useContext(FirebaseContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(0);
  const [likeIcon, setLikeIcon] = useState(HeartIcon);
  const [localCommentCount, setLocalCommentCount] = useState(0);
  const [lastComment, setLastComment] = useState(null);
  const [commentsWindowVisible, setCommentsWindowVisible] = useState(false);

  useEffect(() => {
    async function setInitialLikeIcon() {
      if (await checkIfLiked()) {
        setLikeIcon(HeartIconSolid);
      } else {
        setLikeIcon(HeartIcon);
      }
    }

    setLocalLikeCount(props.data.likeCount);
    setLocalCommentCount(props.data.commentCount);
    setInitialLikeIcon();
    setLastComment(props.data.lastComment);
  }, []);

  async function handleLikes() {
    if (await checkIfLiked()) {
      setLocalLikeCount((prev) => prev - 1);
      setLikeIcon(HeartIcon);
      removeLike();
      decrementLikeCount();
    } else {
      setLocalLikeCount((prev) => prev + 1);
      setLikeIcon(HeartIconSolid);
      addLike();
      incrementLikeCount();
    }
  }

  async function addLike() {
    await setDoc(
      doc(
        firebase.db,
        "posts",
        props.data.id,
        "likes",
        firebase.auth.currentUser.uid
      ),
      {
        liked: true,
      }
    );
  }

  async function removeLike() {
    await deleteDoc(
      doc(
        firebase.db,
        "posts",
        props.data.id,
        "likes",
        firebase.auth.currentUser.uid
      )
    );
  }

  async function incrementLikeCount() {
    await updateDoc(doc(firebase.db, "posts", props.data.id), {
      likeCount: increment(1),
    });
  }

  async function decrementLikeCount() {
    await updateDoc(doc(firebase.db, "posts", props.data.id), {
      likeCount: increment(-1),
    });
  }

  async function checkIfLiked() {
    const collectionSnap = await getDocs(
      collection(firebase.db, "posts", props.data.id, "likes")
    );

    for (const doc of collectionSnap.docs) {
      if (doc.id === firebase.auth.currentUser.uid) {
        return true;
      }
    }
    return false;
  }

  async function deletePost() {
    setConfirmDeleteVisible(false);
    setDeleted(true);

    await deleteDoc(doc(firebase.db, "posts", props.data.id));

    const imgRef = ref(firebase.storage, `images/${props.data.id}.jpg`);
    await deleteObject(imgRef);
  }

  function showComments() {
    setCommentsWindowVisible(true);
    document.body.style.overflow = "hidden";
  }

  function hideComments() {
    setCommentsWindowVisible(false);
    document.body.style.overflow = "";
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
            <NavButton icon={likeIcon} onClick={handleLikes} classList="p-0" />
            <NavButton
              icon={AnnotationIcon}
              onClick={showComments}
              classList="p-0"
            />
          </section>
          <h6 className="font-bold text-sm">{localLikeCount} likes</h6>
          <section className="flex justify-start place-items-start gap-2">
            <h6 className="font-bold text-sm md:text-base">
              {props.data.userName}
            </h6>
            <p className="text-sm md:text-base">{props.data.caption}</p>
          </section>
          {localCommentCount > 0 ? (
            <div>
              <button
                className="text-gray-500 font-bold"
                onClick={showComments}
              >
                Show all comments: {localCommentCount}
              </button>
              {lastComment ? (
                <section className="flex justify-start items-start gap-2">
                  <h6 className="font-bold text-sm md:text-base whitespace-nowrap">
                    {lastComment.userName}
                  </h6>
                  <p className="text-sm md:text-base break-all">
                    {lastComment.comment}
                  </p>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>
        {commentsWindowVisible ? (
          <CommentsWindow
            data={props.data}
            localCommentCount={localCommentCount}
            setLocalCommentCount={setLocalCommentCount}
            lastComment={lastComment}
            setLastComment={setLastComment}
            hideWindow={hideComments}
          />
        ) : null}
      </article>
    );
  }
}
