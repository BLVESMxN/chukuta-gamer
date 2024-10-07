import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      profesores: [], // Lista de profesores
      colegios: [],   // Lista de colegios
      requestHandler: new RequestHandler(),
      nuevoProfesor: {
        name: "",    // Nombre del profesor
        colegio: 0,  // ID del colegio
      },
      profesorEditado: null,  // Profesor que se está editando
      filtroNombre: "",       // Filtro por nombre
      filtroColegio: "",      // Filtro por colegio
    };
  },
  created() {
    this.fetchProfesores();
    this.fetchColegios();  // Obtener la lista de colegios al cargar el componente
  },
  methods: {
    // Obtener la lista de profesores
    async fetchProfesores() {
      try {
        const response = await this.requestHandler.getRequest("/academico/profesores/");
        this.profesores = response.data;
      } catch (error) {
        console.error("Error obteniendo profesores:", error);
      }
    },

    // Obtener la lista de colegios
    async fetchColegios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/colegios/");
        this.colegios = response.data;
      } catch (error) {
        console.error("Error obteniendo colegios:", error);
      }
    },

    // Agregar un nuevo profesor
    async agregarProfesor() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/profesores/",
          this.nuevoProfesor
        );
        if (response.status === 201) {
          this.fetchProfesores();
          alert("¡Profesor agregado exitosamente!");
          this.nuevoProfesor = { name: "", colegio: 0 };  // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el profesor:", error);
      }
    },

    // Eliminar un profesor
    async deleteProfesor(id) {
      const confirmation = confirm("¿Confirma eliminar al profesor?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/profesores/${id}`);
          this.fetchProfesores();
          alert("¡Profesor eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el profesor:", error);
        }
      }
    },

    // Establecer el profesor que se está editando
    setEditarProfesor(profesor) {
      this.profesorEditado = { ...profesor };  // Clonar para evitar cambios directos
    },

    // Editar un profesor
    async editarProfesor() {
      if (!this.profesorEditado) return;
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/profesores/${this.profesorEditado.id}/`,
          {
            name: this.profesorEditado.name,
            colegio: this.profesorEditado.colegio,
          }
        );
        if (response.status === 200) {
          this.fetchProfesores();
          alert("¡Profesor editado exitosamente!");
          this.profesorEditado = null;
        }
      } catch (error) {
        console.error("Error editando el profesor:", error);
      }
    },

    // Cancelar la edición
    cancelarEdicion() {
      this.profesorEditado = null;
    }
  }
};
