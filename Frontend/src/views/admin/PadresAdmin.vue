<template>
  <div>
    <div id="app">
      <header id="header">
        <h1>GESTIÓN DE PADRES</h1>
      </header>

      <!-- Filtros para padres -->
      <div class="filter-container">
        <h2>Buscar y Filtrar Padres</h2>

        <!-- Buscador por nombre -->
        <div class="form-field">
          <label for="nombreFilter">Buscar por Nombre</label>
          <input v-model="busquedaNombre" class="input-field" placeholder="Buscar por nombre...">
        </div>

        <!-- Filtro por colegio -->
        <div class="form-field">
          <label for="colegioFilter">Filtrar por Colegio</label>
          <select v-model="filtroColegio" class="input-field">
            <option value="">Todos los colegios</option>
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>
      </div>

      <!-- Formulario para agregar o editar padre -->
      <div class="form-container">
        <h2>{{ padreEditado ? "Editar Padre" : "Agregar Padre" }}</h2>

        <!-- Campo para el nombre del padre -->
        <div class="form-field">
          <label for="name">Nombre</label>
          <input v-model="formPadre.name" class="input-field" placeholder="Nombre del padre">
        </div>

        <!-- Selector de colegio -->
        <div class="form-field">
          <label for="colegio">Colegio</label>
          <select v-model="formPadre.colegio" class="input-field">
            <option value="0" disabled>Seleccione un Colegio</option>
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>

        <!-- Botones de guardar -->
        <button v-if="padreEditado" @click="editarPadre" class="save-button">Guardar Cambios</button>
        <button v-else @click="agregarPadre" class="add-button">Agregar Padre</button>
        <button v-if="padreEditado" @click="cancelarEdicion" class="cancel-button">Cancelar</button>
      </div>

      <!-- Tabla para mostrar padres -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Nombre
                <button @click="ordenarPorNombre" class="sort-button">
                  <i class="fas" :class="ordenNombreAscendente ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up'"></i>
                </button>
              </th>
              <th>Email</th>
              <th>Colegio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="padre in padresOrdenados" :key="padre.id">
              <td>{{ padre.id }}</td>
              <td>{{ padre.name }}</td>
              <td>{{ padre.email }}</td>
              <td>{{ obtenerNombreColegio(padre.colegio) }}</td>
              <td>
                <button @click="setEditarPadre(padre)" class="edit-button">Editar</button>
                <button @click="deletePadre(padre.id)" class="delete-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PadresModel from "@/modelo/PadresModel.mjs";

export default {
  mixins: [PadresModel],
  computed: {
    // Computed para retornar el objeto del formulario (nuevo o editado)
    formPadre() {
      return this.padreEditado || this.nuevoPadre;
    }
  },
  methods: {
    // Alternar ordenamiento por nombre
    ordenarPorNombre() {
      this.ordenNombreAscendente = !this.ordenNombreAscendente;
    },
    // Obtener el nombre del colegio basado en el ID
    obtenerNombreColegio(idColegio) {
      const colegio = this.colegios.find(col => col.id === idColegio);
      return colegio ? colegio.nombre : 'N/A';
    }
  }
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

/* Formularios y tablas */
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

.add-button,
.save-button,
.cancel-button,
.edit-button,
.delete-button,
.sort-button {
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

.sort-button {
  background-color: #3498db;
  color: white;
}

.sort-button i {
  margin-left: 8px;
}

/* Tabla */
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
