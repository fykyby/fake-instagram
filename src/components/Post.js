import Avatar from "./Avatar";
import { BiHeart, BiComment } from "react-icons/bi";

export default function Post(props) {
  return (
    <article className="bg-white flex flex-col shadow-sm">
      <section className="px-3 py-2 flex gap-2 items-center justify-start md:py-4">
        <Avatar />
        <h6 className="font-bold text-lg">{props.data.user}</h6>
      </section>
      <img
        src={props.data.img}
        alt=""
        className="w-full max-h-[75vh] object-contain outline outline-1 outline-gray-200"
      />
      <div className="px-3 py-2">
        <section className="pb-2 flex gap-3 items-center justify-start">
          <button>
            <BiHeart size="1.6rem" />
          </button>
          <button className="p2">
            <BiComment size="1.6rem" />
          </button>
        </section>
        <h6 className="font-bold text-sm">{props.data.likes} likes</h6>
        <section className="flex justify-start place-items-start gap-2">
          <h6 className="font-bold">{props.data.user}</h6>
          <p className="">{props.data.msg}</p>
        </section>
        {props.data.comments.length > 0 ? (
          <div>
            <button
              className="text-gray-500 font-bold"
              onClick={() => console.log("comments")}
            >
              Show all comments: {props.data.comments.length}
            </button>
            <section className="flex justify-start place-items-start gap-2">
              <h6 className="font-bold">{props.data.comments[0].user}</h6>
              <p className="">{props.data.comments[0].msg}</p>
            </section>
          </div>
        ) : null}
      </div>
    </article>
  );
}
