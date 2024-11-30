import { Router } from "express";

import { Todo } from "../models/Todo";

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
    res.sendStatus(201);
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
    const { completed } = req.body;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      throw new Error("Could not find the todo to update");
    }

    await todo.update({ completed });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default router;
