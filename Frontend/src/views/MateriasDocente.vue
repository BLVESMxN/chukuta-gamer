<template>
    <div>
      <h1>Materias - Docente</h1>
      <div class="materias-grid">
        <div class="materia-card" v-for="materia in materias" :key="materia.id">
          {{ materia.nombre }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MateriasDocente',
    data() {
      return {
        materias: [
          { id: 1, nombre: 'Materia Docente 1' },
          { id: 2, nombre: 'Materia Docente 2' },
          { id: 3, nombre: 'Materia Docente 3' },
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
  