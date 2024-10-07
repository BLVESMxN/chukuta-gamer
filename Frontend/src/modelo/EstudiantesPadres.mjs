import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      estudiantes: [],
      requestHandler: new RequestHandler(),
      nuevoEstudiante: {
        id: "",
        nombres: "",
        colegio: "",
      },
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
