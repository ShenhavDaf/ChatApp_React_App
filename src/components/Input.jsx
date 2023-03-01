import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import attach from "../images/attach.png";
import img from "../images/img.png";
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
  };

  return (
    <div className="inputPanel">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
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
          <img src={img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
