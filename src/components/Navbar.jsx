import Logo from "./Logo";
import avatarIcon from "../images/avatarIcon.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo />
      <div className="user">
        <img src={avatarIcon} alt=""></img>
        <p>Shenhav Dafadi</p>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
