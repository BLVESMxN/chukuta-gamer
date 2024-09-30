import { AuthService } from "@/controlador/authService.mjs";
import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export class GradosService {
  constructor() {
    this.requestHandler = new RequestHandler();
    this.authService = new AuthService();
  }

  // Método para obtener los grados
  async obtenerGrados() {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.getRequest(
        "/academico/grados/",
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Error obteniendo los grados.");
      }
    } catch (error) {
      console.error("Error obteniendo los grados:", error);
      throw error;
    }
  }

  // Método para agregar un nuevo grado
  async agregarGrado(nombre) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const gradoData = {
        nombre: nombre,
      };

      const response = await this.requestHandler.postRequest(
        "/academico/grados/",
        gradoData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error agregando el grado.");
      }
    } catch (error) {
      console.error("Error agregando el grado:", error);
      throw error;
    }
  }

  // Método para actualizar un grado
  async actualizarGrado(id, nombre) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const gradoData = {
        nombre: nombre,
      };

      const response = await this.requestHandler.putRequest(
        `/academico/grados/${id}/`,
        gradoData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error actualizando el grado.");
      }
    } catch (error) {
      console.error("Error actualizando el grado:", error);
      throw error;
    }
  }

  // Método para eliminar un grado
  async eliminarGrado(id) {
    try {
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.deleteRequest(
        `/academico/grados/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response.status === 204) {
        return true; // Eliminación exitosa
      } else {
        throw new Error("Error eliminando el grado.");
      }
    } catch (error) {
      console.error("Error eliminando el grado:", error);
      throw error;
    }
  }
}
