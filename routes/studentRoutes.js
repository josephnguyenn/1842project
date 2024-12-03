const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a student
router.post('/', async (req, res) => {
    const { name, age, course, email } = req.body;
  
    try {
      // Check if a student with the same email already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ error: 'A student with this email already exists.' });
      }
  
      // Create a new student
      const student = new Student({ name, age, course, email });
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      console.error('Error saving student:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
