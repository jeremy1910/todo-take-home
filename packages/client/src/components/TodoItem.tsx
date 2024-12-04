import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";
import { Todo } from "../types";
import { TodoEditForm } from "./TodoEditForm";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  todo: Todo;
  toggle?: (id: number, isCompleted: boolean) => void;
  handleEditdescription: any;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, toggle, handleEditdescription }) => {
  const { id, completed, description } = todo;

  const handleToggle = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      console.log(todo);
      console.log("hi there", e.target.checked, id);
      toggle && toggle(id, !!e.target.checked);
    },
    [todo, id]
  );

  const handleSaveDescription = (newDescription: string) => handleEditdescription(id, newDescription);


  return (
    <Wrapper>
      <Checkbox
        type="checkbox"
        id={`${id}`}
        checked={completed}
        onChange={handleToggle}
      />
      <Label checked={completed}>{description}</Label>
      <TodoEditForm
        onSave={handleSaveDescription}
      />
    </Wrapper>
  );
};
