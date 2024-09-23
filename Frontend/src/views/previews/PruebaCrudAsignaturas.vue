<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>Gestión de Asignaturas</h1>
        </header>
  
        <!-- Formulario para agregar nueva asignatura -->
        <div class="form-container">
          <h2>Agregar Asignatura</h2>
          <input
            v-model="nuevaAsignatura.nombre"
            placeholder="Nombre"
            class="input-field"
          />
          <input
            v-model="nuevaAsignatura.grado"
            placeholder="Grado"
            class="input-field"
            type="number"
          />
          <button @click="agregarAsignatura" class="add-button">
            Agregar Asignatura
          </button>
        </div>
  
        <!-- Tabla para mostrar asignaturas -->
        <div class="container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asignatura in asignaturas" :key="asignatura.id">
                <td>{{ asignatura.id }}</td>
                <td>{{ asignatura.nombre }}</td>
                <td>{{ asignatura.grado }}</td>
                <td>
                  <button @click="deleteAsignatura(asignatura.id)" class="delete-button">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AsignaturasModel from "@/modelo/AsignaturasModel.mjs";
  
  export default {
    mixins: [AsignaturasModel],
  };
  </script>
  
  <style scoped>
  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #35853f;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .back-btn:hover {
    background-color: #0056b3;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .form-container {
    margin: 20px;
  }
  
  .input-field {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
  }
  
  .add-button {
    padding: 10px 20px;
    background-color: #35853f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button {
    padding: 5px 10px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c9302c;
  }
  
  table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  table,
  th,
  td {
    border: 1px solid #ddd;
  }
  
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>
  