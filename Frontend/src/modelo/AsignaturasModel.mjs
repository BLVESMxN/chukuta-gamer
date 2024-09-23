import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      asignaturas: [],
      requestHandler: new RequestHandler(),
      nuevaAsignatura: {
        nombre: "",
        grado: 0,
      },
      asignaturaEditada: null, // Asignatura que se está editando
    };
  },
  created() {
    this.fetchAsignaturas();
  },
  methods: {
    // Método para obtener las asignaturas
    async fetchAsignaturas() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/asignaturas/"
        );
        this.asignaturas = response.data;
      } catch (error) {
        console.error("Error obteniendo las asignaturas:", error);
      }
    },

    // Método para agregar una nueva asignatura
    async agregarAsignatura() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/asignaturas/",
          this.nuevaAsignatura
        );

        if (response && response.status === 201) {
          this.fetchAsignaturas(); // Refrescar la lista de asignaturas
          alert("¡Asignatura agregada exitosamente!");
          this.nuevaAsignatura = {
            nombre: "",
            grado: 0,
          }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando la asignatura:", error);
      }
    },

    // Método para eliminar una asignatura
    async deleteAsignatura(id) {
      const confirmation = confirm("¿Confirma eliminar el registro?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(
            `/academico/asignaturas/${id}`
          );
          this.fetchAsignaturas(); // Actualizar lista después de eliminar
          alert("¡Eliminado con éxito!");
        } catch (error) {
          console.error("Error eliminando la asignatura:", error);
        }
      }
    },

    // Método para establecer la asignatura que se está editando
    setEditarAsignatura(asignatura) {
      this.asignaturaEditada = { ...asignatura }; // Clonar el objeto
    },

    // Método para editar la asignatura
    async editarAsignatura() {
      if (!this.asignaturaEditada) return;

      try {
        const response = await this.requestHandler.putRequest(
          `/academico/asignaturas/${this.asignaturaEditada.id}`, // Verificar el ID de la asignatura
          { nombre: this.asignaturaEditada.nombre, grado: this.asignaturaEditada.grado } // Enviar los campos requeridos
        );
        if (response.status === 200) {
          this.fetchAsignaturas(); // Refrescar lista de asignaturas
          alert("¡Asignatura editada exitosamente!");
          this.asignaturaEditada = null; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error editando la asignatura:", error);
      }
    },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.asignaturaEditada = null; // Restablecer el estado
    },
  },
};
