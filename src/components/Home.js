import Post from "./Post";

export default function Home(props) {
  return (
    <div>
      <main className="bg-gray-200 flex justify-center">
        <div className="flex flex-col gap-2 max-w-3xl md:py-2">
          {props.posts.map((post, index) => {
            return <Post data={post} key={index} />;
          }) || null}
        </div>
      </main>
    </div>
  );
}
