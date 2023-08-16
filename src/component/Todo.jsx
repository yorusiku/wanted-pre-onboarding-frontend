import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Todo = () => {
  let [todo, setTodo] = useState(""); // input타이핑해서 todo에 넣을애
  let [checkBoolean, setCheckBoolean] = useState(true); // true일때 수정 , false일 때 제출버튼
  let [createTodo, setCreateTodo] = useState([]); //생성한 todo
  let [createId, setCreateId] = useState(""); //생성한 todo의 ID

  const jwtToken = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  //Assignment 4
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");

    if (!token) return navigate("/signin");
  }, []);

  const handleTodoChange = (e) => {
    const newA = e.target.value;
    setTodo(newA);
  };

  const todoGet = async () => {
    const api = await axios.get(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  };

  const todoCreate = async () => {
    const api = await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo: todo,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => todoGet());
    let apiTodo = api.data.todo;
    let apiId = api.data.id;
    setCreateTodo(apiTodo);
    setCreateId(apiId);

    localStorage.setItem("createTodo", createTodo);
  };

  const todoUpdate = async (id) => {
    try {
      const api = await axios
        .put(
          `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
          {
            todo,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => todoGet());
    } catch (error) {
      console.log("error", error);
    }
  };

  const todoDelete = async (id) => {
    const api = await axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(() => todoGet());
  };

  return (
    // Assignment 5
    <>
      <input data-testid="new-todo-input" onChange={handleTodoChange} />
      <button data-testid="new-todo-add-button" onClick={() => todoCreate()}>
        추가
      </button>
      <li>
        <label>
          <input type="checkbox" />

          {checkBoolean ? (
            <>
              <span>todo1</span>
              <button type="checkbox" onClick={() => todoGet()}>
                수정
              </button>
            </>
          ) : (
            <>
              <input type="text" />

              <button type="checkbox" onClick={() => todoUpdate(createId)}>
                제출
              </button>
            </>
          )}

          <button type="checkbox" onClick={() => todoDelete()}>
            삭제
          </button>
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
