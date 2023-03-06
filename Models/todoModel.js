import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        maxlength: [200, `You are exceeding the max length of todo`],
        required: [true, `Task is required`]
    }
}, { timestamps: true })



const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    todoName: {
        type: String,
        maxlength: [200, `You are exceeding the max length of task`],
        required: [true, `Todo is required`]
    },
    task: [taskSchema]
}, { timestamps: true })


const Todo = mongoose.model("Todo", todoSchema)


export default Todo