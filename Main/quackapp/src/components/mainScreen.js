import "../css/App.css";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { storeDB } from "../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function MainScreen({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    Added();
    const getWholePage = document.querySelector(".logOutButton");
    getWholePage.addEventListener("click", function () {
      const getInnerPart = document.querySelector(".containers");
      getInnerPart.innerHTML = "";
    });
  }, []);

  function Added() {
    const addedList = document.querySelector(".AddedFriend");
    if (addedList != null) {
      addedList.innerHTML = "";
    }
    addedList.innerHTML = "Added Friends";
    const docRef = doc(storeDB, "user", user);
    getDoc(docRef).then((a) => {
      for (let i = 0; i < a.data().friends.length; ++i) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("Addedfriends");
        newDiv.innerText = a.data().friends[i].Friend;
        const removeFriend = document.createElement("div");
        removeFriend.addEventListener("click", function clickRemove(event) {
          const docRef = doc(storeDB, "user", user);
          getDoc(docRef).then((a) => {
            let arrayOfFriends = a.data().friends;
            const indexOfData = arrayOfFriends.findIndex(
              (e) => e.Friend == event.target.previousSibling.data
              // event.target.parentNode.childNodes[0].data
            );
            arrayOfFriends.splice(indexOfData, 1);
            updateDoc(docRef, { friends: arrayOfFriends });
            findFriends();
            Added();
          });
        });
        removeFriend.classList.add("Remove");
        removeFriend.innerText = "Remove";
        newDiv.style.display = "flex";
        newDiv.style.flexDirection = "row";
        newDiv.style.justifyContent = "center";
        newDiv.append(removeFriend);
        addedList.append(newDiv);
      }
    });
  }

  async function findFriends() {
    const q = collection(storeDB, "user");
    const querySnapshot = await getDocs(q);
    if (document.querySelector(".containers").innerHTML != null) {
      document.querySelector(".containers").innerHTML = "";
    }
    const docRef = doc(storeDB, "user", user);
    let fixedVal = [];
    await getDoc(docRef).then((snap) => {
      for (let i = 0; i < snap.data().friends.length; ++i) {
        fixedVal.push(snap.data().friends[i].Friend);
      }
      fixedVal.push(user);
    });
    querySnapshot.forEach((docs) => {
      if (!fixedVal.includes(docs.data().userInfo)) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("friends");
        newDiv.innerText = docs.data().userInfo;
        const addfriend = document.createElement("div");
        addfriend.addEventListener("click", function clickAdd(event) {
          const docRef = doc(storeDB, "user", user);
          const Friend =
            event.target.parentNode.children[0].previousSibling.data;
          getDoc(docRef).then((a) => {
            let arrayOfFriends = a.data().friends;
            arrayOfFriends.push({ Friend });
            updateDoc(docRef, { friends: arrayOfFriends });
            findFriends();
            Added();
          });
        });
        addfriend.classList.add("Add");
        addfriend.innerText = " Add ";

        newDiv.style.display = "flex";
        newDiv.style.flexDirection = "row";
        newDiv.style.justifyContent = "center";
        const getDiv = document.querySelector(".containers");
        newDiv.append(addfriend);
        getDiv.append(newDiv);
      }
    });
  }

  const startGame = () => {
    navigate("/CreateUser");
  };

  const viewProfile = () => {
    navigate("/UserProfile");
  };

  const chat = () => {
    navigate("/Chat");
  };

  function achievement() {
    navigate("/achievement");
  }

  const startSingleGame = () => {
    var win = window.open("https://playermove.vercel.app/", "_blank");
    win.focus();
  };

  function LogOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="logOutButton">
      <h1>Your Profile</h1>
      <div className="friendList">
        <label htmlFor="">Search Friends</label>
        <input type="text" onClick={findFriends} />
        <div className="containers"></div>
      </div>
      <div className="AddedFriend">
        <label htmlFor="">Added Friends</label>
      </div>
      {user}
      <button onClick={viewProfile}>View User Profile</button>
      <button onClick={chat}>Chat</button>
      <button onClick={achievement}>View Achievement</button>
      <button onClick={startSingleGame}>Start Game</button>
      <button onClick={startGame}>Multiplayer (Coming soon)</button>
      <a onClick={LogOut} style={{ margin: "1rem" }} href="./">
        Log Out
      </a>
    </div>
  );
}
