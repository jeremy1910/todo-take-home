import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

import "./App.css";

import * as API from "./api";
import { Todo } from "./types";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      API.getTodos().then(setTodos);
    } catch (err) {
      console.log("failed to fetch todos", err);
    }
  }, []);

  const addTodo = async (description: string) => {
    const tempTodo = {
      id: Date.now(),
      description,
      completed: false,
    };

    setTodos((prev) => [...prev, tempTodo]);

    try {
      const newTodo = await API.addTodo(description);
      console.log('newTodo', newTodo)
      setTodos((prev) =>
        prev.map((todo) => (todo.id === tempTodo.id ? newTodo : todo))
      );
    } catch (err) {
      console.error("Failed to add todo", err);
      setTodos((prev) => prev.filter((todo) => todo.id !== tempTodo.id));
    }
  };

  const handleChange = useCallback(async (id: number, isCompleted: boolean) => {
    const previousTodos = [...todos];
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: isCompleted } : todo))
    );

    try {
      await API.toggleTodo(id, isCompleted);
    } catch (err) {
      console.error("Failed to update todo status", err);
      setTodos(previousTodos);
    }
  }, [todos]);


  const handleEditdescription = useCallback(async (id: number, description: string) => {
    const previousTodos = [...todos];
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, description } : todo)));

    try {
      await API.editDescriptionTodo(id, description);
    } catch (err) {
      console.error("Failed to update description", err);
      setTodos(previousTodos);
    }
  }, [todos]);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem todo={todo} toggle={handleChange} handleEditdescription={handleEditdescription} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
