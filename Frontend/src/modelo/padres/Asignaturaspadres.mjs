import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      clases: [
        { nombre: 'Matemáticas', profesor: 'Prof. García', horario: 'Lunes y Miércoles 10:00 - 12:00' },
        { nombre: 'Física', profesor: 'Prof. López', horario: 'Martes y Jueves 08:00 - 10:00' },
        { nombre: 'Química', profesor: 'Prof. Martínez', horario: 'Miércoles y Viernes 11:00 - 13:00' },
        { nombre: 'Historia', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
        { nombre: 'Religion', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
        { nombre: 'Filosofia', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
        { nombre: 'Computacion', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
      ],
      requestHandler: new RequestHandler(),
      nuevaAsistencia: {
        id: "",
        asignatura: "",
        periodo: "",
        profesor: "",
      },
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
        this.clases = response.data;
      } catch (error) {
        console.error("Error obteniendo los clases:", error);
      }
    },

  },
};
