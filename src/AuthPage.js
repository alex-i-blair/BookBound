import React from 'react';
import './styles/AuthPage.css';
import { useState } from 'react';
import { signInUser, signUpUser } from './services/fetch-utils';

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

  return (
    <>
      <header className="App-header">BookBound 📚</header>
      <div className="auth-page">
        <section className="sign-in-form-container">
          <form className="sign-in-form" onSubmit={handleSignIn}>
            <input
              required
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="auth-btns">
              <button className="sign-in-btn">Sign In</button>
              <button className="sign-up-btn" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
