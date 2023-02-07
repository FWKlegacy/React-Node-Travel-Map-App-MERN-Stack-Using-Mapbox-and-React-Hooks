import React, { useState, useRef } from "react";
import "./Register.css";
import { Room, Cancel } from "@mui/icons-material";
import axios from "axios";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/register", newUser);
      setSuccess(true);
      setFail(false);
    } catch (err) {
      setFail(true);
    }
  };

  return (
    <div className='register-container'>
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
          type='email'
          placeholder='Email Address'
          ref={emailRef}
        />
        <input
          type='password'
          placeholder='Enter password'
          ref={passwordRef}
        />
        <button className='Register'>Submit Registration</button>
        {success && (
          <span className='success'>Successful.You can login now!</span>
        )}
        {fail && <span className='fail'>ERROR!.Something went wrong!</span>}
      </form>
      <Cancel
        className='cancel'
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
