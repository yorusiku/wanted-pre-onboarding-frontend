import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "../src/component/SignUp";
import { SignIn } from "../src/component/SignIn";
import { Todo } from "../src/component/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
