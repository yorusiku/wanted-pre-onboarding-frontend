import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  let token = localStorage.getItem("jwtToken");

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  //Assignment 4
  useEffect(() => {
    console.log("token in signup", token);
    if (token) return navigate("/todo");
  }, []);

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
    try {
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
      // Assignment 2
      console.log(token);
      api.status === 201 ? navigate("/signin") : navigate("/signup");
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
        data-testid="signup-button"
        disabled={buttonDisabled}
        onClick={() => createId()}
      >
        회원가입
      </button>
    </div>
  );
};
