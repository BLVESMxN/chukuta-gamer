<template>
    <div class="materias-container">
      <h1>Materias Inscritas</h1>
      <div class="materias-grid">
        <tarjetas-materia
          v-for="materia in materias"
          :key="materia.id"
          :subjectName="materia.nombre"
          :studentCount="materia.cantidadEstudiantes"
          :subjectId="materia.id"
        />
      </div>
    </div>
  </template>
  
  <script>
  import TarjetasMateria from '../components/tarjeta_materias.vue'; // Importamos el componente
  
  export default {
    name: 'MateriasEstudiante',
    components: {
      'tarjetas-materia': TarjetasMateria,
    },
    data() {
      return {
        materias: [
          { id: 1, nombre: 'Matemáticas', cantidadEstudiantes: 25 },
          { id: 2, nombre: 'Historia', cantidadEstudiantes: 30 },
          { id: 3, nombre: 'Biología', cantidadEstudiantes: 20 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .materias-container {
    padding: 20px;
  }
  
  .materias-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  