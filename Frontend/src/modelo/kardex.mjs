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
        notas: { trimestre1: 80, trimestre2: 85, trimestre3: 90 },
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
              trimestre1: materia.notas.trimestre1,
              trimestre2: materia.notas.trimestre2,
              trimestre3: materia.notas.trimestre3,
            },
          }));
      } catch (error) {
        console.error("Error obteniendo el reporte académico:", error);
      }
    },
  },
};
