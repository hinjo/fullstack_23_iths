import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [nickname, setNickname] = useState("hinjo");
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  function getProfile() {
    // setNickname(prompt("Enter your nickname: "));

    if (nickname !== null && nickname !== "") {
      fetch("/" + nickname)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProfile(data[0]);
        });
    }
  }

  function fetchPosts() {
    if (profile !== null) {
      fetch("/posts/" + profile.id)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((result) => {
          console.log(result);
          setPosts(result);
        });
    }
  }

  useEffect(getProfile, []);
  useEffect(fetchPosts, [profile]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Hej
          {profile !== null && profile !== {} && profile.name !== undefined
            ? " " + profile.name + " " + profile.lastname
            : " Stranger"}
        </p>
        <h1>Your posts:</h1>
        {posts !== null && posts.length !== []
          ? posts.map((value, index) => <p key={index}> {value.post}</p>)
          : ""}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
