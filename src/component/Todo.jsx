import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Todo = () => {
  const navigate = useNavigate();
  //Assignment 4
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    console.log("token in Todo", token);
    if (!token) return navigate("/signin");
  }, []);

  return (
    // Assignment 5
    <>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 2</span>
        </label>
      </li>
    </>
  );
};
