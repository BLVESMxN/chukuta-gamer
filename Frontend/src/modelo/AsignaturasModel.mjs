import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      estudiantes: [],
      requestHandler: new RequestHandler(),
      nuevoEstudiante: {
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
      },
      idEstudianteActual: null,
    };
  },
  created() {
    this.fetchEstudiantes();
  },
  methods: {
    // Método para obtener los estudiantes
    async fetchEstudiantes() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/estudiantes/"
        );
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error obteniendo los estudiantes:", error);
      }
    },

    // Método para agregar un nuevo estudiante
    async agregarEstudiante() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/estudiantes/",
          this.nuevoEstudiante
        );
        if (response.status === 201) {
          // Verificamos si el estudiante fue creado con éxito
          this.fetchEstudiantes(); // Refrescamos la lista de estudiantes
          alert("¡Estudiante agregado exitosamente!");
          this.nuevoEstudiante = {
            nombres: "",
            apellidos: "",
            fecha_nacimiento: "",
          }; // Limpiamos el formulario
        }
      } catch (error) {
        console.error("Error agregando el estudiante:", error);
      }
    },

    async editarEstudiante() {
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/estudiantes/${this.idEstudianteActual}`,
          this.nuevoEstudiante
        );
        if (response.status === 200) {
          alert("¡Estudiante actualizado exitosamente!");
          this.fetchEstudiantes(); // Refrescamos la lista de estudiantes
        }
      } catch (error) {
        console.error("Error actualizando el estudiante:", error);
      }
    },

    // Método para eliminar un estudiante
    async deleteEstudiante(id) {
      const confirmation = confirm("¿Confirma eliminar el registro?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(
            `/academico/estudiantes/${id}`
          );
          this.fetchEstudiantes(); // Actualizamos la lista después de eliminar
          alert("¡Eliminado con éxito!");
        } catch (error) {
          console.error("Error eliminando el estudiante:", error);
        }
      }
    },


  },
};
