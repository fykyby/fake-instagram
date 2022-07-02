import Avatar from "./Avatar";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";
import NavButton from "./NavButton";
import { useState } from "react";

export default function Post(props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className="bg-white flex flex-col shadow-sm w-full max-w-[48rem]">
      <section className="px-3 py-2 sm:px-4 sm:py-3 flex gap-3 sm:gap-4 items-center justify-start">
        <Avatar />
        <h6 className="font-semibold text-lg md:text-xl">
          {props.data.userName}
        </h6>
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
          <h6 className="font-bold">{props.data.userName}</h6>
          <p className="">{props.data.caption}</p>
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
