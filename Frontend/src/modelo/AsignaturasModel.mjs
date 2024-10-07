import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      asignaturas: [], // Lista de asignaturas
      grados: [], // Lista de grados disponibles
      colegios: [], // Lista de colegios disponibles
      requestHandler: new RequestHandler(),
      nuevaAsignatura: {
        nombre: "", // Nombre de la asignatura
        grado: 0, // ID del grado
        colegio: 0, // ID del colegio
      },
      asignaturaEditada: null, // Asignatura en edición
    };
  },
  created() {
    this.fetchAsignaturas();
    this.fetchGrados(); // Obtenemos los grados al montar el componente
    this.fetchColegios();
  },
  methods: {
    // Método para obtener asignaturas
    async fetchAsignaturas() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/asignaturas/"
        );
        this.asignaturas = response.data;
      } catch (error) {
        console.error("Error obteniendo asignaturas:", error);
      }
    },

    // Método para obtener grados con debug
    async fetchGrados() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/grados/"
        );
        console.log("Grados obtenidos:", response.data); // Para verificar si los datos se están obteniendo
        this.grados = response.data;
      } catch (error) {
        console.error("Error obteniendo los grados:", error);
      }
    },

    // Método para obtener colegios
    async fetchColegios() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/colegios/"
        );
        this.colegios = response.data;
      } catch (error) {
        console.error("Error obteniendo los colegios:", error);
      }
    },

    // Método para agregar una nueva asignatura
    async agregarAsignatura() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/asignaturas/",
          this.nuevaAsignatura
        );
        if (response.status === 201) {
          this.fetchAsignaturas();
          alert("¡Asignatura agregada exitosamente!");
          this.nuevaAsignatura = { nombre: "", grado: 0, colegio: 0 }; // Limpiar formulario
        }
      } catch (error) {
        console.error("Error agregando la asignatura:", error);
      }
    },

    // Eliminar asignatura
    async deleteAsignatura(id) {
      const confirmation = confirm("¿Confirma eliminar la asignatura?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(
            `/academico/asignaturas/${id}`
          );
          this.fetchAsignaturas();
          alert("¡Asignatura eliminada exitosamente!");
        } catch (error) {
          console.error("Error eliminando la asignatura:", error);
        }
      }
    },

    // Establecer asignatura en edición
    setEditarAsignatura(asignatura) {
      this.asignaturaEditada = { ...asignatura };
    },

    // Editar asignatura
    async editarAsignatura() {
      if (!this.asignaturaEditada) return;
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/asignaturas/${this.asignaturaEditada.id}/`,
          {
            nombre: this.asignaturaEditada.nombre,
            grado: this.asignaturaEditada.grado,
            colegio: this.asignaturaEditada.colegio,
          }
        );
        if (response.status === 200) {
          this.fetchAsignaturas();
          alert("¡Asignatura editada exitosamente!");
          this.asignaturaEditada = null;
        }
      } catch (error) {
        console.error("Error editando la asignatura:", error);
      }
    },

    // Cancelar edición
    cancelarEdicion() {
      this.asignaturaEditada = null;
    },
  },
};
