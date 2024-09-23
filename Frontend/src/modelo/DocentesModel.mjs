import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      docentes: [],  // Lista de docentes
      requestHandler: new RequestHandler(),  // Instancia para manejar las solicitudes HTTP
      nuevoDocente: {  // Datos para un nuevo docente
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        carrera: "",
      },
    };
  },
  created() {
    this.fetchDocentes();  // Carga inicial de docentes al crear el componente
  },
  methods: {
    // Método para obtener los docentes
    async fetchDocentes() {
      try {
        const response = await this.requestHandler.getRequest("/academico/docentes/");
        this.docentes = response.data;  // Asigna los datos de los docentes al estado del componente
      } catch (error) {
        console.error("Error obteniendo los docentes:", error);  // Manejo de errores
      }
    },

    // Método para agregar un nuevo docente
    async agregarDocente() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/docentes/",
          this.nuevoDocente
        );
        if (response.status === 201) {
          // Verificamos si el docente fue creado con éxito
          this.fetchDocentes();  // Refrescamos la lista de docentes
          alert("¡Docente agregado exitosamente!");
          this.nuevoDocente = {  // Limpiamos el formulario
            nombres: "",
            apellidos: "",
            fecha_nacimiento: "",
            carrera: "",
          };
        }
      } catch (error) {
        console.error("Error agregando el docente:", error);  // Manejo de errores
      }
    },

    // Método para eliminar un docente
    async deleteDocente(id) {
      const confirmation = confirm("¿Confirma eliminar el registro?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/docentes/${id}`);
          this.fetchDocentes();  // Actualizamos la lista después de eliminar
          alert("¡Eliminado con éxito!");
        } catch (error) {
          console.error("Error eliminando el docente:", error);  // Manejo de errores
        }
      }
    },
  },
};
