import Home from "./components/Home";
import Nav from "./components/Nav";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Login from "./components/Login";
import { useState } from "react";

import ExamplePostImg from "./images/rui.png";
import ExamplePostImg2 from "./images/rui2.jpg";
const postArr = [
  {
    user: "user1",
    img: ExamplePostImg,
    msg: "example post message example post message example post message example post message",
    likes: 31074,
    comments: [
      {
        user: "useeeeer",
        msg: "example comment",
      },
      {
        user: "another user",
        msg: "and another example comment",
      },
    ],
  },
  {
    user: "user2",
    img: ExamplePostImg2,
    msg: "example post message example post message",
    likes: 21823,
    comments: [
      {
        user: "useeeeer",
        msg: "example comment",
      },
    ],
  },
];
const firebaseConfig = {
  apiKey: "AIzaSyCcxe-uHg2CZm2SLuEcVzfTyOD15DB3g08",
  authDomain: "fake-instagram-f668b.firebaseapp.com",
  projectId: "fake-instagram-f668b",
  storageBucket: "fake-instagram-f668b.appspot.com",
  messagingSenderId: "688470837553",
  appId: "1:688470837553:web:4685bdc333c0b2059b0810",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [posts, setPosts] = useState(postArr);

  async function logIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logOut() {
    signOut(auth);
  }

  onAuthStateChanged(auth, (user) => {});

  if (!auth.currentUser) {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home auth={auth} posts={posts} />} />
          <Route path="/search" element={<Search posts={posts} />} />
        </Routes>
        <Nav />
      </BrowserRouter>
    );
  } else {
    return <Login />;
  }
}
