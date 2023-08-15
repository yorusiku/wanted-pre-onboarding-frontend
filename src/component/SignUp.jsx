import { React, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

export const SignUp = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [buttonDisabled, setButtonDisabled] = useState(true);
  let [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    updateButtonDisabled(newEmail, password);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    updateButtonDisabled(email, newPassword);
  };
  //Assignment 1
  const updateButtonDisabled = (newEmail, newPassword) => {
    const isValidEmail = newEmail.includes("@");
    const isValidPassword = newPassword.length >= 8;
    setButtonDisabled(!isValidEmail || !isValidPassword);
  };

  const createId = async () => {
    const api = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return api.status === 201 ? setLoggedIn(true) : setLoggedIn(false);
  };

  return (
    <div className="signUp">
      <label>Email :</label>
      <input
        type="email"
        data-testid="email-input"
        value={email}
        onChange={handleEmailChange}
      ></input>
      <label>Password : </label>
      <input
        type="password"
        data-testid="password-input"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <button
        data-testid="signup-button"
        disabled={buttonDisabled}
        onClick={() => createId()}
      >
        회원가입
      </button>
    </div>
  );
};
