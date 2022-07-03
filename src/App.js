import { useState, createContext, useEffect } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Search from "./components/Search";
import TopBar from "./components/TopBar";
import Upload from "./components/Upload";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

export const FirebaseContext = createContext();

export default function App() {
  const [firebase, setFirebase] = useState(FirebaseContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setFirebase({
      app: app,
      auth: auth,
      db: db,
      storage: storage,
    });
  }, []);

  // signInAnonymously?
  async function logIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logOut() {
    signOut(auth);
  }

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);

    const newFirebase = firebase;
    newFirebase.auth = auth;
    setFirebase(newFirebase);
  });

  if (currentUser) {
    return (
      <BrowserRouter basename="/">
        <FirebaseContext.Provider value={firebase}>
          <TopBar logout={logOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
          <Nav logout={logOut} />
        </FirebaseContext.Provider>
      </BrowserRouter>
    );
  } else {
    return <Login login={logIn} />;
  }
}
