import Post from "./Post";

export default function Home(props) {
  return (
    <div>
      <main className="bg-gray-200 flex justify-center md:py-2">
        <div className="flex flex-col gap-2 max-w-3xl">
          {props.posts.map((post, index) => {
            return <Post data={post} key={index} />;
          }) || null}
        </div>
      </main>
    </div>
  );
}
