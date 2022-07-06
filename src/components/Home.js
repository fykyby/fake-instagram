import Post from "./Post";
import { useContext, useState } from "react";
import {
  query,
  collection,
  limit,
  getDocs,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { FirebaseContext } from "../App";
import InfiniteScroll from "react-infinite-scroller";

export default function Home() {
  const imgLoadLimit = 4;
  const firebase = useContext(FirebaseContext);
  const [nextQuery, setNextQuery] = useState(
    query(
      collection(firebase.db, "posts"),
      orderBy("timestamp", "desc"),
      limit(imgLoadLimit)
    )
  );
  const [moreToLoad, setMoreToLoad] = useState(true);
  const [posts, setPosts] = useState([]);

  async function loadMorePosts() {
    try {
      const documentSnapshots = await getDocs(nextQuery);
      const newPosts = posts;

      for (const i of documentSnapshots.docs) {
        const imgRef = ref(firebase.storage, `images/${i.id}.jpg`);
        const url = await getDownloadURL(imgRef);
        const urlResponse = await url;

        const data = i.data();

        const newPost = {
          ...data,
          img: urlResponse,
          id: i.id,
        };

        // Prevent repeated posts
        if (newPosts.some((e) => e.id === newPost.id)) continue;

        newPosts.push(newPost);
      }

      setPosts([...newPosts]);

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setNextQuery(
        query(
          collection(firebase.db, "posts"),
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(imgLoadLimit)
        )
      );
    } catch (err) {
      setMoreToLoad(false);
    }
  }

  return (
    <InfiniteScroll
      loadMore={loadMorePosts}
      pageStart={0}
      hasMore={moreToLoad}
      useWindow={true}
      threshold={200}
    >
      <main className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] bg-gray-200 flex justify-center md:py-2 mb-12 sm:mb-0">
        <div className="flex flex-col justify-start items-center gap-2 w-screen">
          {posts.map((post, index) => {
            return <Post data={post} key={index} />;
          }) || null}
        </div>
      </main>
    </InfiniteScroll>
  );
}
