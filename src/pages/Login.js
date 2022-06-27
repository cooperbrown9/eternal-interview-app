import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from "baseui/button";
import { Input } from "baseui/input";

import { login } from "../api/auth";

const Login = ({ context }) => {
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')

    const router = useHistory();

  async function onLogin() {
    try {
        const { data: user } = await login(email, pw)
        await context.setUser(user)
        console.log('USER LOGIN', user)
        router.push('/profile/' + user._id)
    } catch(e) {
        console.log('BRUH', e)
    }
  }

  return (
    <div className='page p-32'>
      <p className='text-4xl font-bold mb-4' style={{ color: "white" }}>
        Login
      </p>
      <div className='card mb-4'>
        <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div style={{ height: 12 }} />
        <Input placeholder='Password' type='password' value={pw} onChange={(e) => setPw(e.target.value)}/>
        <div style={{ height: 24 }} />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
};

export { Login }
