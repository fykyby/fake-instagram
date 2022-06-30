import { useState } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/outline";

export default function Upload() {
  const [uploadedImg, setUploadedImg] = useState(null);

  return (
    <div>
      <main className="h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] bg-gray-200 flex justify-center items-center md:py-2">
        <div className="flex justify-center items-center px-3 py-2 sm:px-4 sm:py-3 w-full max-w-3xl h-full bg-white shadow-sm">
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
              />
              <button
                className="w-full h-16 p-2 border flex justify-center items-center shadow-sm"
                onClick={() => {
                  console.log("create post");
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
    </div>
  );
}
