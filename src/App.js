import "./App.css";
import React, { Component }  from 'react';
import FileViewer from "./components/FileViewer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
function App() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState();
  const [searchText, setSearchText] = useState("");
  const handleLogin = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => setUser(result.user))
        .catch((error) => alert(error.massege));
    }
  };
  const getFiles = () => {
    getDocs(collection(db, "myFiles")).then((item) => {
      setFiles(
        item.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Header
            userPhoto={user?.photoURL}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <div className="app__main">
            <Sidebar getFiles={getFiles} />
            <FileViewer
              files={files}
              setFile={setFiles}
              getFiles={getFiles}
              searchText={searchText}
            />
          </div>
        </>
      ) : (
        <div className="app_login">
          <img src="logo512.png" alt="Storage" />
          <button onClick={handleLogin}>Log in to Storage</button>
        </div>
      )}
    </div>
  );
}

export default App;
