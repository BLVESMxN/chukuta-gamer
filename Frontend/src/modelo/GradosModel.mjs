import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      grados: [], // Lista de grados
      requestHandler: new RequestHandler(),
      nuevoGrado: {
        nivel: 1, // 1 para "Primaria", 2 para "Secundaria"
        grado: 1, // Número entre 1 y 6 para los grados
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
          this.nuevoGrado = { nivel: 1, grado: 1 }; // Limpiar el formulario
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
            `/academico/grados/${this.gradoEditado.id}/`,
            { 
              nivel: this.gradoEditado.nivel,
              grado: this.gradoEditado.grado
            } // Enviar el 'nivel' y 'grado' correctos
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
