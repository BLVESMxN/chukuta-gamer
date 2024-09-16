<template>
  <div>
    <button class="back-btn" @click="goBack">Atrás</button>
    <div id="app">
      <header id="header">
        <h1>Detalles de Estudiantes</h1>
      </header>

      <!-- Formulario para agregar nuevo estudiante -->
      <div class="form-container">
        <h2>Agregar Estudiante</h2>
        <input
          v-model="nuevoEstudiante.nombres"
          placeholder="Nombres"
          class="input-field"
        />
        <input
          v-model="nuevoEstudiante.apellidos"
          placeholder="Apellidos"
          class="input-field"
        />
        <input
          v-model="nuevoEstudiante.fecha_nacimiento"
          placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
          class="input-field"
          type="date"
        />
        <button @click="agregarEstudiante" class="add-button">
          Agregar Estudiante
        </button>
      </div>

      <!-- Tabla para mostrar estudiantes -->
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
              <!-- Nueva columna para el botón de eliminar -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="estudiante in estudiantes" :key="estudiante.id">
              <td>{{ estudiante.id }}</td>
              <td>{{ estudiante.nombres }}</td>
              <td>{{ estudiante.apellidos }}</td>
              <td>{{ estudiante.fecha_nacimiento }}</td>
              <td>
                <!-- Botón para eliminar estudiante -->
                <button
                  @click="deleteEstudiante(estudiante.id)"
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
import EstudiantesModel from "@/modelo/EstudiantesModel.mjs";

export default {
  mixins: [EstudiantesModel],
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
