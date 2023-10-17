const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['todo', 'completed'],
        default: 'todo',
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;