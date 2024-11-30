import { Router } from "express";

import { Todo } from "../models/Todo";

const router = Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = Todo.build({ description });
    await newTodo.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    await todo.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = await Todo.findByPk(id);
    await todo.update({ completed });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
