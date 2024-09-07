<template>
    <div>
      <h1>Materias - Estudiante</h1>
      <div class="materias-grid">
        <div class="materia-card" v-for="materia in materias" :key="materia.id">
          {{ materia.nombre }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MateriasEstudiante',
    data() {
      return {
        materias: [
          { id: 1, nombre: 'Materia 1' },
          { id: 2, nombre: 'Materia 2' },
          { id: 3, nombre: 'Materia 3' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .materias-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .materia-card {
    background-color: #ddd;
    padding: 20px;
    text-align: center;
  }
  </style>
  