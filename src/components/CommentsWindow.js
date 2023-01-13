import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  increment,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../App";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import InfiniteScroll from "react-infinite-scroller";
import Comment from "./Comment";

export default function CommentsWindow(props) {
  const commentLoadLimit = 10;

  const firebase = useContext(FirebaseContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [nextQuery, setNextQuery] = useState(
    query(
      collection(firebase.db, "posts", props.data.id, "comments"),
      orderBy("timestamp", "desc"),
      limit(commentLoadLimit)
    )
  );
  const [moreToLoad, setMoreToLoad] = useState(true);

  function handleChange(e) {
    setComment(e.target.value);
  }

  async function addComment() {
    if (comment === "") return;

    const newComment = {
      userID: firebase.auth.currentUser.uid,
      userName: firebase.auth.currentUser.displayName,
      profilePic: firebase.auth.currentUser.photoURL,
      comment: comment,
      timestamp: Date.now(),
      postID: props.data.id,
    };

    const docRef = await addDoc(
      collection(firebase.db, "posts", props.data.id, "comments"),
      {
        ...newComment,
      }
    );
    newComment.id = docRef.id;

    setLastComment(newComment);
    incrementCommentCount();
    props.setLocalCommentCount((prev) => prev + 1);
    setComments((prev) => [{ ...newComment }, ...prev]);
    setComment("");
  }

  async function deleteComment(commentID) {
    await deleteDoc(
      doc(firebase.db, "posts", props.data.id, "comments", commentID)
    );
    decrementCommentCount();

    const index = comments.findIndex((comm) => {
      return comm.id === commentID;
    });

    const newComments = comments;
    newComments.splice(index, 1);

    props.setLocalCommentCount((prev) => prev - 1);

    if (newComments.length <= 0) {
      setLastComment(null);
    } else if (index === 0) {
      setLastComment(newComments[0]);
    }

    setComments([...newComments]);
  }

  async function incrementCommentCount() {
    await updateDoc(doc(firebase.db, "posts", props.data.id), {
      commentCount: increment(1),
    });
  }

  async function decrementCommentCount() {
    await updateDoc(doc(firebase.db, "posts", props.data.id), {
      commentCount: increment(-1),
    });
  }

  async function setLastComment(newVal) {
    props.setLastComment(newVal);
    await updateDoc(doc(firebase.db, "posts", props.data.id), {
      lastComment: newVal,
    });
  }

  async function loadMoreComments() {
    try {
      const documentSnapshots = await getDocs(nextQuery);
      const newComments = comments;

      for (const i of documentSnapshots.docs) {
        const data = i.data();
        const newComment = {
          ...data,
          id: i.id,
        };

        // Prevent repeated comments
        if (newComments.some((e) => e.id === newComment.id)) continue;
        newComments.push(newComment);
      }

      setComments([...newComments]);

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setNextQuery(
        query(
          collection(firebase.db, "posts", props.data.id, "comments"),
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(commentLoadLimit)
        )
      );
    } catch (err) {
      setMoreToLoad(false);
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) props.hideWindow();
      }}
      className="fixed z-10 left-0 top-0 w-full h-full bg-black/40 flex flex-col justify-center items-center"
    >
      <section className="flex px-3 py-2 justify-end items-center bg-white outline-gray-200 outline outline-1 w-full max-w-[48rem]">
        <button onClick={props.hideWindow}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </section>
      <div className="flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 bg-white outline-gray-200 outline outline-1 w-full max-w-[48rem] min-h-[6rem] max-h-[65vh] overflow-y-auto">
        <section className="flex">
          <textarea
            placeholder="Add comment"
            className="border px-2 py-1 h-20 resize-none w-full shadow-sm"
            maxLength="250"
            value={comment}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="w-20 flex justify-center items-center border shadow-sm"
            onClick={addComment}
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </section>
        <InfiniteScroll
          loadMore={loadMoreComments}
          pageStart={0}
          hasMore={moreToLoad}
          useWindow={false}
          threshold={200}
        >
          <section className="flex flex-col gap-4 items-center justify-start">
            {comments.map((comm, index) => {
              return (
                <Comment
                  data={comm}
                  key={index}
                  deleteComment={deleteComment}
                  comments={comments}
                />
              );
            }) || null}
          </section>
        </InfiniteScroll>
      </div>
    </div>
  );
}
