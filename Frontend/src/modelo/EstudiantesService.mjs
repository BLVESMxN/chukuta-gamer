import { AuthService } from "@/controlador/authService.mjs";
import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export class EstudiantesService {
  constructor() {
    this.requestHandler = new RequestHandler();
    this.authService = new AuthService();
  }

  // Método para obtener todos los estudiantes
  async obtenerEstudiantes() {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.getRequest("/user/list/", {
        headers: {
          Authorization: `Bearer ${tokenSesion}`,
        },
      });

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Error obteniendo los estudiantes.");
      }
    } catch (error) {
      console.error("Error obteniendo los estudiantes:", error);
      throw error;
    }
  }

  // Método para agregar un nuevo estudiante
  async agregarEstudiante(name, email, password, is_active) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const estudianteData = {
        name: name,
        email: email,
        password: password,
        is_active: is_active,
      };

      const response = await this.requestHandler.postRequest(
        "/user/create/",
        estudianteData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error agregando el estudiante.");
      }
    } catch (error) {
      console.error("Error agregando el estudiante:", error);
      throw error;
    }
  }

  // Método para eliminar un estudiante
  async eliminarEstudiante(id) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.deleteRequest(
        `/user/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 204) {
        return true; // Eliminación exitosa
      } else {
        throw new Error("Error eliminando el estudiante.");
      }
    } catch (error) {
      console.error("Error eliminando el estudiante:", error);
      throw error;
    }
  }
}
