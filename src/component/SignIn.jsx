import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();
  let jwtToken = "";

  //Assignment 4
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    console.log("token in signin", token);
    if (token) return navigate("/todo");
  }, []);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    updateButtonDisabled(newEmail, password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updateButtonDisabled(email, newPassword);
  };
  const updateButtonDisabled = (newEmail, newPassword) => {
    const isValidEmail = newEmail.includes("@");
    const isValidPassword = newPassword.length >= 8;
    setButtonDisabled(!isValidEmail || !isValidPassword);
  };
  const loginId = async () => {
    try {
      const api = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
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
      // Assignment 3
      api.status === 200 ? navigate("/todo") : navigate("/signin");
      jwtToken = api.data.access_token;
      localStorage.setItem("jwtToken", jwtToken);
    } catch (error) {
      console.log("error", error);
    }
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
        data-testid="signin-button"
        disabled={buttonDisabled}
        onClick={() => loginId()}
      >
        로그인
      </button>
    </div>
  );
};
