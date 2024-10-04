import { RequestHandler } from "@/controlador/RequestHandler.mjs"; // Asegúrate de importar el manejador de solicitudes

export class ColegioModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Crear un nuevo colegio (POST)
  async crearColegio(nombre, admin, suscripcion, extension) {
    const data = {
      nombre: nombre,
      admin: admin,
      suscripcion: suscripcion,
      extension: extension,
    };
    try {
      const response = await this.requestHandler.postRequest(
        "/academico/colegios/",
        data
      );
      console.log("Colegio creado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al crear colegio:", error);
    }
  }

  // Obtener un colegio por ID (GET)
  async obtenerColegio(id) {
    try {
      const response = await this.requestHandler.getRequest(
        `/academico/colegios/${id}/`
      );
      console.log("Datos del colegio:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener colegio:", error);
    }
  }

  // Actualizar un colegio por ID (PUT)
  async actualizarColegio(id, nombre, admin, suscripcion, extension) {
    const data = {
      nombre: nombre,
      admin: admin,
      suscripcion: suscripcion,
      extension: extension,
    };
    try {
      const response = await this.requestHandler.putRequest(
        `/academico/colegios/${id}/`,
        data
      );
      console.log("Colegio actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar colegio:", error);
    }
  }

  // Eliminar un colegio por ID (DELETE)
  async eliminarColegio(id) {
    try {
      const response = await this.requestHandler.deleteRequest(
        `/academico/colegios/${id}/`
      );
      console.log("Colegio eliminado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar colegio:", error);
    }
  }

  async getAllColegios() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/colegios/"
      );
      return response.data; // Suponiendo que la respuesta tiene un campo data que contiene todos los colegios
    } catch (error) {
      console.error("Error al obtener los colegios:", error);
      throw error;
    }
  }

  // Modificar parcialmente un colegio por ID (PATCH)
  async modificarColegio(id, dataParcial) {
    try {
      const response = await this.requestHandler.postRequest(
        `/academico/colegios/${id}/`,
        dataParcial
      );
      console.log("Colegio modificado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al modificar colegio:", error);
    }
  }
}
