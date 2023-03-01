import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ msgInfo }) => {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className={`message ${msgInfo.senderID === currUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            msgInfo.senderID === currUser.uid
              ? currUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <img src={msgInfo.image} alt="" />
        {msgInfo.text && <p>{msgInfo.text}</p>}
        <span>Just now</span>
      </div>
    </div>
  );
};

export default Message;
