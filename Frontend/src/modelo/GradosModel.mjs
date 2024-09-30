import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      grados: [], // Lista de grados
      requestHandler: new RequestHandler(),
      nuevoGrado: {
        nombre: "", // Para agregar un nuevo grado
      },
      gradoEditado: null, // Grado que se está editando
    };
  },
  created() {
    this.fetchGrados();
  },
  methods: {
    // Método para obtener los grados
    async fetchGrados() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/grados/"
        );
        this.grados = response.data; // Asignar los grados obtenidos a la lista
      } catch (error) {
        console.error("Error obteniendo los grados:", error);
      }
    },

    // Método para agregar un nuevo grado
    async agregarGrado() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/grados/",
          this.nuevoGrado
        );
        if (response.status === 201) {
          this.fetchGrados(); // Refrescar la lista de grados
          alert("¡Grado agregado exitosamente!");
          this.nuevoGrado = { nombre: "" }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el grado:", error);
      }
    },

    // Método para eliminar un grado
    async deleteGrado(id) {
      const confirmation = confirm("¿Confirma eliminar el grado?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/grados/${id}`);
          this.fetchGrados(); // Refrescar la lista tras eliminar
          alert("¡Grado eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el grado:", error);
        }
      }
    },

    // Método para establecer el grado que se está editando
    setEditarGrado(grado) {
      this.gradoEditado = { ...grado }; // Clonar el objeto para evitar cambios directos
    },

    // Método para editar el grado
    async editarGrado() {
      if (!this.gradoEditado) return;
   
      try {
         const response = await this.requestHandler.putRequest(
            `/academico/grados/${this.gradoEditado.id}/`, // Verificación del ID del grado
            { nombre: this.gradoEditado.nombre } // Asegúrate de enviar solo el campo 'nombre'
         );
         if (response.status === 200) {
            this.fetchGrados(); // Refrescar lista de grados
            alert("¡Grado editado exitosamente!");
            this.gradoEditado = null; // Limpiar formulario
         }
      } catch (error) {
         console.error("Error editando el grado:", error);
      }
   },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.gradoEditado = null; // Restablecer el estado
    }
  },
};
