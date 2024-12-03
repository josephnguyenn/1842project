<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <input v-model="student.name" placeholder="Name" required />
        <input v-model="student.age" placeholder="Age" type="number" required />
        <input v-model="student.course" placeholder="Course" required />
        <input v-model="student.email" placeholder="Email" type="email" required />
      </div>
      <button type="submit">{{ editingStudent ? "Update" : "Add" }} Student</button>
      <button type="button" @click="resetForm">Reset</button>
    </form>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    props: ['editingStudent'],
    data() {
      return {
        student: { name: '', age: '', course: '', email: '' },
      };
    },
    watch: {
      editingStudent: {
        immediate: true,
        handler(newVal) {
          this.student = newVal ? { ...newVal } : { name: '', age: '', course: '', email: '' };
        },
      },
    },
    methods: {
      async handleSubmit() {
        if (this.editingStudent) {
          await api.put(`/${this.editingStudent._id}`, this.student);
        } else {
          await api.post('/', this.student);
        }
        this.$emit('studentAdded');
        this.resetForm();
      },
      resetForm() {
        this.student = { name: '', age: '', course: '', email: '' };
        this.$emit('resetForm');
      },
    },
  };
  </script>
  