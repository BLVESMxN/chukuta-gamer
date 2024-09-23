<template>
    <div class="detalles-materia">
      <h1>Detalles de {{ materia.nombre }}</h1>
      <ul>
        <li><strong>Docente:</strong> {{ materia.docente }}</li>
        <li><strong>Aula:</strong> {{ materia.aula }}</li>
        <li><strong>Días:</strong> {{ materia.dias }}</li>
        <li><strong>Calificaciones:</strong> {{ materia.calificaciones }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetallesMateria',
    data() {
      return {
        // Aquí podrías hacer una consulta para obtener los detalles completos de la materia según el ID
        materia: {
          nombre: 'Materia ' + this.$route.params.id, // Esto es dinámico basándose en el ID
          docente: 'Prof. Juan Pérez',
          aula: 'Aula 101',
          dias: 'Lunes, Miércoles, Viernes',
          calificaciones: '80%',
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .detalles-materia {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  </style>
  