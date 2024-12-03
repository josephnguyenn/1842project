<template>
  <div>
    <h1> Nguyen Student Management System</h1>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <StudentForm
      @studentAdded="fetchStudents"
      :editingStudent="editingStudent"
      @resetForm="resetForm"
    />
    <StudentList
      :students="students"
      @editStudent="editStudent"
      @deleteStudent="deleteStudent"
    />
  </div>
</template>

<script>
import StudentForm from './StudentForm.vue';
import StudentList from './StudentList.vue';
import api from '../services/api';

export default {
  components: { StudentForm, StudentList },
  data() {
    return {
      students: [],
      editingStudent: null,
      errorMessage: '', // To store error messages
    };
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await api.get('/');
        this.students = response.data;
        this.errorMessage = ''; // Clear any previous error message
      } catch (error) {
        this.errorMessage = 'Failed to fetch students. Please try again later.';
        console.error('Error fetching students:', error);
      }
    },
    editStudent(student) {
      this.editingStudent = student;
    },
    async deleteStudent(id) {
      try {
        await api.delete(`/${id}`);
        this.fetchStudents();
      } catch (error) {
        this.errorMessage = 'Failed to delete student. Please try again.';
        console.error('Error deleting student:', error);
      }
    },
    resetForm() {
      this.editingStudent = null;
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style>
/* Styling for the error message */
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
}
</style>
