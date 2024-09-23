<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE GRADOS</h1>
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
  
        <!-- Formulario para editar grado -->
        <div v-if="gradoEditado" class="form-container">
          <h2>Editar Grado</h2>
          <input
            v-model="gradoEditado.nombre"
            placeholder="Nombre del Grado"
            class="input-field"
          />
          <button @click="editarGrado" class="save-button">Guardar Cambios</button>
          <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
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
                  <button @click="setEditarGrado(grado)" class="edit-button">
                    Editar
                  </button>
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
/* Estilos generales */
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

h1, h2 {
  text-align: center;
  color: #35853f;
}

/* Centrado del formulario y ajustes de tamaño */
.form-container {
  margin: 20px auto;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Mejora en los input fields */
.input-field {
  display: block;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #35853f;
}

/* Botones con estilos actualizados */
.add-button,
.save-button,
.cancel-button,
.edit-button,
.delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  width: 100%; /* Aumenta el tamaño de los botones para que coincidan con los inputs */
}

.add-button,
.save-button {
  background-color: #35853f;
  color: white;
}

.cancel-button,
.delete-button {
  background-color: #e74c3c;
  color: white;
}

.edit-button {
  background-color: #f39c12;
  color: white;
}

/* Hover effects en los botones */
.add-button:hover,
.save-button:hover {
  background-color: #2e7031;
}

.cancel-button:hover,
.delete-button:hover {
  background-color: #c0392b;
}

.edit-button:hover {
  background-color: #d68910;
}

/* Tabla sin fondos internos y bien proporcionada */
table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  font-size: 16px;
  border: 1px solid #ddd;
}

/* Encabezado de la tabla */
th {
  background-color: #333;
  color: white;
}

/* Quitar el fondo de los td */
td {
  background-color: transparent;
}

/* Centrado del contenido */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

  

  
  