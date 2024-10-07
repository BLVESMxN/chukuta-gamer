import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class PadresModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener todos los padres
  async obtenerPadres() {
    try {
      const response = await this.requestHandler.getRequest("/academico/padres/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los padres:", error);
      throw error;
    }
  }

  // Crear un nuevo padre
  async crearPadre(name, colegio) {
    const data = {
      name: name,
      colegio: colegio,
    };
    try {
      const response = await this.requestHandler.postRequest("/academico/padres/", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear el padre:", error);
      throw error;
    }
  }

  // Obtener un padre por ID
  async obtenerPadrePorId(id) {
    try {
      const response = await this.requestHandler.getRequest(`/academico/padres/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el padre con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar un padre
  async actualizarPadre(id, name, colegio) {
    const data = {
      name: name,
      colegio: colegio,
    };
    try {
      const response = await this.requestHandler.putRequest(`/academico/padres/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el padre con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un padre
  async eliminarPadre(id) {
    try {
      const response = await this.requestHandler.deleteRequest(`/academico/padres/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el padre con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener todos los colegios
  async obtenerColegios() {
    try {
      const response = await this.requestHandler.getRequest("/academico/colegios/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los colegios:", error);
      throw error;
    }
  }
}
