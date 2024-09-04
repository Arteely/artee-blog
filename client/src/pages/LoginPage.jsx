import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/sign-in', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Wrong Credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="sign-container">
      <h2>SIGN IN</h2>
      <p>Enter your email and password to sign-in:</p>
      <form className="login" onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={ev => setPassword(ev.target.value)}/>

        <button className="btn-main">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
      <div className="forgot-name">
        <a href="">Forgot your password?</a>
        <div className="vl"></div>
        <a href="">Forgot your username?</a>
      </div>
    </div>
  );
}
