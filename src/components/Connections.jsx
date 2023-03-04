import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import imgIcon from "../images/lastMsgImg.png";

const Connections = () => {
  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currUser.uid && getChats();
  }, [currUser.uid]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="connections">
      <h3>Chats:</h3>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const lastMsg = chat[1].lastMessage?.text;
          const lastMsgImg = chat[1].lastMessage?.hasImage;

          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <br />
                <p>
                  {lastMsgImg ? (
                    <img
                      src={imgIcon}
                      alt=""
                      style={{
                        height: "20px",
                        width: "70px",
                        borderRadius: "0",
                      }}
                    ></img>
                  ) : // else
                  lastMsg?.length > 35 ? (
                    lastMsg.substring(0, 35) + "..."
                  ) : (
                    lastMsg
                  )}
                </p>

                {/*  */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
