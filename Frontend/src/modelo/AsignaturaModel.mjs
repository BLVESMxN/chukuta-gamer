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
      return response.data;
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
      return response.data;
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
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la asignatura con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener todos los colegios
  async obtenerColegios() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/colegios/"
      );
      return response.data; // Lista de colegios
    } catch (error) {
      console.error("Error al obtener los colegios:", error);
      throw error;
    }
  }

  async obtenerColegioPorId(id) {
    try {
      const response = await this.requestHandler.getRequest(
        `/academico/colegios/${id}/`
      );
      return response.data; // Devuelve los datos del colegio
    } catch (error) {
      console.error(`Error al obtener el colegio con ID ${id}:`, error);
      throw error;
    }
  }

  async obtenerGradoPorId(id) {
    try {
      const response = await this.requestHandler.getRequest(
        `/academico/grados/${id}/`
      );
      return response.data; // Devuelve los datos del grado
    } catch (error) {
      console.error(`Error al obtener el grado con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener todos los grados
  async obtenerGrados() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/grados/"
      );
      return response.data; // Lista de grados
    } catch (error) {
      console.error("Error al obtener los grados:", error);
      throw error;
    }
  }
}
