import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      //
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <Logo />
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
          {error && (
            <span style={{ color: "red" }}>Incorrect email or password</span>
          )}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
