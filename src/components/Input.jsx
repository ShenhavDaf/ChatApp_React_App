import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import attach from "../images/attach.png";
import img from "../images/img.png";
import { v4 as uuid } from "uuid";

// Firebase
import { db, storage } from "../firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "Chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                image: downloadURL,
                senderID: currUser.uid,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
    }
    //
    else {
      await updateDoc(doc(db, "Chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        hasImage: image && true,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        hasImage: image && true,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="inputPanel">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => e.code === "Enter" && handleSend()}
      />
      <div className="inputIcons">
        <img src={attach} alt="" />

        <input
          type="file"
          style={{ display: "none" }}
          id="addFile"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="addFile">
          <img src={image ? URL.createObjectURL(image) : img} alt="" />
        </label>
        <button
          style={{ backgroundColor: (text || image) && "#2f2d52" }}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
