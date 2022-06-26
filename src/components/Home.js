import Post from "./Post";
import TopBar from "./TopBar";
import Login from "./Login";

export default function Home(props) {
  return (
    <div>
      <TopBar />
      <main className="pb-12">
        {/* {global.posts.map((post, index) => {
          return <Post data={post} key={index} />;
        }) || null} */}
      </main>
    </div>
  );
}
