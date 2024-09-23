<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>Detalles de tareas</h1>
        </header>
  
        <!-- Formulario para agregar nuevo tarea -->
        <div class="form-container">
          <h2>Agregar tarea</h2>
          <input
            v-model="nuevotarea.descripcion"
            placeholder="Descripción"
            class="input-field"
          />
          <input
            v-model="nuevotarea.fecha_inicio"
            placeholder="Fecha de inicio (YYYY-MM-DD)"
            class="input-field"
            type="date"
          />
          <input
            v-model="nuevotarea.fecha_fin"
            placeholder="Fecha de fin (YYYY-MM-DD)"
            class="input-field"
            type="date"
          />
          <button @click="agregartarea" class="add-button">
            Agregar tarea
          </button>
        </div>
  
        <!-- Tabla para mostrar tareas -->
        <div class="container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Asingatura</th>
                <th>Acciones</th>
                <!-- Nueva columna para el botón de eliminar -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="tarea in tareas" :key="tarea.id">
                <td v-if="tarea.asignatura == 'Matemáticas'">{{ tarea.id }}</td>
                <td v-if="tarea.asignatura == 'Matemáticas'">{{ tarea.descripcion }}</td>
                <td v-if="tarea.asignatura == 'Matemáticas'">{{ tarea.fecha_inicio }}</td>
                <td v-if="tarea.asignatura == 'Matemáticas'">{{ tarea.fecha_fin }}</td>
                <td v-if="tarea.asignatura == 'Matemáticas'">{{ tarea.asignatura }}</td>
                <td v-if="tarea.asignatura == 'Matemáticas'">
                  <!-- Botón para eliminar tarea -->
                  <button
                    @click="deletetarea(tarea.id)"
                    class="delete-button"
                  >
                    X
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
  import tareasModel from "@/modelo/TareasModel.mjs";
  
  export default {
    mixins: [tareasModel],
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
  