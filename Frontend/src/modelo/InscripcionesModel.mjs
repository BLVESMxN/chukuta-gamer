import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class InscripcionesModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener todas las inscripciones
  async obtenerInscripciones() {
    try {
      const response = await this.requestHandler.getRequest("/academico/inscripciones/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
      throw error;
    }
  }

  // Crear una nueva inscripción
  async crearInscripcion(inscripcion) {
    try {
      const response = await this.requestHandler.postRequest("/academico/inscripciones/", inscripcion);
      return response.data;
    } catch (error) {
      console.error("Error al crear inscripción:", error);
      throw error;
    }
  }

  // Obtener todos los cursos y procesar datos del grado y asignatura
  async obtenerCursos() {
    try {
      const cursosResponse = await this.requestHandler.getRequest("/academico/cursos/");
      const asignaturasResponse = await this.requestHandler.getRequest("/academico/asignaturas/");
      const gradosResponse = await this.requestHandler.getRequest("/academico/grados/");

      // Procesar cursos para mostrar asignatura y grado
      const cursosConDetalle = cursosResponse.data.map((curso) => {
        const asignatura = asignaturasResponse.data.find(asign => asign.id === curso.asignatura);
        const grado = gradosResponse.data.find(gr => gr.id === asignatura.grado);

        return {
          id: curso.id,
          asignatura: asignatura.nombre,
          grado: `${this.obtenerNivel(grado.nivel)} - Grado ${grado.grado}`,
        };
      });

      return cursosConDetalle;
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      throw error;
    }
  }

  // Obtener el nombre del nivel según su valor (1 = Primaria, 2 = Secundaria)
  obtenerNivel(nivel) {
    return nivel === 1 ? "Primaria" : "Secundaria";
  }

  // Obtener estudiantes
  async obtenerEstudiantes() {
    try {
      const response = await this.requestHandler.getRequest("/academico/estudiantes/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      throw error;
    }
  }

  // Obtener colegios
  async obtenerColegios() {
    try {
      const response = await this.requestHandler.getRequest("/academico/colegios/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener colegios:", error);
      throw error;
    }
  }

  // Verificar que el estudiante pertenezca al colegio correcto
  async verificarEstudiantePorCorreo(email) {
    try {
      const estudiantes = await this.obtenerEstudiantes();
      const estudiante = estudiantes.find(est => est.email === email);
      return estudiante;
    } catch (error) {
      console.error("Error al verificar estudiante:", error);
      throw error;
    }
  }
}
