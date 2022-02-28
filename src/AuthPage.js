import React from 'react';
import { useState } from 'react';
import { signInUser, signUpUser } from './fetch-utils';

export default function AuthPage({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function clearForm() {
    setEmail('');
    setPassword('');
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const user = await signUpUser(email, password);
    setCurrentUser(user);
    clearForm();
  }
  async function handleSignIn(e) {
    e.preventDefault();
    const user = await signInUser(email, password);
    setCurrentUser(user);
    clearForm();
  }

  return <div></div>;
}
