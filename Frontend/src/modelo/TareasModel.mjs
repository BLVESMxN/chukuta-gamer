import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
    
  data() {
    return {
      tareas: [],
      requestHandler: new RequestHandler(),
      nuevotarea: {
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        asignatura: "",
      },
    };
  },
  created() {
    this.fetchtareas();
  },
  methods: {
    // Método para obtener los tareas
    async fetchtareas() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/tareas/"
        );
        this.tareas = response.data;
      } catch (error) {
        console.error("Error obteniendo las tareas:", error);
      }
    },

    // Método para agregar un nuevo tarea
    async agregartarea() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/tareas/",
          this.nuevotarea
        );
        if (response.status === 201) {
          // Verificamos si el tarea fue creado con éxito
          this.fetchtareas(); // Refrescamos la lista de tareas
          alert("¡tarea agregada exitosamente!");
          this.nuevotarea = {
            descripcion: "",
            fecha_inicio: "",
            fecha_fin: "",
            asignatura: "",
          }; // Limpiamos el formulario
        }
      } catch (error) {
        console.error("Error agregando el tarea:", error);
      }
    },

    // Método para eliminar un tarea
    async deletetarea(id) {
      const confirmation = confirm("¿Confirma eliminar el registro?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(
            `/academico/tareas/${id}`
          );
          this.fetchtareas(); // Actualizamos la lista después de eliminar
          alert("¡Eliminado con éxito!");
        } catch (error) {
          console.error("Error eliminando el tarea:", error);
        }
      }
    },
  },
};
