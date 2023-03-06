import express from 'express';
const router = express.Router();
import { createTodo, deleteTodo, getAllTodos, createTask, deleteTask } from '../Controllers/todoControllers.js';
import { auth } from '../utils/routeProtection.js'

//TODOS
router.post(`/create`, auth, createTodo);
router.get(`/get/all`, auth, getAllTodos)
router.delete(`/remove/:todoId`, auth, deleteTodo)

//TASKS
router.put('/task/create/:todoId', auth, createTask)
router.delete('/task/remove/:todoId/:taskId', auth, deleteTask)


export default router;