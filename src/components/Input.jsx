import attach from "../images/attach.png";
import img from "../images/img.png";

const Input = () => {
  return (
    <div className="inputPanel">
      <input type="text" placeholder="Type something..." />
      <div className="inputIcons">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="addFile" />
        <label htmlFor="addFile">
          <img src={img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
