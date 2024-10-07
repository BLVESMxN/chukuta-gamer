import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      estudiantes: [
        { nombre: 'Juan', edad: 30 },
        { nombre: 'Ana', edad: 25 },
        { nombre: 'Pedro', edad: 28 },
        { nombre: 'Carla', edad: 24 },
        { nombre: 'Luis', edad: 32 },
        { nombre: 'Maria', edad: 27 },
        { nombre: 'Maria', edad: 27 },
      ],
      paginaActual: 0,
      estudiantesPorPagina: 3,
      requestHandler: new RequestHandler(),
      nuevoEstudiante: {
        id: "",
        nombres: "",
        colegio: "",
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
  },
  
};
