<template>
    <div>
      <header id="header">
        <h1>Gestión de Inscripciones</h1>
      </header>
  
      <!-- Filtros -->
      <div class="filter-container">
        <h2>Filtrar Inscripciones</h2>
  
        <!-- Filtro por Colegio -->
        <div class="form-field">
          <label for="colegio">Filtrar por Colegio</label>
          <select v-model="filtroColegio" @change="filtrarInscripcionesPorColegio" class="input-field">
            <option value="">Todos los Colegios</option>
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>
  
        <!-- Buscador por correo de estudiante -->
        <div class="form-field">
          <label for="buscarNombre">Buscar por Correo de Estudiante</label>
          <input v-model="busquedaCorreo" placeholder="Buscar por correo..." class="input-field" />
        </div>
      </div>
  
      <!-- Formulario para agregar una nueva inscripción -->
      <div class="form-container">
        <h2>Agregar Inscripción</h2>
  
        <div class="form-field">
          <label for="email">Correo del Estudiante</label>
          <input v-model="inscripcion.email" placeholder="Correo del Estudiante" class="input-field" />
        </div>
  
        <div class="form-field">
          <label for="curso">Curso</label>
          <select v-model="inscripcion.curso" class="input-field">
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.asignatura }} - {{ curso.grado }}
            </option>
          </select>
        </div>
  
        <div class="form-field">
          <label for="promedio">Promedio Inicial</label>
          <input v-model="inscripcion.promedio" type="number" placeholder="Promedio Inicial" class="input-field" />
        </div>
  
        <button @click="agregarInscripcion" class="add-button">Agregar Inscripción</button>
  
        <p v-if="errorMensaje" class="error">{{ errorMensaje }}</p>
      </div>
  
      <!-- Tabla para mostrar inscripciones -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Correo</th>
              <th>Curso</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inscripcion in inscripcionesFiltradas" :key="inscripcion.id">
              <td>{{ inscripcion.id }}</td>
              <td>{{ obtenerNombreEstudiante(inscripcion.estudiante) }}</td>
              <td>{{ obtenerCorreoEstudiante(inscripcion.estudiante) }}</td>
              <td>{{ obtenerNombreCurso(inscripcion.curso) }}</td>
              <td>{{ inscripcion.promedio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import InscripcionesModel from "@/modelo/InscripcionesModel.mjs";
  
  export default {
    data() {
      return {
        inscripciones: [],
        cursos: [],
        estudiantes: [],
        colegios: [],
        filtroColegio: "",
        busquedaCorreo: "",
        inscripcion: {
          email: "",
          curso: null,
          promedio: null,
        },
        errorMensaje: "",
        modeloInscripciones: new InscripcionesModel(),
      };
    },
    computed: {
      inscripcionesFiltradas() {
        let inscripcionesFiltradas = this.inscripciones;
  
        // Filtrar por colegio
        if (this.filtroColegio) {
          inscripcionesFiltradas = inscripcionesFiltradas.filter(inscripcion => {
            const estudiante = this.estudiantes.find(est => est.id === inscripcion.estudiante);
            return estudiante && estudiante.colegio === parseInt(this.filtroColegio);
          });
        }
  
        // Filtrar por correo de estudiante
        if (this.busquedaCorreo) {
          inscripcionesFiltradas = inscripcionesFiltradas.filter(inscripcion => {
            const estudiante = this.estudiantes.find(est => est.id === inscripcion.estudiante);
            return estudiante && estudiante.email.toLowerCase().includes(this.busquedaCorreo.toLowerCase());
          });
        }
  
        return inscripcionesFiltradas;
      },
    },
    async mounted() {
      await this.cargarDatos();
    },
    methods: {
      async cargarDatos() {
        try {
          this.inscripciones = await this.modeloInscripciones.obtenerInscripciones();
          this.cursos = await this.modeloInscripciones.obtenerCursos();
          this.estudiantes = await this.modeloInscripciones.obtenerEstudiantes();
          this.colegios = await this.modeloInscripciones.obtenerColegios();
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      },
  
      async agregarInscripcion() {
        try {
          const estudiante = await this.modeloInscripciones.verificarEstudiantePorCorreo(this.inscripcion.email);
          if (!estudiante) {
            this.errorMensaje = "El correo ingresado no pertenece a un estudiante registrado.";
            return;
          }
          
          this.inscripcion.estudiante = estudiante.id;
          await this.modeloInscripciones.crearInscripcion(this.inscripcion);
          await this.cargarDatos();
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al agregar inscripción:", error);
        }
      },
  
      obtenerNombreEstudiante(estudianteId) {
        const estudiante = this.estudiantes.find(est => est.id === estudianteId);
        return estudiante ? estudiante.name : "N/A";
      },
  
      obtenerCorreoEstudiante(estudianteId) {
        const estudiante = this.estudiantes.find(est => est.id === estudianteId);
        return estudiante ? estudiante.email : "N/A";
      },
  
      obtenerNombreCurso(cursoId) {
        const curso = this.cursos.find(cur => cur.id === cursoId);
        return curso ? curso.asignatura : "N/A";
      },
  
      limpiarFormulario() {
        this.inscripcion = {
          email: "",
          curso: null,
          promedio: null,
        };
        this.errorMensaje = "";
      },
  
      filtrarInscripcionesPorColegio() {
        // Este método se usa para actualizar la lista de inscripciones según el colegio seleccionado
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos generales y específicos para el diseño */
  #header {
    background-color: #004d40;
    color: white;
    padding: 15px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  h2 {
    text-align: center;
    color: #004d40;
  }

  .filter-container,
  .form-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    margin: 20px auto;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .form-field {
    margin-bottom: 25px;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .add-button,
  .edit-button,
  .delete-button {
    background-color: #004d40;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  .edit-button {
    background-color: #f39c12;
  }
  
  .delete-button {
    background-color: #e74c3c;
  }
  
  .table-container {
    margin: 20px auto;
    max-width: 1000px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #333;
    color: white;
  }
</style>
  