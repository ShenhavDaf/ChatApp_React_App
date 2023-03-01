import { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [inputName, setInputName] = useState("");
  const [friend, setFriend] = useState(null);
  const [error, setError] = useState(false);

  const { currUser } = useContext(AuthContext);

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch();
  // };

  const handleSearch = async (e) => {
    if (e.code !== "Enter" && e.code !== "Space") setFriend(null);

    const Query = query(
      collection(db, "Users"),
      where("displayName", "==", inputName)
    );

    try {
      const users = await getDocs(Query);
      if (users.docs.length === 0) setError(true);
      else {
        setError(false);

        users.forEach((user) => {
          setFriend(user.data());
        });
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleSelect = async () => {
    const combinedID =
      currUser.uid > friend.uid
        ? currUser.uid + friend.uid
        : friend.uid + currUser.uid;

    try {
      const res = await getDoc(doc(db, "Chats", combinedID));

      // Chat between currentUser & selected friend dosen't exist
      if (!res.exists()) {
        // Create collection
        await setDoc(doc(db, "Chats", combinedID), { messages: [] });

        // Create user chats (for both - curr & friend)
        await updateDoc(doc(db, "userChats", currUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: friend.uid,
            displayName: friend.displayName,
            photoURL: friend.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", friend.uid), {
          [combinedID + ".userInfo"]: {
            uid: currUser.uid,
            displayName: currUser.displayName,
            photoURL: currUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }

      //
    } catch (err) {
      setError(true);
    }

    setFriend(null);
    setInputName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setInputName(e.target.value)}
          // onKeyDown={handleKey}
          // onKeyDown={handleSearch}
          onKeyUp={handleSearch}
          value={inputName}
        />
      </div>
      {!friend && inputName !== "" && error && <span>User not found</span>}
      {friend && (
        <div className="userChat" onClick={handleSelect}>
          <img src={friend.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{friend.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
