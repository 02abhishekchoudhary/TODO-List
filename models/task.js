//import mongoose
const mongoose = require('mongoose');

//Database schema definition
const taskSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    datee : {
        type: String,
    }
});

const task = mongoose.model('Task', taskSchema);
module.exports = task;