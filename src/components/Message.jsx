import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ msgInfo }) => {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // const ref = useRef();
  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [msgInfo]);

  return (
    <div
      // ref={ref}
      className={`message ${msgInfo.senderID === currUser.uid && "owner"}`}
    >
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
