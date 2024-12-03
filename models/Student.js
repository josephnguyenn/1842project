const mongoose = require('mongoose');

// Define the Student schema
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Create and export the Student model
module.exports = mongoose.model('Student', StudentSchema);
