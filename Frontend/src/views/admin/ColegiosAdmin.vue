<template>
  <div id="app">
    <header id="header">
      <h1>GESTIÓN DE COLEGIOS</h1>
    </header>

    <!-- Advertencia de pago -->
    <div v-if="advertenciaPago" class="alert-warning">
      <p>Has alcanzado el máximo de colegios permitidos. Por favor, paga para crear más colegios.
        Contactese a pago@service.com
      </p>
    </div>

    <!-- Formulario para agregar nuevo colegio -->
    <div class="form-container" v-if="!advertenciaPago">
      <h2>Agregar Colegio</h2>

      <div class="form-field">
        <label for="nombre">Nombre</label>
        <input v-model="nuevoColegio.nombre" placeholder="Nombre del colegio" class="input-field" />
      </div>

      <div class="form-field">
        <label for="extension">Extensión</label>
        <input v-model="nuevoColegio.extension" placeholder="Extensión del colegio" class="input-field" />
      </div>

      <button @click="agregarColegio" class="add-button">Agregar Colegio</button>
    </div>

    <!-- Formulario para editar colegio -->
    <div v-if="colegioEditado" class="form-container">
      <h2>Editar Colegio</h2>

      <div class="form-field">
        <label for="nombre">Nombre</label>
        <input v-model="colegioEditado.nombre" placeholder="Nombre del colegio" class="input-field" />
      </div>

      <div class="form-field">
        <label for="extension">Extensión</label>
        <input v-model="colegioEditado.extension" placeholder="Extensión del colegio" class="input-field" />
      </div>

      <button @click="editarColegio" class="save-button">Guardar Cambios</button>
      <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
    </div>

    <!-- Tabla para mostrar colegios -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Suscripción</th>
            <th>Extensión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="colegio in colegios" :key="colegio.id">
            <td>{{ colegio.id }}</td>
            <td>{{ colegio.nombre }}</td>
            <td>{{ colegio.suscripcion ? 'Activa' : 'Inactiva' }}</td>
            <td>{{ colegio.extension }}</td>
            <td>
              <button @click="setEditarColegio(colegio)" class="edit-button">Editar</button>
              <button @click="deleteColegio(colegio.id)" class="delete-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ColegiosModel from "@/modelo/ColegiosModel.mjs";

export default {
  mixins: [ColegiosModel],
  methods: {
    setEditarColegio(colegio) {
      this.colegioEditado = { ...colegio };
    },
    cancelarEdicion() {
      this.colegioEditado = null;
    }
  }
};
</script>
<style scoped>
/* Mantener el navbar lateral sin choque con el contenido */
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-left: 270px; /* Asegurar que no se solape con el navbar lateral */
}

/* Estilo del header */
#header {
  background-color: #004d40;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  color: #004d40;
  padding: 8px;
}

/* Advertencia de pago */
.alert-warning {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

/* Formulario y contenedor centrado */
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
  border-color: #004d40;
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
  width: 100%;
}

.add-button,
.save-button {
  background-color: #004d40;
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
  background-color: #004d40;
}

.cancel-button:hover,
.delete-button:hover {
  background-color: #c0392b;
}

.edit-button:hover {
  background-color: #d68910;
}

/* Tabla bien proporcionada */
.table-container {
  margin: 20px auto;
  max-width: 1200px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ddd;
}

th {
  background-color: #333;
  color: white;
}
</style>
