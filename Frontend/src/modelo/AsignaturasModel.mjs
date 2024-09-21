import { AuthService } from "@/controlador/authService.mjs"; // Importamos el AuthService
import { RequestHandler } from "@/controlador/RequestHandler.mjs"; // Importamos el RequestHandler para las peticiones

export class AsignaturasService {
  constructor() {
    this.requestHandler = new RequestHandler();
    this.authService = new AuthService();
  }

  // Método para obtener las asignaturas
  async obtenerAsignaturas() {
    try {
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "user@example.com", // Email de ejemplo, reemplazar por valores reales
        "passwordSeguro123" // Contraseña de ejemplo
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      // Hacemos una solicitud GET con el token en la cabecera
      const response = await this.requestHandler.getRequest(
        "/academico/asignaturas/",
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`, // Incluimos el token en las cabeceras
          },
        }
      );

      if (response && response.data) {
        return response.data; // Retornamos la lista de asignaturas
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
      // Asegurarnos de que tenemos un token válido
      const tokenSesion = await this.authService.ensureAuthenticated(
        "user@example.com", // Email de ejemplo, reemplazar por valores reales
        "passwordSeguro123" // Contraseña de ejemplo
      );

      if (!tokenSesion) {
        throw new Error("No se pudo autenticar al usuario.");
      }

      // Datos de la nueva asignatura
      const asignaturaData = {
        nombre: nombre,
        grado: grado,
      };

      // Hacemos una solicitud POST con el token en la cabecera
      const response = await this.requestHandler.postRequest(
        "/academico/asignaturas/",
        asignaturaData,
        {
          headers: {
            Authorization: `Bearer ${tokenSesion}`, // Incluimos el token en las cabeceras
          },
        }
      );

      if (response.status === 201) {
        return response.data; // Retornamos los datos de la asignatura creada
      } else {
        throw new Error("Error agregando la asignatura.");
      }
    } catch (error) {
      console.error("Error agregando la asignatura:", error);
      throw error;
    }
  }
}
