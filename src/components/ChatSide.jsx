import camera from "../images/cam.png";
import add from "../images/add.png";
import threeDots from "../images/more.png";
import Input from "./Input";
import Messages from "./Messages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatSide = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chatSide">
      {data.user?.displayName ? (
        <>
          <div className="chatInfoTop">
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
              <img src={camera} alt="" />
              <img src={add} alt="" />
              <img src={threeDots} alt="" />
            </div>
          </div>

          <Messages />
          <Input />
        </>
      ) : (
        <h2>
          Select a chat from your chat list or search for a new friend and start
          a conversation
        </h2>
      )}
    </div>
  );
};

export default ChatSide;
