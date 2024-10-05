import { RequestHandler } from "@/controlador/RequestHandler";

export class AsignaturaModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener todas las asignaturas
  async obtenerTodasAsignaturas() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/asignaturas/"
      );
      return response.data; // Devuelve el listado de asignaturas
    } catch (error) {
      console.error("Error al obtener las asignaturas:", error);
      throw error;
    }
  }

  // Obtener una asignatura por ID
  async obtenerAsignatura(id) {
    try {
      const response = await this.requestHandler.getRequest(
        `/academico/asignaturas/${id}/`
      );
      return response.data; // Devuelve los datos de la asignatura por ID
    } catch (error) {
      console.error(`Error al obtener la asignatura con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear una nueva asignatura
  async crearAsignatura(nombre, grado, colegio) {
    const data = {
      nombre: nombre,
      grado: grado,
      colegio: colegio,
    };
    try {
      const response = await this.requestHandler.postRequest(
        "/academico/asignaturas/",
        data
      );
      return response.data; // Devuelve los datos de la asignatura creada
    } catch (error) {
      console.error("Error al crear la asignatura:", error);
      throw error;
    }
  }

  // Actualizar una asignatura por ID
  async actualizarAsignatura(id, nombre, grado, colegio) {
    const data = {
      nombre: nombre,
      grado: grado,
      colegio: colegio,
    };
    try {
      const response = await this.requestHandler.putRequest(
        `/academico/asignaturas/${id}/`,
        data
      );
      return response.data; // Devuelve los datos de la asignatura actualizada
    } catch (error) {
      console.error(`Error al actualizar la asignatura con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una asignatura por ID
  async eliminarAsignatura(id) {
    try {
      const response = await this.requestHandler.deleteRequest(
        `/academico/asignaturas/${id}/`
      );
      return response.data; // Devuelve la respuesta de la eliminación
    } catch (error) {
      console.error(`Error al eliminar la asignatura con ID ${id}:`, error);
      throw error;
    }
  }
}
