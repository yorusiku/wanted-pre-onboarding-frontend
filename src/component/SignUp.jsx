import { React, useState } from "react";
import { instance } from "../api";
import axios from "axios";

export const SignUp = () => {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
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
    console.log("api", api);
  };

  return (
    <div className="signUp">
      <label>Email :</label>
      <input
        type="email"
        data-testid="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label>Password : </label>
      <input
        type="password"
        data-testid="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button data-testid="signup-button" onClick={createId}>
        회원가입
      </button>
    </div>
  );
};
