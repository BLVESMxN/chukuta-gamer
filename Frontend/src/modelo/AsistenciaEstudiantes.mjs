import { AuthService } from "@/controlador/authService.mjs"; // Importamos el AuthService
import { RequestHandler } from "@/controlador/RequestHandler.mjs"; // Importamos el RequestHandler para las peticiones

export class AsistenciasEstudiantesService {
  constructor() {
    this.requestHandler = new RequestHandler();
    this.authService = new AuthService();
  }

  // Método para obtener las asistencias
  async obtenerAsistencias() {
    try {
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      const response = await this.requestHandler.getRequest(
        "/academico/asistencias/",
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`,
          },
        }
      );

      if (response && response.data) {
        return response.data; // Retornamos la lista de asistencias
      } else {
        throw new Error("Error obteniendo las asistencias.");
      }
    } catch (error) {
      console.error("Error obteniendo las asistencias:", error);
      throw error;
    }
  }

  async agregarAsistencia(estudianteId, asignaturaId, fecha, estado) {
    try {
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      // Datos de la nueva asistencia
      const asistenciaData = {
        estudiante_id: estudianteId,
        asignatura_id: asignaturaId,
        fecha: fecha,
        estado: estado, // Estado: "Presente", "Ausente" o "Permiso"
      };

      // Realizamos la solicitud POST con el token en la cabecera
      const response = await this.requestHandler.postRequest(
        "/academico/asistencias/",
        asistenciaData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`, // Incluimos el token en las cabeceras
          },
        }
      );

      if (response.status === 201) {
        return response.data; // Retornamos los datos de la asistencia creada
      } else {
        throw new Error("Error agregando la asistencia.");
      }
    } catch (error) {
      console.error("Error agregando la asistencia:", error);
      throw error;
    }
  }

  // Método para actualizar una asistencia existente
  async actualizarAsistencia(asistenciaId, estado) {
    try {
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "admin@example.com",
        "#123#AndresHinojosa#123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      // Datos actualizados de la asistencia
      const asistenciaData = {
        estado: estado, // "Presente", "Ausente", "Permiso"
      };

      // Realizamos la solicitud PUT para actualizar la asistencia
      const response = await this.requestHandler.putRequest(
        `/academico/asistencias/${asistenciaId}`,
        asistenciaData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`, // Incluimos el token en las cabeceras
          },
        }
      );

      if (response.status === 200) {
        return response.data; // Retornamos los datos actualizados
      } else {
        throw new Error("Error actualizando la asistencia.");
      }
    } catch (error) {
      console.error("Error actualizando la asistencia:", error);
      throw error;
    }
  }

  // Método para eliminar una asistencia
  async eliminarAsistencia(asistenciaId) {
    try {
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "user@example.com",
        "passwordSeguro123"
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      // Realizamos la solicitud DELETE para eliminar la asistencia
      const response = await this.requestHandler.deleteRequest(
        `/academico/asistencias/${asistenciaId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`, // Incluimos el token en las cabeceras
          },
        }
      );

      if (response.status === 200) {
        return { message: "Asistencia eliminada exitosamente" };
      } else {
        throw new Error("Error eliminando la asistencia.");
      }
    } catch (error) {
      console.error("Error eliminando la asistencia:", error);
      throw error;
    }
  }
}
