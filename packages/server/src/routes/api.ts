import { Router } from "express";

import { ITodoProperties, Todo } from "../models/Todo";

const router = Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = Todo.build({ description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      throw new Error("Could not find the todo to update");
    }

    const allowedUpdates: Array<keyof ITodoProperties> = ["completed", "description"];
    const updates: Partial<Record<keyof ITodoProperties, any>> = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    await todo.update(updates);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default router;
