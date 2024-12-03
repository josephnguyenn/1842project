<template>
  <div>
    <input
      v-model="searchQuery"
      placeholder="Search by name, email, or course"
      class="border p-2 rounded w-full mb-4"
    />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Course</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in filteredStudents"
          :key="student._id"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.course }}</td>
          <td>{{ student.email }}</td>
          <td>
            <button @click="$emit('editStudent', student)">Edit</button>
            <button @click="$emit('deleteStudent', student._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['students'],
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    filteredStudents() {
      const query = this.searchQuery.toLowerCase();
      return this.students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query)
      );
    },
  },
};
</script>
