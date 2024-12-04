import React, { FC, useState } from "react";

export interface TodoEditFormProps {
  onSave: (newDescription: string) => void;
}

export const TodoEditForm: FC<TodoEditFormProps> = ({ onSave }) => {
  const [newDescription, setNewDescription] = useState('');

  const handleEditDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDescription.trim()) {
      onSave(newDescription.trim());
      setNewDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newDescription}
        onChange={handleEditDescription}
        type="text"
        placeholder="Edit description"
      />
      <button type="submit">Save</button>
    </form>
  );
};