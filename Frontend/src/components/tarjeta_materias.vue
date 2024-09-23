<template>
  <div class="card">
    <h3>{{ subjectName }}</h3>
    <p>Cantidad de estudiantes: {{ studentCount }}</p>
    <router-link :to="'/materia/' + subjectId" class="details-button">Ver Detalles</router-link>
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
    },
    subjectId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 350px;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.details-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
}

.details-button:hover {
  background-color: #0056b3;
}
</style>
