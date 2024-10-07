<template>
  <div>
    <div id="app">
      <header id="header">
        <h1>GESTIÓN DE ESTUDIANTES</h1>
      </header>

      <!-- Filtros para estudiantes -->
      <div class="filter-container">
        <h2>Buscar y Filtrar Estudiantes</h2>

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

        <!-- Filtro por grado -->
        <div class="form-field">
          <label for="gradoFilter">Filtrar por Grado</label>
          <select v-model="filtroGrado" class="input-field">
            <option value="">Todos los grados</option>
            <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ obtenerDescripcionGrado(grado.id) }}</option>
          </select>
        </div>
      </div>

      <!-- Formulario para agregar o editar estudiante -->
      <div class="form-container">
        <h2>{{ estudianteEditado ? "Editar Estudiante" : "Agregar Estudiante" }}</h2>

        <!-- Campo para el nombre del estudiante -->
        <div class="form-field">
          <label for="name">Nombre</label>
          <input v-model="formEstudiante.name" class="input-field" placeholder="Nombre del estudiante">
        </div>

        <!-- Selector de colegio -->
        <div class="form-field">
          <label for="colegio">Colegio</label>
          <select v-model="formEstudiante.colegio" class="input-field">
            <option value="0" disabled>Seleccione un Colegio</option>
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>

        <!-- Selector de grado -->
        <div class="form-field">
          <label for="grado">Grado</label>
          <select v-model="formEstudiante.grado" class="input-field">
            <option value="0" disabled>Seleccione un Grado</option>
            <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ obtenerDescripcionGrado(grado.id) }}</option>
          </select>
        </div>

        <!-- Selector de estudiante con búsqueda -->
        <div class="form-field">
          <label for="buscarPadre">Buscar Padre</label>
          <input v-model="busquedaPadre" @input="filtrarPadres" class="input-field" placeholder="Buscar por nombre del padre">
          <select v-model="formEstudiante.user_padre" class="input-field">
            <option value="0" disabled>Seleccione un Padre</option>
            <option v-for="padre in padresFiltrados" :key="padre.id" :value="padre.id">{{ padre.name }}</option>
          </select>
        </div>

        <!-- Buscador y Selector de madre -->
        <div class="form-field">
          <label for="buscarMadre">Buscar Madre</label>
          <input v-model="busquedaPadre" @input="filtrarPadres" class="input-field" placeholder="Buscar por nombre de la madre">
          <select v-model="formEstudiante.user_madre" class="input-field">
            <option value="0" disabled>Seleccione una Madre</option>
            <option v-for="padre in padresFiltrados" :key="padre.id" :value="padre.id">{{ padre.name }}</option>
          </select>
        </div>

        <!-- Botones de guardar -->
        <button v-if="estudianteEditado" @click="editarEstudiante" class="save-button">Guardar Cambios</button>
        <button v-else @click="agregarEstudiante" class="add-button">Agregar Estudiante</button>
        <button v-if="estudianteEditado" @click="cancelarEdicion" class="cancel-button">Cancelar</button>
      </div>

      <!-- Tabla para mostrar estudiantes -->
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
              <th>Colegio</th>
              <th>Grado</th>
              <th>Padre</th>
              <th>Madre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="estudiante in estudiantesOrdenados" :key="estudiante.id">
              <td>{{ estudiante.id }}</td>
              <td>{{ estudiante.name }}</td>
              <td>{{ obtenerNombreColegio(estudiante.colegio) }}</td>
              <td>{{ obtenerDescripcionGrado(estudiante.grado) }}</td>
              <td>{{ obtenerNombrePadre(estudiante.user_padre) }}</td>
              <td>{{ obtenerNombrePadre(estudiante.user_madre) }}</td>
              <td>{{ estudiante.email }}</td>
              <td>
                <button @click="setEditarEstudiante(estudiante)" class="edit-button">Editar</button>
                <button @click="deleteEstudiante(estudiante.id)" class="delete-button">Eliminar</button>
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
  data() {
    return {
      busquedaPadre: "", // Buscador para filtrar padres
      busquedaMadre: "", // Buscador para filtrar madres
      padresFiltrados: [], // Padres filtrados por búsqueda
      madresFiltrados: [], // Madres filtrados por búsqueda
    };
  },
  computed: {
    formEstudiante() {
      return this.estudianteEditado || this.nuevoEstudiante;
    }
  },
  methods: {
    ordenarPorNombre() {
      this.ordenNombreAscendente = !this.ordenNombreAscendente;
    },
    obtenerNombreColegio(idColegio) {
      const colegio = this.colegios.find(col => col.id === idColegio);
      return colegio ? colegio.nombre : 'N/A';
    },
    obtenerDescripcionGrado(idGrado) {
      const grado = this.grados.find(gr => gr.id === idGrado);
      return grado ? `${grado.nivel === 1 ? 'Primaria' : 'Secundaria'} - ${grado.grado}º` : 'N/A';
    },
    obtenerNombrePadre(idPadre) {
      const padre = this.padres.find(p => p.id === idPadre);
      return padre ? padre.name : 'N/A';
    },
    // Método para filtrar padres según el buscador
    filtrarPadres() {
      this.padresFiltrados = this.padres.filter(padre =>
        padre.name.toLowerCase().includes(this.busquedaPadre.toLowerCase())
      );
    },
    // Método para filtrar madres (usando padres ya que no hay campo exclusivo)
  },
  created() {
    // Inicialmente los padres y madres filtrados contienen todos los padres
    this.padresFiltrados = this.padres;
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
