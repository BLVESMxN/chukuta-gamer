import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      estudiantes: [],    // Lista de estudiantes
      colegios: [],       // Lista de colegios
      grados: [],         // Lista de grados
      padres: [],         // Lista de padres
      requestHandler: new RequestHandler(),
      nuevoEstudiante: {
        name: "",          // Nombre del estudiante
        colegio: 0,        // ID del colegio
        grado: 0,          // ID del grado
        user_padre: 0,     // ID del padre
        user_madre: 0      // ID de la madre (usamos padres para ambos campos)
      },
      estudianteEditado: null,   // Estudiante que se está editando
      filtroColegio: "",         // Filtro por colegio
      filtroGrado: "",           // Filtro por grado
      busquedaNombre: "",        // Buscador por nombre
      ordenNombreAscendente: true  // Ordenación ascendente por nombre
    };
  },
  created() {
    this.fetchEstudiantes();    // Obtener lista de estudiantes
    this.fetchColegios();       // Obtener lista de colegios
    this.fetchGrados();         // Obtener lista de grados
    this.fetchPadres();         // Obtener lista de padres
  },
  methods: {
    // Obtener la lista de estudiantes
    async fetchEstudiantes() {
      try {
        const response = await this.requestHandler.getRequest("/academico/estudiantes/");
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error obteniendo estudiantes:", error);
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

    // Obtener la lista de grados
    async fetchGrados() {
      try {
        const response = await this.requestHandler.getRequest("/academico/grados/");
        this.grados = response.data;
      } catch (error) {
        console.error("Error obteniendo grados:", error);
      }
    },

    // Obtener la lista de padres
    async fetchPadres() {
      try {
        const response = await this.requestHandler.getRequest("/academico/padres/");
        this.padres = response.data;
      } catch (error) {
        console.error("Error obteniendo padres:", error);
      }
    },

    // Agregar un nuevo estudiante
    async agregarEstudiante() {
      try {
        const response = await this.requestHandler.postRequest("/academico/estudiantes/", {
          name: this.nuevoEstudiante.name,
          colegio: this.nuevoEstudiante.colegio,
          grado: this.nuevoEstudiante.grado,
          user_padre: this.nuevoEstudiante.user_padre,
          user_madre: this.nuevoEstudiante.user_madre
        });
        if (response.status === 201) {
          this.fetchEstudiantes();  // Refrescar la lista de estudiantes
          alert("¡Estudiante agregado exitosamente!");
          this.nuevoEstudiante = { name: "", colegio: 0, grado: 0, user_padre: 0, user_madre: 0 };  // Limpiar formulario
        }
      } catch (error) {
        console.error("Error agregando el estudiante:", error);
      }
    },

    // Editar un estudiante existente
    async editarEstudiante() {
      if (!this.estudianteEditado) return;
      try {
        const response = await this.requestHandler.putRequest(`/academico/estudiantes/${this.estudianteEditado.id}/`, {
          name: this.estudianteEditado.name,
          colegio: this.estudianteEditado.colegio,
          grado: this.estudianteEditado.grado,
          user_padre: this.estudianteEditado.user_padre,
          user_madre: this.estudianteEditado.user_madre
        });
        if (response.status === 200) {
          this.fetchEstudiantes();  // Refrescar lista de estudiantes
          alert("¡Estudiante editado exitosamente!");
          this.estudianteEditado = null;  // Limpiar la edición
        }
      } catch (error) {
        console.error("Error editando el estudiante:", error);
      }
    },

    // Eliminar un estudiante
    async deleteEstudiante(id) {
      const confirmation = confirm("¿Confirma eliminar el estudiante?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/estudiantes/${id}`);
          this.fetchEstudiantes();  // Refrescar lista de estudiantes
          alert("¡Estudiante eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el estudiante:", error);
        }
      }
    },

    // Establecer el estudiante a editar
    setEditarEstudiante(estudiante) {
      this.estudianteEditado = { ...estudiante };  // Clonar para evitar cambios directos
    },

    // Cancelar la edición del estudiante
    cancelarEdicion() {
      this.estudianteEditado = null;
    }
  },

  
  computed: {
    // Filtrar estudiantes por nombre, colegio y grado
    estudiantesFiltrados() {
      return this.estudiantes.filter(estudiante => {
        const cumpleNombre = this.busquedaNombre ? estudiante.name.toLowerCase().includes(this.busquedaNombre.toLowerCase()) : true;
        const cumpleColegio = this.filtroColegio ? estudiante.colegio === parseInt(this.filtroColegio) : true;
        const cumpleGrado = this.filtroGrado ? estudiante.grado === parseInt(this.filtroGrado) : true;
        return cumpleNombre && cumpleColegio && cumpleGrado;
      });
    },

    // Ordenar estudiantes por nombre
    estudiantesOrdenados() {
      return [...this.estudiantesFiltrados].sort((a, b) => {
        if (this.ordenNombreAscendente) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
  }
};
