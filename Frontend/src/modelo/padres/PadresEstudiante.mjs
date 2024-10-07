import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class PadresEstudiantes {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener el usuario logeado para obtener su ID
  async obtenerUsuarioLogeado() {
    try {
      const response = await this.requestHandler.getRequest("/user/me/");
      return response.data; // Devuelve el usuario con su ID (pk)
    } catch (error) {
      console.error("Error al obtener el usuario logeado:", error);
      throw error;
    }
  }

  // Obtener estudiantes donde el user_padre o user_madre coincida con el ID del padre/madre logeado
  async obtenerEstudiantesPorPadreOMadre(userId) {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/estudiantes/"
      );
      const estudiantes = response.data;

      // Filtrar estudiantes cuyos padres coinciden con el userId logeado
      return estudiantes.filter(
        (estudiante) =>
          estudiante.user_padre === userId || estudiante.user_madre === userId
      );
    } catch (error) {
      console.error("Error al obtener los estudiantes asociados:", error);
      throw error;
    }
  }
}
