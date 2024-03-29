import { useState, useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FirebaseContext } from "../App";
import { addDoc, collection } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { Link } from "react-router-dom";

export default function Upload() {
  const firebase = useContext(FirebaseContext);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [postUploaded, setPostUploaded] = useState(false);
  const [caption, setCaption] = useState("");

  function handleChange(e) {
    setCaption(e.target.value);
  }

  async function createPost(postData) {
    setPostUploaded(true);

    const docRef = await addDoc(collection(firebase.db, "posts"), {
      userID: firebase.auth.currentUser.uid,
      userName: firebase.auth.currentUser.displayName,
      profilePic: firebase.auth.currentUser.photoURL,
      caption: postData.caption,
      likeCount: 0,
      commentCount: 0,
      lastComment: null,
      timestamp: Date.now(),
    });
    const imageRef = ref(firebase.storage, `images/${docRef.id}.jpg`);
    uploadBytes(imageRef, postData.img);
  }

  if (postUploaded) {
    return (
      <main className="h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-gray-200 flex justify-center items-center md:py-2">
        <div className="flex flex-col justify-center items-center px-3 py-2 sm:px-4 sm:py-3 w-full max-w-[48rem] h-full bg-white shadow-sm">
          <div>Upload successful</div>
          <Link to="/">
            <div className="font-semibold p-2">Click here to return</div>
          </Link>
        </div>
      </main>
    );
  } else {
    return (
      <main className="h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-gray-200 flex justify-center items-center md:py-2">
        <div className="flex justify-center items-center px-3 py-2 sm:px-4 sm:py-3 w-full max-w-[48rem] h-full bg-white shadow-sm">
          {uploadedImg ? (
            <div className="w-full flex flex-col gap-2 items-center">
              <img
                src={URL.createObjectURL(uploadedImg)}
                alt=""
                className="w-full max-h-[40vh] object-contain outline outline-1 outline-gray-200 shadow-sm"
              />
              <textarea
                placeholder="Add caption"
                className="border px-2 py-1 h-28 resize-none w-full shadow-sm"
                maxLength="350"
                value={caption}
                onChange={(e) => handleChange(e)}
              />
              <button
                className="w-full h-16 p-2 border flex justify-center items-center shadow-sm"
                onClick={() => {
                  createPost({
                    img: uploadedImg,
                    caption: caption,
                  });
                }}
              >
                <CheckIcon className="h-full w-auto" />
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setUploadedImg(e.target.files[0]);
                }}
                id="uploadBtn"
                hidden
              />
              <label htmlFor="uploadBtn">
                <PlusIcon className="h-32 w-32 p-10 border shadow-sm cursor-pointer" />
              </label>
            </div>
          )}
        </div>
      </main>
    );
  }
}
