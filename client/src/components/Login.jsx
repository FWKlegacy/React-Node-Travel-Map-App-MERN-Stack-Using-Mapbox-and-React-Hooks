import React, { useState, useRef } from "react";
import "./Register.css";
import { Room, Cancel } from "@mui/icons-material";
import axios from "axios";
import "./Login.css";

export default function LOGIN({ setShowLogin, myStorage, setCurrentUser }) {
  const [fail, setFail] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);

      setShowLogin(false);
      setFail(false);
    } catch (err) {
      setFail(true);
    }
  };

  return (
    <div className='login-container'>
      <div className='logo'>
        <Room />
        BrevianPin
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          ref={nameRef}
        />
        <input
          type='password'
          placeholder='Enter password'
          ref={passwordRef}
        />
        <button className='Login'>LogIn</button>
        {fail && <span className='fail'>ERROR!.Something went wrong!</span>}
      </form>
      <Cancel
        className='cancel-login'
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
}
