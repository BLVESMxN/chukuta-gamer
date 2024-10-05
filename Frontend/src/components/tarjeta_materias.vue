<template>
  <div class="card">
    <h3>{{ subjectName }}</h3>
    <p>Cantidad de estudiantes: {{ studentCount }}</p>
  </div>
</template>

<script>
export default {
  name: "SubjectCard",
  props: {
    subjectName: {
      type: String,
      required: true
    },
    studentCount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #eee;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px; 
  width: 350px; 
}
</style>
