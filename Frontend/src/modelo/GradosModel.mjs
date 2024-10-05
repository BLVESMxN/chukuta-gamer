import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export class GradosModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener todos los grados (GET /academico/grados/)
  async obtenerTodosGrados() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/grados/"
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los grados:", error);
      throw error;
    }
  }

  // Obtener un grado por ID (GET /academico/grados/{id}/)
  async obtenerGrado(id) {
    try {
      const response = await this.requestHandler.getRequest(
        `/academico/grados/${id}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el grado:", error);
      throw error;
    }
  }

  // Crear un nuevo grado (POST /academico/grados/)
  async crearGrado(nombre) {
    const data = {
      nombre: nombre,
    };
    try {
      const response = await this.requestHandler.postRequest(
        "/academico/grados/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear el grado:", error);
      throw error;
    }
  }

  // Actualizar un grado por ID (PUT /academico/grados/{id}/)
  async actualizarGrado(id, nombre) {
    const data = {
      nombre: nombre,
    };
    try {
      const response = await this.requestHandler.putRequest(
        `/academico/grados/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el grado:", error);
      throw error;
    }
  }

  // Eliminar un grado por ID (DELETE /academico/grados/{id}/)
  async eliminarGrado(id) {
    try {
      const response = await this.requestHandler.deleteRequest(
        `/academico/grados/${id}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el grado:", error);
      throw error;
    }
  }
}
