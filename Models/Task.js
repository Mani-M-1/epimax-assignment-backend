const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    taskTitle: {type: String, required: true},
    taskStatus: {type: String, default: 'todo', enum: ['todo', 'inProgress', 'done']},
    assigneeDetails: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Task', taskSchema);