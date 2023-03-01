import Logo from "./Logo";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { currUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Logo />
      <div className="user">
        <img src={currUser.photoURL} alt=""></img>
        <p>{currUser.displayName}</p>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
