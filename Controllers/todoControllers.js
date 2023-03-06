import asyncHandler from 'express-async-handler';
import Todo from '../Models/todoModel.js';


//TODOS
export const createTodo = asyncHandler(async (req, res) => {

    const { todoName } = req.body;

    if (!todoName) {
        res.status(401);
        throw new Error(`Todo is required`)
    }

    const todo = await Todo.create({
        user: req.user.id,
        todoName
    })

    if (todo) {
        res.status(201)
        res.json(todo)
    } else {
        res.status(500);
        throw new Error(`Todo creation failed`)
    }
})

export const getAllTodos = asyncHandler(async (req, res) => {

    const todos = await Todo.find({ user: req.user.id }).sort({ 'updatedAt': -1 });



    if (todos.length > 0) {
        res.json(todos)
    } else {
        res.status(404);
        throw new Error(`You Have 0 todos in list`)
    }

})


export const deleteTodo = asyncHandler(async (req, res) => {

    const { todoId } = req.params;

    const todo = await Todo.findByIdAndDelete(todoId);

    if (todo) {
        res.json(todo)
    } else {
        res.status(500);
        throw new Error(`Todo delete process failed`)
    }

})


// TASKS

export const createTask = asyncHandler(async (req, res) => {

    const { todoId } = req.params;

    const { taskName } = req.body

    if (!todoId) {
        res.status(404);
        throw new Error(`Todo Id missing`)
    }

    if (!taskName) {
        res.status(404);
        throw new Error(`Task Field missing`)
    }

    const todo = await Todo.findById(todoId);

    if (todo) {

        todo.task.push({
            taskName
        })

        const updatedTodo = await todo.save();

        if (updatedTodo) {
            res.json(updatedTodo)
        } else {
            res.status(501);
            throw new Error(`Task creation failed`)
        }

    } else {
        res.status(401);
        throw new Error(`Todo not available`)
    }
})


export const deleteTask = asyncHandler(async (req, res) => {

    const { todoId, taskId } = req.params;

    if (!todoId || !taskId) {
        res.status(401);
        throw new Error(`Todo or Task ID Missing`)
    }

    const todo = await Todo.findById(todoId);

    if (todo) {

        const updatedTask = todo.task.filter((tsk, i) => {
            return tsk._id.toString() !== taskId.toString()
        })


        todo.task = updatedTask;

        const updatedTodo = await todo.save();

        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(501);
            throw new Error(`Todo Updation Failed`)
        }

    } else {
        res.status(404);
        throw new Error(`Todo not found`)
    }

})