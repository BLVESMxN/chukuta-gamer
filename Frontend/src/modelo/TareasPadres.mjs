import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      tareas: [
        { nombre: 'Tarea Matemáticas', fechaEntrega: '2024-09-15', entregado: true, calificacion: 85 },
        { nombre: 'Tarea Física', fechaEntrega: '2024-09-20', entregado: false, calificacion: null },
        { nombre: 'Tarea Química', fechaEntrega: '2024-09-25', entregado: true, calificacion: 90 },
        { nombre: 'Tarea Historia', fechaEntrega: '2024-09-30', entregado: false, calificacion: null },
      ],
      requestHandler: new RequestHandler(),
    };
  },
  created() {
    this.fetchClases();
  },
  methods: {
    // Método para obtener los clases
    async fetchClases() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/clases/"
        );
        this.tareas = response.data;
      } catch (error) {
        console.error("Error obteniendo los clases:", error);
      }
    },

  },
};
