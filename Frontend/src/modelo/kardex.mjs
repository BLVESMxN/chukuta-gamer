import { RequestHandler } from "@/controlador/RequestHandler.mjs";

import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  name: 'ReporteAcademico',
  data() {
    return {
      estudiante: {
        nombres: "",
        apellidos: "",
        curso: "",
      },
      materias: [{
        asignatura: 'Matemáticas',
        notas: { parcial1: 80, parcial2: 85, parcial3: 90 },
        tareas: 'Completado',
      },], 
      requestHandler: new RequestHandler(), 
      nuevoReporte: {
        asignatura: "",
        calificacion: "",
      },
    };
  },
  created() {
    this.fetchReporteAcademico(); 
  },
  methods: {

    async fetchReporteAcademico() {
      try {
        const [estudianteResponse, materiasResponse] = await Promise.all([
            this.requestHandler.getRequest("/academico/revisiones/"), 
            this.requestHandler.getRequest("/academico/estudiantes/"), 
          ]);
          const datosEstudiante = estudianteResponse.data;
          this.estudiante = {
            nombres: datosEstudiante.estudiante.nombres, 
          };
          this.materias = materiasResponse.data.map(materia => ({
            asignatura: materia.asignatura,
            notas: {
              parcial1: materia.notas.parcial1,
              parcial2: materia.notas.parcial2,
              parcial3: materia.notas.parcial3,
            },
          }));
      } catch (error) {
        console.error("Error obteniendo el reporte académico:", error);
      }
    },
  },
};
