import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      cursos: [],          // Lista de cursos
      asignaturas: [],      // Lista de asignaturas
      periodos: [],         // Lista de periodos
      profesores: [],       // Lista de profesores
      horarios: [],         // Lista de horarios
      requestHandler: new RequestHandler(),
      nuevoCurso: {
        asignatura: 0,     // ID de la asignatura seleccionada
        periodo: 0,        // ID del periodo seleccionado
        profesor: 0,       // ID del profesor seleccionado
        horarios: [],      // Lista de IDs de los horarios seleccionados
      },
      cursoEditado: null,   // Curso que se está editando
      filtroAsignatura: "", // Filtro por asignatura
      filtroPeriodo: "",    // Filtro por periodo
      filtroProfesor: "",   // Filtro por profesor
      filtroHorario: "",    // Filtro por horario
    };
  },
  created() {
    this.fetchCursos();
    this.fetchAsignaturas();   // Obtener lista de asignaturas al crear el componente
    this.fetchPeriodos();      // Obtener lista de periodos
    this.fetchProfesores();    // Obtener lista de profesores
    this.fetchHorarios();      // Obtener lista de horarios
  },
  methods: {
    // Obtener la lista de cursos
    async fetchCursos() {
      try {
        const response = await this.requestHandler.getRequest("/academico/cursos/");
        this.cursos = response.data;
      } catch (error) {
        console.error("Error obteniendo cursos:", error);
      }
    },

    // Obtener la lista de asignaturas
    async fetchAsignaturas() {
      try {
        const response = await this.requestHandler.getRequest("/academico/asignaturas/");
        this.asignaturas = response.data;
      } catch (error) {
        console.error("Error obteniendo asignaturas:", error);
      }
    },

    // Obtener la lista de periodos
    async fetchPeriodos() {
      try {
        const response = await this.requestHandler.getRequest("/academico/periodos/");
        this.periodos = response.data;
      } catch (error) {
        console.error("Error obteniendo periodos:", error);
      }
    },

    // Obtener la lista de profesores
    async fetchProfesores() {
      try {
        const response = await this.requestHandler.getRequest("/academico/profesores/");
        this.profesores = response.data;
      } catch (error) {
        console.error("Error obteniendo profesores:", error);
      }
    },

    // Obtener la lista de horarios
    async fetchHorarios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/horarios/");
        this.horarios = response.data;
      } catch (error) {
        console.error("Error obteniendo horarios:", error);
      }
    },

    // Agregar un nuevo curso
    async agregarCurso() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/cursos/",
          this.nuevoCurso
        );
        if (response.status === 201) {
          this.fetchCursos();
          alert("¡Curso agregado exitosamente!");
          this.nuevoCurso = { asignatura: 0, periodo: 0, profesor: 0, horarios: [] };  // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el curso:", error);
      }
    },

    // Eliminar un curso
    async deleteCurso(id) {
      const confirmation = confirm("¿Confirma eliminar el curso?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/cursos/${id}`);
          this.fetchCursos();
          alert("¡Curso eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el curso:", error);
        }
      }
    },

    // Establecer el curso que se está editando
    setEditarCurso(curso) {
      this.cursoEditado = { ...curso };  // Clonar para evitar cambios directos
    },

    // Editar un curso
    async editarCurso() {
      if (!this.cursoEditado) return;
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/cursos/${this.cursoEditado.id}/`,
          {
            asignatura: this.cursoEditado.asignatura,
            periodo: this.cursoEditado.periodo,
            profesor: this.cursoEditado.profesor,
            horarios: this.cursoEditado.horarios,
          }
        );
        if (response.status === 200) {
          this.fetchCursos();
          alert("¡Curso editado exitosamente!");
          this.cursoEditado = null;
        }
      } catch (error) {
        console.error("Error editando el curso:", error);
      }
    },

    // Cancelar la edición
    cancelarEdicion() {
      this.cursoEditado = null;
    }
  }
};
