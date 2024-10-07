<template>
    <div class="list-container">
      <h2 class="title">Lista de Estudiantes</h2>
      <div class="card" v-for="estudiante in estudiantes" :key="estudiante.id">
        <div class="info">
          <h3>{{ estudiante.nombre }}</h3>
          <p>Curso: {{ estudiante.curso }}</p>
        </div>
        <!-- Botones de acciones -->
        <div class="actions">
          <button @click="registrarAsistencia(estudiante)" class="btn btn-attendance">Registrar Asistencia</button>
          <button @click="editarEstudiante(estudiante)" class="btn btn-edit">Editar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListaEstudiantes',
    props: {
      estudiantes: {
        type: Array,
        required: true
      }
    },
    methods: {
      registrarAsistencia(estudiante) {
        alert(`Asistencia registrada para: ${estudiante.nombre}`);
      },
      editarEstudiante(estudiante) {
        alert(`Editando estudiante: ${estudiante.nombre}`);
      }
    }
  };
  </script>
  
  <style scoped>
    /* Mismos estilos que ya tenías */
    .list-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .title {
      font-size: 24px;
      color: #333;
      margin-bottom: 20px;
    }
  
    .card {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      width: 350px;
      margin-bottom: 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }
  
    .info {
      text-align: center;
    }
    
    .info h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }
  
    .info p {
      margin: 5px 0 10px;
      font-size: 14px;
      color: #777;
    }
  
    .actions {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
  
    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }
  
    .btn-attendance {
      background-color: #4CAF50;
      color: white;
    }
  
    .btn-edit {
      background-color: #2196F3;
      color: white;
    }
  
    .btn:hover {
      opacity: 0.8;
    }
  </style>
  