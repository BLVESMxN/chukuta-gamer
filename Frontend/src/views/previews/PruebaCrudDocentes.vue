<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>Detalles de Docentes</h1>
        </header>
  
        <!-- Formulario para agregar nuevo docente -->
        <div class="form-container">
          <h2>Agregar Docente</h2>
          <input
            v-model="nuevoDocente.nombres"
            placeholder="Nombres"
            class="input-field"
          />
          <input
            v-model="nuevoDocente.apellidos"
            placeholder="Apellidos"
            class="input-field"
          />
          <input
            v-model="nuevoDocente.fecha_nacimiento"
            placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
            class="input-field"
            type="date"
          />
          <input
            v-model="nuevoDocente.carrera"
            placeholder="Carrera"
            class="input-field"
          />
          <button @click="agregarDocente" class="add-button">
            Agregar Docente
          </button>
        </div>
  
        <!-- Tabla para mostrar docentes -->
        <div class="container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="docente in docentes" :key="docente.id">
                <td>{{ docente.id }}</td>
                <td>{{ docente.nombres }}</td>
                <td>{{ docente.apellidos }}</td>
                <td>{{ docente.fecha_nacimiento }}</td>
                <td>{{ docente.carrera }}</td>
                <td>
                  <button @click="deleteDocente(docente.id)" class="delete-button">
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
  <style scoped>
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
  
  .add-button, .delete-button {
    padding: 10px 20px;
    background-color: #35853f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-button:hover, .delete-button:hover {
    background-color: #0056b3;
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
  