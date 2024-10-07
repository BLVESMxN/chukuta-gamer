import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class EstudiantesModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener todos los estudiantes
  async obtenerEstudiantes() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/estudiantes/"
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      throw error;
    }
  }

  // Crear un nuevo estudiante
  async crearEstudiante(estudiante) {
    try {
      const response = await this.requestHandler.postRequest(
        "/academico/estudiantes/",
        estudiante
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
      throw error;
    }
  }

  // Actualizar un estudiante
  async actualizarEstudiante(id, estudiante) {
    try {
      const response = await this.requestHandler.putRequest(
        `/academico/estudiantes/${id}/`,
        estudiante
      );
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el estudiante con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un estudiante
  async eliminarEstudiante(id) {
    try {
      const response = await this.requestHandler.deleteRequest(
        `/academico/estudiantes/${id}/`
      );
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el estudiante con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener todos los colegios
  async obtenerColegios() {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/colegios/"
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los colegios:", error);
      throw error;
    }
  }

  // Obtener grados del colegio
  async obtenerGradosPorColegio(colegioId) {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/grados/",
        { colegio: colegioId }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error al obtener los grados del colegio con ID ${colegioId}:`,
        error
      );
      throw error;
    }
  }

  // Obtener el ID del padre mediante su correo electrónico y colegio
  async obtenerPadrePorCorreo(email, colegioId) {
    try {
      const response = await this.requestHandler.getRequest(
        "/academico/padres/",
        { email, colegio: colegioId } // Filtrar por correo y colegio
      );

      const padre = response.data.find(
        (p) => p.email === email && p.colegio === colegioId
      );
      if (!padre) {
        console.error(
          `No se encontró ningún padre con el correo ${email} y el colegio con ID ${colegioId}`
        );
        return null;
      }
      return padre; // Retornar el padre correcto si se encuentra
    } catch (error) {
      console.error(`Error al obtener el padre por correo ${email}:`, error);
      throw error;
    }
  }

  // Verificar si un grado pertenece al colegio
  async verificarGradoPorColegio(colegioId, gradoId) {
    try {
      const grados = await this.obtenerGradosPorColegio(colegioId);
      return grados.some((grado) => grado.id === gradoId);
    } catch (error) {
      console.error("Error al verificar el grado:", error);
      throw error;
    }
  }
}
