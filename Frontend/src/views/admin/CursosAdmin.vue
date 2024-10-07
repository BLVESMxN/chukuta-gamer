<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE CURSOS</h1>
        </header>
  
        <!-- Filtros para cursos -->
        <div class="filter-container">
          <h2>Buscar y Filtrar Cursos</h2>
  
          <!-- Filtro por asignatura -->
          <div class="form-field">
            <label for="asignaturaFilter">Filtrar por Asignatura</label>
            <select v-model="filtroAsignatura" class="input-field">
              <option value="">Todas</option>
              <option v-for="asignatura in asignaturas" :key="asignatura.id" :value="asignatura.id">
                {{ asignatura.nombre }} - {{ obtenerDescripcionGrado(asignatura.grado) }} - {{ obtenerNombreColegio(asignatura.colegio) }}
              </option>
            </select>
          </div>
  
          <!-- Filtro por periodo -->
          <div class="form-field">
            <label for="periodoFilter">Filtrar por Periodo</label>
            <select v-model="filtroPeriodo" class="input-field">
              <option value="">Todos</option>
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <!-- Filtro por profesor -->
          <div class="form-field">
            <label for="profesorFilter">Filtrar por Profesor</label>
            <select v-model="filtroProfesor" class="input-field">
              <option value="">Todos</option>
              <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">{{ profesor.name }} - {{ obtenerNombreColegio(profesor.colegio) }}</option>
            </select>
          </div>
  
          <!-- Filtro por horario -->
          <div class="form-field">
            <label for="horarioFilter">Filtrar por Horario</label>
            <select v-model="filtroHorario" class="input-field">
              <option value="">Todos</option>
              <option v-for="horario in horarios" :key="horario.id" :value="horario.id">{{ horario.dia }} - {{ horario.inicio }} a {{ horario.fin }}</option>
            </select>
          </div>
        </div>
  
        <!-- Formulario para agregar o editar curso -->
        <div class="form-container">
          <h2>{{ cursoEditado ? "Editar Curso" : "Agregar Curso" }}</h2>
  
          <!-- Selector de asignatura para crear -->
          <div class="form-field" v-if="!cursoEditado">
            <label for="asignatura">Asignatura</label>
            <select v-model="nuevoCurso.asignatura" class="input-field">
              <option value="0" disabled>Seleccione una Asignatura</option>
              <option v-for="asignatura in asignaturas" :key="asignatura.id" :value="asignatura.id">
                {{ asignatura.nombre }} - {{ obtenerDescripcionGrado(asignatura.grado) }} - {{ obtenerNombreColegio(asignatura.colegio) }}
              </option>
            </select>
          </div>
  
          <!-- Selector de asignatura para editar -->
          <div class="form-field" v-if="cursoEditado">
            <label for="asignatura">Asignatura</label>
            <select v-model="cursoEditado.asignatura" class="input-field">
              <option value="0" disabled>Seleccione una Asignatura</option>
              <option v-for="asignatura in asignaturas" :key="asignatura.id" :value="asignatura.id">
                {{ asignatura.nombre }} - {{ obtenerDescripcionGrado(asignatura.grado) }} -  - {{ obtenerNombreColegio(asignatura.colegio) }}
              </option>
            </select>
          </div>
  
          <!-- Selector de periodo para crear -->
          <div class="form-field" v-if="!cursoEditado">
            <label for="periodo">Periodo</label>
            <select v-model="nuevoCurso.periodo" class="input-field">
              <option value="0" disabled>Seleccione un Periodo</option>
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <!-- Selector de periodo para editar -->
          <div class="form-field" v-if="cursoEditado">
            <label for="periodo">Periodo</label>
            <select v-model="cursoEditado.periodo" class="input-field">
              <option value="0" disabled>Seleccione un Periodo</option>
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <!-- Selector de profesor para crear -->
          <div class="form-field" v-if="!cursoEditado">
            <label for="profesor">Profesor</label>
            <select v-model="nuevoCurso.profesor" class="input-field">
              <option value="0" disabled>Seleccione un Profesor</option>
              <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
                {{ profesor.name }} - {{ obtenerNombreColegio(profesor.colegio) }}
              </option>
            </select>
          </div>
  
          <!-- Selector de horarios para crear -->
          <div class="form-field" v-if="!cursoEditado">
            <label for="horarios">Horarios</label>
            <select v-model="nuevoCurso.horarios" multiple class="input-field">
              <option value="0" disabled>Seleccione Horarios</option>
              <option v-for="horario in horarios" :key="horario.id" :value="horario.id">{{ horario.dia }} - {{ horario.inicio }} a {{ horario.fin }}</option>
            </select>
          </div>
  
          <!-- Botones de guardar -->
          <button v-if="cursoEditado" @click="editarCurso" class="save-button">Guardar Cambios</button>
          <button v-else @click="agregarCurso" class="add-button">Agregar Curso</button>
          <button v-if="cursoEditado" @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar cursos -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Asignatura
                </th>
                <th>
                  Periodo
                </th>
                <th>
                  Profesor
                </th>
                <th>
                  Horarios
                  <button @click="ordenarPorHorario" class="sort-button">
                    Ordenar {{ ordenHorarioAscendente ? 'Ascendente' : 'Descendente' }}
                    <i :class="ordenHorarioAscendente ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                  </button>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="curso in cursosOrdenados" :key="curso.id">
                <td>{{ curso.id }}</td>
                <td>{{ obtenerNombreAsignatura(curso.asignatura) }}</td>
                <td>{{ obtenerDescripcionPeriodo(curso.periodo) }}</td>
                <td>{{ obtenerNombreProfesor(curso.profesor) }}</td>
                <td>{{ obtenerDescripcionHorarios(curso.horarios) }}</td>
                <td>
                  <button @click="setEditarCurso(curso)" class="edit-button">Editar</button>
                  <button @click="deleteCurso(curso.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>

  <script>
  import CursosModel from "@/modelo/CursosModel.mjs";
  
  export default {
    mixins: [CursosModel],
    data() {
      return {
        ordenAsignaturaAscendente: true,
        ordenPeriodoAscendente: true,
        ordenProfesorAscendente: true,
        ordenHorarioAscendente: true,
      };
    },
    computed: {
      cursosFiltrados() {
        return this.cursos.filter(curso => {
          const cumpleAsignatura = this.filtroAsignatura ? curso.asignatura === parseInt(this.filtroAsignatura) : true;
          const cumplePeriodo = this.filtroPeriodo ? curso.periodo === parseInt(this.filtroPeriodo) : true;
          const cumpleProfesor = this.filtroProfesor ? curso.profesor === parseInt(this.filtroProfesor) : true;
          const cumpleHorario = this.filtroHorario ? curso.horarios.includes(parseInt(this.filtroHorario)) : true;
          return cumpleAsignatura && cumplePeriodo && cumpleProfesor && cumpleHorario;
        });
      },
      cursosOrdenados() {
        return [...this.cursosFiltrados].sort((a, b) => {
          if (this.ordenAsignaturaAscendente) {
            return a.asignatura - b.asignatura;
          } else {
            return b.asignatura - a.asignatura;
          }
        }).sort((a, b) => {
          if (this.ordenPeriodoAscendente) {
            return a.periodo - b.periodo;
          } else {
            return b.periodo - a.periodo;
          }
        }).sort((a, b) => {
          if (this.ordenProfesorAscendente) {
            return a.profesor - b.profesor;
          } else {
            return b.profesor - a.profesor;
          }
        }).sort((a, b) => {
          if (this.ordenHorarioAscendente) {
            return a.horarios[0] - b.horarios[0];
          } else {
            return b.horarios[0] - a.horarios[0];
          }
        });
      }
    },
    methods: {
      ordenarPorAsignatura() {
        this.ordenAsignaturaAscendente = !this.ordenAsignaturaAscendente;
      },
      ordenarPorPeriodo() {
        this.ordenPeriodoAscendente = !this.ordenPeriodoAscendente;
      },
      ordenarPorProfesor() {
        this.ordenProfesorAscendente = !this.ordenProfesorAscendente;
      },
      ordenarPorHorario() {
        this.ordenHorarioAscendente = !this.ordenHorarioAscendente;
      },
      obtenerNombreAsignatura(idAsignatura) {
        const asignatura = this.asignaturas.find(a => a.id === idAsignatura);
        return asignatura ? `${asignatura.nombre} - ${this.obtenerDescripcionGrado(asignatura.grado)} - ${this.obtenerNombreColegio(asignatura.colegio)}` : "N/A" ;
      },
      obtenerDescripcionPeriodo(idPeriodo) {
        const periodo = this.periodos.find(p => p.id === idPeriodo);
        return periodo ? `${periodo.anio} - ${periodo.trimestre}º Trimestre` : "N/A";
      },
      obtenerNombreProfesor(idProfesor) {
        const profesor = this.profesores.find(p => p.id === idProfesor);
        return profesor ? `${profesor.name} - ${this.obtenerNombreColegio(profesor.colegio)}` : "N/A";
      },
      obtenerDescripcionHorarios(idsHorarios) {
        return idsHorarios.map(id => {
          const horario = this.horarios.find(h => h.id === id);
          return horario ? `${horario.dia} - ${horario.inicio} a ${horario.fin}` : "N/A";
        }).join(", ");
      },
      obtenerDescripcionGrado(idGrado) {
        const grado = this.grados.find(gr => gr.id === idGrado);
        return grado ? `${grado.nivel === 1 ? 'Primaria' : 'Secundaria'} - ${grado.grado}º` : 'N/A';
      },
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
  