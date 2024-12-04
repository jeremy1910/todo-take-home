export async function getTodos() {
  const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`);
  if (resp.ok) {
    const todos = await resp.json();
    return todos;
  }
  throw new Error("Unable to fetch todo list");
}

export async function addTodo(description: string) {
  const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  if (resp.ok) {
    return resp.json();
  }

  throw new Error("Unable to add todo");
}

export async function deleteTodo(id: number) {
  const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (resp.ok) {
    return true;
  }

  throw new Error("Unable to delete todo");
}

export async function toggleTodo(id: number, isCompleted: boolean) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: isCompleted }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function editDescriptionTodo(id: number, description: string) {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
