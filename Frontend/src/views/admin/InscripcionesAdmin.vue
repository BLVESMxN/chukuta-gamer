<template>
  <div>
    <div id="app">
      <header id="header">
        <h1>GESTIÓN DE INSCRIPCIONES</h1>
      </header>

      <!-- Filtros para inscripciones -->
      <div class="filter-container">
        <h2>Buscar y Filtrar Inscripciones</h2>

        <!-- Filtro por estudiante -->
        <div class="form-field">
          <label for="estudianteFilter">Filtrar por Estudiante</label>
          <select v-model="filtroEstudiante" class="input-field">
            <option value="">Todos los estudiantes</option>
            <option v-for="estudiante in estudiantesFiltrados" :key="estudiante.id" :value="estudiante.id">
              {{ estudiante.name }} - {{ DescripcionGrado(estudiante.grado) }}
            </option>
          </select>
        </div>

        <!-- Filtro por curso -->
        <div class="form-field">
          <label for="cursoFilter">Filtrar por Curso</label>
          <select v-model="filtroCurso" class="input-field">
            <option value="">Todos los cursos</option>
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ obtenerNombreCurso(curso.id) }}
            </option>
          </select>
        </div>
      </div>

      <!-- Formulario para agregar o editar inscripción -->
      <div class="form-container">
        <h2>{{ inscripcionEditada ? "Editar Inscripción" : "Agregar Inscripción" }}</h2>

        <!-- Selector de curso -->
        <div class="form-field">
          <label for="curso">Curso</label>
          <select v-model="formInscripcion.curso" class="input-field">
            <option value="0" disabled>Seleccione un Curso</option>
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">{{ obtenerNombreCurso(curso.id) }}</option>
          </select>
        </div>

        <!-- Selector de estudiante con búsqueda -->
        <div class="form-field">
          <label for="estudiante">Estudiante</label>
          <input v-model="busquedaEstudiante" class="input-field" placeholder="Buscar estudiante...">
          <select v-model="formInscripcion.estudiante" class="input-field">
            <option value="0" disabled>Seleccione un Estudiante</option>
            <option v-for="estudiante in estudiantesFiltrados" :key="estudiante.id" :value="estudiante.id">{{ estudiante.name }} - {{ DescripcionGrado(estudiante.grado) }}</option>
          </select>
        </div>

        <!-- Campo para promedio -->
        <div class="form-field">
          <label for="promedio">Promedio</label>
          <input v-model="formInscripcion.promedio" type="number" class="input-field" placeholder="Ingrese el promedio">
        </div>

        <!-- Botones de guardar -->
        <button v-if="inscripcionEditada" @click="editarInscripcion" class="save-button">Guardar Cambios</button>
        <button v-else @click="agregarInscripcion" class="add-button">Agregar Inscripción</button>
        <button v-if="inscripcionEditada" @click="cancelarEdicion" class="cancel-button">Cancelar</button>
      </div>

      <!-- Tabla para mostrar inscripciones -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Estudiante</th>
              <th>
                Promedio
                <button @click="ordenarPorPromedio" class="sort-button">
                  Ordenar {{ ordenPromedioAscendente ? 'Ascendente' : 'Descendente' }}
                </button>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inscripcion in inscripcionesOrdenadas" :key="inscripcion.id">
              <td>{{ inscripcion.id }}</td>
              <td>{{ obtenerNombreCurso(inscripcion.curso) }}</td>
              <td>{{ obtenerNombreEstudiante(inscripcion.estudiante) }}</td>
              <td>{{ inscripcion.promedio }}</td>
              <td>
                <button @click="setEditarInscripcion(inscripcion)" class="edit-button">Editar</button>
                <button @click="deleteInscripcion(inscripcion.id)" class="delete-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import InscripcionesModel from "@/modelo/InscripcionesModel.mjs";

export default {
  mixins: [InscripcionesModel],
  data() {
    return {
      busquedaEstudiante: "" // Agregamos la variable para la búsqueda
    };
  },
  computed: {
    formInscripcion() {
      return this.inscripcionEditada || this.nuevaInscripcion;
    },
    // Filtrar estudiantes por búsqueda
    estudiantesFiltrados() {
      // Devuelve todos los estudiantes si la búsqueda está vacía
      return this.busquedaEstudiante
        ? this.estudiantes.filter(estudiante =>
            estudiante.name.toLowerCase().includes(this.busquedaEstudiante.toLowerCase())
          )
        : this.estudiantes;
    },
    // Filtrar inscripciones por los filtros aplicados (estudiante, curso)
    inscripcionesFiltradas() {
      return this.inscripciones.filter(inscripcion => {
        const cumpleEstudiante = this.filtroEstudiante
          ? inscripcion.estudiante === parseInt(this.filtroEstudiante)
          : true;
        const cumpleCurso = this.filtroCurso ? inscripcion.curso === parseInt(this.filtroCurso) : true;
        return cumpleEstudiante && cumpleCurso;
      });
    },
    // Ordenar inscripciones por promedio
    inscripcionesOrdenadas() {
      return [...this.inscripcionesFiltradas].sort((a, b) => {
        return this.ordenPromedioAscendente ? a.promedio - b.promedio : b.promedio - a.promedio;
      });
    }
  },
  methods: {
    ordenarPorPromedio() {
      this.ordenPromedioAscendente = !this.ordenPromedioAscendente;
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
