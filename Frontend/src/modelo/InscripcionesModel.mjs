import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      inscripciones: [],    // Lista de inscripciones
      estudiantes: [],      // Lista de estudiantes disponibles
      cursos: [],           // Lista de cursos disponibles
      asignaturas: [],      // Lista de asignaturas
      grados: [],           // Lista de grados
      requestHandler: new RequestHandler(),
      nuevaInscripcion: {
        curso: 0,          // ID del curso
        estudiante: 0,     // ID del estudiante
        promedio: 0        // Promedio del estudiante
      },
      inscripcionEditada: null,  // Inscripción que se está editando
      filtroEstudiante: "",      // Filtro por estudiante
      filtroCurso: "",           // Filtro por curso
      ordenPromedioAscendente: true // Orden por promedio
    };
  },
  created() {
    this.fetchInscripciones();
    this.fetchEstudiantes();
    this.fetchCursos();
    this.fetchAsignaturas();
    this.fetchGrados();
  },
  methods: {
    // Obtener la lista de inscripciones
    async fetchInscripciones() {
      try {
        const response = await this.requestHandler.getRequest("/academico/inscripciones/");
        this.inscripciones = response.data;
      } catch (error) {
        console.error("Error obteniendo inscripciones:", error);
      }
    },

    // Obtener la lista de estudiantes
    async fetchEstudiantes() {
      try {
        const response = await this.requestHandler.getRequest("/academico/estudiantes/");
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error obteniendo estudiantes:", error);
      }
    },

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

    // Obtener la lista de grados
    async fetchGrados() {
      try {
        const response = await this.requestHandler.getRequest("/academico/grados/");
        this.grados = response.data;
      } catch (error) {
        console.error("Error obteniendo grados:", error);
      }
    },

    // Crear nueva inscripción con validación de grado
    async agregarInscripcion() {
      const estudianteSeleccionado = this.estudiantes.find(est => est.id === this.nuevaInscripcion.estudiante);
      const cursoSeleccionado = this.cursos.find(curso => curso.id === this.nuevaInscripcion.curso);
      
      if (!this.validarInscripcion(estudianteSeleccionado, cursoSeleccionado)) {
        alert("El estudiante no pertenece al grado del curso seleccionado.");
        return;
      }

      try {
        const response = await this.requestHandler.postRequest("/academico/inscripciones/", this.nuevaInscripcion);
        if (response.status === 201) {
          this.fetchInscripciones();
          alert("¡Inscripción agregada exitosamente!");
          this.nuevaInscripcion = { curso: 0, estudiante: 0, promedio: 0 };
        }
      } catch (error) {
        console.error("Error agregando la inscripción:", error);
      }
    },

    // Editar una inscripción con validación de grado
    async editarInscripcion() {
      const estudianteSeleccionado = this.estudiantes.find(est => est.id === this.inscripcionEditada.estudiante);
      const cursoSeleccionado = this.cursos.find(curso => curso.id === this.inscripcionEditada.curso);

      if (!this.validarInscripcion(estudianteSeleccionado, cursoSeleccionado)) {
        alert("El estudiante no pertenece al grado del curso seleccionado.");
        return;
      }

      try {
        const response = await this.requestHandler.putRequest(`/academico/inscripciones/${this.inscripcionEditada.id}/`, this.inscripcionEditada);
        if (response.status === 200) {
          this.fetchInscripciones();
          alert("¡Inscripción editada exitosamente!");
          this.inscripcionEditada = null;
        }
      } catch (error) {
        console.error("Error editando la inscripción:", error);
      }
    },

    // Eliminar una inscripción
    async deleteInscripcion(id) {
      const confirmation = confirm("¿Confirma eliminar la inscripción?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/inscripciones/${id}`);
          this.fetchInscripciones();
          alert("¡Inscripción eliminada exitosamente!");
        } catch (error) {
          console.error("Error eliminando la inscripción:", error);
        }
      }
    },

    // Validar que el grado del estudiante coincida con el del curso
    validarInscripcion(estudiante, curso) {
      const asignatura = this.asignaturas.find(asig => asig.id === curso.asignatura);
      const gradoDelCurso = this.grados.find(gr => gr.id === asignatura.grado);

      if (!estudiante || !curso || !gradoDelCurso) return false;

      return estudiante.grado === gradoDelCurso.id;  // Validamos que el grado coincida
    },

    // Obtener el nombre completo de un curso, con asignatura y grado
    obtenerNombreCurso(idCurso) {
      const curso = this.cursos.find(curso => curso.id === idCurso);
      if (!curso) return "N/A";

      const asignatura = this.asignaturas.find(asig => asig.id === curso.asignatura);
      const grado = this.grados.find(gr => gr.id === asignatura.grado);

      return asignatura && grado ? `${asignatura.nombre} - ${this.obtenerDescripcionGrado(grado)}` : "N/A";
    },

    // Obtener la descripción de un grado (usado en la función obtenerNombreCurso)
    obtenerDescripcionGrado(grado) {
      return `${grado.nivel === 1 ? 'Primaria' : 'Secundaria'} - ${grado.grado}º`;
    },

    // Nueva función para obtener la descripción de un grado por ID
    DescripcionGrado(idGrado) {
      const grado = this.grados.find(gr => gr.id === idGrado);
      if (!grado) return "Grado no encontrado"; // Si no se encuentra el grado, devolver un mensaje adecuado.
      return `${grado.nivel === 1 ? 'Primaria' : 'Secundaria'} - ${grado.grado}º`;
    },

    // Obtener el nombre de un estudiante por ID
    obtenerNombreEstudiante(idEstudiante) {
      const estudiante = this.estudiantes.find(est => est.id === idEstudiante);
      return estudiante ? estudiante.name : "N/A";
    }
  }
};
