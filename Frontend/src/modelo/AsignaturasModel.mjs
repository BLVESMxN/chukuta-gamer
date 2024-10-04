import { AuthService } from "@/controlador/authService.mjs";
import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export class AsignaturasService {
  constructor() {
    this.requestHandler = new RequestHandler();
    this.authService = new AuthService();
  }

  // Método para obtener las asignaturas
  async obtenerAsignaturas() {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.getRequest(
        "/academico/asignaturas/",
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Error obteniendo las asignaturas.");
      }
    } catch (error) {
      console.error("Error obteniendo las asignaturas:", error);
      throw error;
    }
  }

  // Método para agregar una nueva asignatura
  async agregarAsignatura(nombre, grado) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const asignaturaData = {
        nombre: nombre,
        grado: grado,
      };

      const response = await this.requestHandler.postRequest(
        "/academico/asignaturas/",
        asignaturaData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error agregando la asignatura.");
      }
    } catch (error) {
      console.error("Error agregando la asignatura:", error);
      throw error;
    }
  }

  // Método para actualizar una asignatura
  async actualizarAsignatura(id, nombre, grado) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const asignaturaData = {
        nombre: nombre,
        grado: grado,
      };

      const response = await this.requestHandler.putRequest(
        `/academico/asignaturas/${id}/`,
        asignaturaData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error actualizando la asignatura.");
      }
    } catch (error) {
      console.error("Error actualizando la asignatura:", error);
      throw error;
    }
  }

  // Método para eliminar una asignatura
  async eliminarAsignatura(id) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "admin"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.deleteRequest(
        `/academico/asignaturas/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 204) {
        return true; // Eliminación exitosa
      } else {
        throw new Error("Error eliminando la asignatura.");
      }
    } catch (error) {
      console.error("Error eliminando la asignatura:", error);
      throw error;
    }
  }
}
