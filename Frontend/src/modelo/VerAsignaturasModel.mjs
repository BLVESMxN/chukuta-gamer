import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class VerAsignaturasModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener el ID del usuario logueado (padre o madre)
  async obtenerUsuarioActual() {
    try {
      const response = await this.requestHandler.getRequest("/user/me/");
      return response.data.pk;
    } catch (error) {
      console.error(
        "Error al obtener la información del usuario actual:",
        error
      );
      throw error;
    }
  }

  // Obtener el estudiante asociado al usuario actual (padre o madre)
  async obtenerEstudiantesPorPadreOMadre(userId) {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/estudiantes/"
      );
      const estudiantes = response.data.filter(
        (estudiante) =>
          estudiante.user_padre === userId || estudiante.user_madre === userId
      );
      if (estudiantes.length === 0) {
        console.error(
          "No se encontraron estudiantes asociados al padre o madre con ID:",
          userId
        );
        return [];
      }
      return estudiantes;
    } catch (error) {
      console.error(
        "Error al obtener estudiantes asociados al padre o madre:",
        error
      );
      throw error;
    }
  }

  // Obtener asignaturas según el grado del estudiante
  async obtenerAsignaturasPorGrado(gradoId) {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/asignaturas/",
        {
          grado: gradoId,
        }
      );
      if (response.data.length === 0) {
        console.error(
          `No se encontraron asignaturas para el grado con ID: ${gradoId}`
        );
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error al obtener asignaturas por grado:", error);
      throw error;
    }
  }
}
