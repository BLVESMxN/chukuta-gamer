import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      colegios: [], // Lista de colegios
      requestHandler: new RequestHandler(),
      nuevoColegio: {
        nombre: "", // Nombre del colegio
        admin: 0, // ID del administrador
        suscripcion: true, // Estado de suscripción (activo/inactivo)
        extension: "", // Extensión del colegio
      },
      colegioEditado: null, // Colegio que se está editando
    };
  },
  created() {
    this.fetchColegios();
  },
  methods: {
    // Método para obtener los colegios
    async fetchColegios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/colegios/");
        this.colegios = response.data; // Asignar los colegios obtenidos a la lista
      } catch (error) {
        console.error("Error obteniendo los colegios:", error);
      }
    },

    // Método para agregar un nuevo colegio
    async agregarColegio() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/colegios/",
          this.nuevoColegio
        );
        
        if (response.status === 201) {
          this.fetchColegios(); // Refrescar la lista de colegios
          alert("¡Colegio agregado exitosamente!");
          this.nuevoColegio = { nombre: "", admin: 0, suscripcion: true, extension: "" }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el colegio:", error);
      }
    },

    // Método para eliminar un colegio
    async deleteColegio(id) {
      const confirmation = confirm("¿Confirma eliminar el colegio?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/colegios/${id}`);
          this.fetchColegios(); // Refrescar la lista tras eliminar
          alert("¡Colegio eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el colegio:", error);
        }
      }
    },

    // Método para establecer el colegio que se está editando
    setEditarColegio(colegio) {
      this.colegioEditado = { ...colegio }; // Clonar el objeto para evitar cambios directos
    },

    // Método para editar el colegio
    async editarColegio() {
      if (!this.colegioEditado) return;

      try {
        const response = await this.requestHandler.putRequest(
          `/academico/colegios/${this.colegioEditado.id}/`,
          { 
            nombre: this.colegioEditado.nombre,
            admin: this.colegioEditado.admin,
            suscripcion: this.colegioEditado.suscripcion,
            extension: this.colegioEditado.extension
          }
        );
        if (response.status === 200) {
          this.fetchColegios(); // Refrescar lista de colegios
          alert("¡Colegio editado exitosamente!");
          this.colegioEditado = null; // Limpiar formulario
        }
      } catch (error) {
        console.error("Error editando el colegio:", error);
      }
    },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.colegioEditado = null; // Restablecer el estado
    }
  },
};
