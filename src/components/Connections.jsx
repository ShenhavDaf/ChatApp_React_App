import avatarIcon from "../images/avatarIcon.png";

const Connections = () => {
  return (
    <div className="connections">
      <div className="userChat">
        <img src={avatarIcon} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img src={avatarIcon} alt="" />
        <div className="userChatInfo">
          <span>Shenhav</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="userChat">
        <img src={avatarIcon} alt="" />
        <div className="userChatInfo">
          <span>bla bla</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Connections;
