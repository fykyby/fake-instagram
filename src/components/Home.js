import Post from "./Post";

export default function Home(props) {
  return (
    <div>
      <main className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] bg-gray-200 flex justify-center md:py-2">
        <div className="flex flex-col gap-2 max-w-3xl">
          {props.posts.map((post, index) => {
            return <Post data={post} key={index} />;
          }) || null}
        </div>
      </main>
    </div>
  );
}
