<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>Gestión de Grados</h1>
        </header>
  
        <!-- Formulario para agregar nuevo grado -->
        <div class="form-container">
          <h2>Agregar Grado</h2>
          <input
            v-model="nuevoGrado.nombre"
            placeholder="Nombre del Grado"
            class="input-field"
          />
          <button @click="agregarGrado" class="add-button">
            Agregar Grado
          </button>
        </div>
  
        <!-- Tabla para mostrar grados -->
        <div class="container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grado in grados" :key="grado.id">
                <td>{{ grado.id }}</td>
                <td>{{ grado.nombre }}</td>
                <td>
                  <button @click="deleteGrado(grado.id)" class="delete-button">
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
  import GradosModel from "@/modelo/GradosModel.mjs";
  
  export default {
    mixins: [GradosModel],
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
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
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
  