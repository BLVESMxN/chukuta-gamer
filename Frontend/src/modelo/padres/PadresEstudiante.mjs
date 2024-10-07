import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class PadresEstudiantes {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener el pk del usuario logueado
  async obtenerPkUsuario() {
    try {
      const response = await this.requestHandler.getRequest("/user/me/");
      if (response && response.data) {
        return response.data.pk; // Devolver el pk del usuario logueado
      } else {
        throw new Error("Error: Datos de usuario no disponibles");
      }
    } catch (error) {
      console.error("Error al obtener el pk del usuario logueado:", error);
      throw error;
    }
  }

  // Obtener estudiantes asociados al padre o madre logueado
  async obtenerEstudiantesPorPadreOMadre() {
    try {
      const pkUsuario = await this.obtenerPkUsuario(); // Obtener el pk del padre o madre
      const response = await this.requestHandler.getRequest(
        "/academico/estudiantes/"
      );
      if (response && response.data) {
        const estudiantes = response.data;

        // Filtrar estudiantes donde el pk sea igual al user_padre o user_madre
        const estudiantesAsociados = estudiantes.filter(
          (estudiante) =>
            estudiante.user_padre === pkUsuario ||
            estudiante.user_madre === pkUsuario
        );

        return estudiantesAsociados; // Devolver los estudiantes filtrados
      } else {
        throw new Error("Error: No se encontraron estudiantes");
      }
    } catch (error) {
      console.error("Error al obtener los estudiantes asociados:", error);
      throw error;
    }
  }

  // Obtener todos los estudiantes y mostrarlos en consola
  async obtenerYMostrarEstudiantes() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/estudiantes/"
      );
      if (response && response.data) {
        const estudiantes = response.data;

        // Mostrar los estudiantes en la consola
        console.log("Estudiantes obtenidos:", estudiantes);
        return estudiantes; // Devolver la lista de estudiantes si se necesita
      } else {
        throw new Error("Error: No se encontraron estudiantes");
      }
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      throw error;
    }
  }
}
