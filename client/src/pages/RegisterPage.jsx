import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage () {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();

         const response = await fetch('http://localhost:4000/sign-up', {
            method: 'POST',
            body: JSON.stringify({username,password,email,firstname,lastname}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
          alert('Registration successful.');
        } else {
          alert('Registration failed');
        }
    }

    return (
        <div className="sign-container" onSubmit={register}>
          <h2>SIGN UP</h2>
          <p>Enter a username and password to sign-up:</p>
          <form className="login">
            <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            <div>
            <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={ev => setFirstName(ev.target.value)}/>

            <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={ev => setLastName(ev.target.value)}/>

            </div>

            <input 
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={ev => setEmail(ev.target.value)}/>
            
            <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}/>
            <button className="btn-main">Register</button>
          </form>
          <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
        </div>
      );

}