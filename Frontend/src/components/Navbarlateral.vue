<template>
  <div class="navbar-container">
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item" @click="navegar('asignaturas')">
          📚 Asignaturas
        </li>
        <li class="navbar-item" @click="navegar('colegios')">🏫 Colegios</li>
        <li class="navbar-item" @click="navegar('grados')">🎓 Grados</li>
        <li class="navbar-item" @click="navegar('estudiantes')">
          👨‍🎓 Estudiantes
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    navegar(ruta) {
      this.$router.push({ name: ruta });
    },
  },
};
</script>

<style scoped>
.navbar-container {
  width: 250px;
  height: 100vh;
  background-color: #f4f7f6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.navbar {
  width: 100%;
  padding: 20px;
}

.navbar-list {
  list-style: none;
  padding: 0;
}

.navbar-item {
  padding: 15px;
  margin: 10px 0;
  background-color: #0073e6;
  color: white;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar-item:hover {
  background-color: #005bb5;
}
</style>
