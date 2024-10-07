import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      asistencias: [{ titulo: 'Asistencia clase Matemáticas', fecha: '2024-10-05', tipo: 'asistencia', color: '#32CD32' }, // LimeGreen
        { titulo: 'Falta clase Física', fecha: '2024-10-10', tipo: 'falta', color: '#FF6347' }, // Tomato
        { titulo: 'Asistencia clase Química', fecha: '2024-10-15', tipo: 'asistencia', color: '#32CD32' }, // LimeGreen
        { titulo: 'Falta clase Historia', fecha: '2024-10-20', tipo: 'falta', color: '#FF6347' },],
      requestHandler: new RequestHandler(),
      nuevaAsistencia: {
        id: "",
        fecha: "",
        asignatura_est: "",
      },
    };
  },
  created() {
    this.fetchAsistencias();
  },
  methods: {
    // Método para obtener los Asistencias
    async fetchAsistencias() {
      try {
        const response = await this.requestHandler.getRequest(
          "/academico/asistencias/"
        );
        this.asistencias = response.data;
      } catch (error) {
        console.error("Error obteniendo los asistencias:", error);
      }
    },

  },
};
