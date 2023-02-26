import avatarIcon from "../images/avatarIcon.png";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={avatarIcon} alt="" />
      </div>
      <div className="messageContent">
        <p>This is a message</p>
        <span>Just now</span>
        {/* <img
          src="https://cdn.pixabay.com/photo/2021/10/01/18/53/corgi-6673343_960_720.jpg"
          alt=""
        /> */}
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Message;
