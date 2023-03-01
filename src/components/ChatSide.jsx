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
    </div>
  );
};

export default ChatSide;
