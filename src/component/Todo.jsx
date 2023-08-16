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
    <>
      <div>todo</div>
    </>
  );
};
