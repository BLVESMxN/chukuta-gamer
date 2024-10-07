import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class ModeloEstadisticas {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  async obtenerAnios() {
    try {
      const response = await this.requestHandler.getRequest("/academico/periodos/");
      const aniosUnicos = [...new Set(response.data.map(periodo => periodo.anio))];
      console.log("Años obtenidos:", aniosUnicos);  // Debug
      return aniosUnicos;
    } catch (error) {
      console.error("Error al obtener los años:", error);
      throw error;
    }
  }

  async obtenerColegios() {
    try {
      const response = await this.requestHandler.getRequest("/academico/colegios/");
      console.log("Colegios obtenidos:", response.data);  // Debug
      return response.data;
    } catch (error) {
      console.error("Error al obtener colegios:", error);
      throw error;
    }
  }

  async obtenerAsignaturasPorAnioYColegio(anio, colegioId) {
    try {
      const params = {};
      if (anio) params.anio = anio;
      if (colegioId) params.colegio = colegioId;
      
      const response = await this.requestHandler.getRequest("/academico/asignaturas/", params);
      console.log(`Asignaturas obtenidas para año ${anio} y colegio ${colegioId}:`, response.data);  // Debug
      return response.data;
    } catch (error) {
      console.error("Error al obtener asignaturas:", error);
      throw error;
    }
  }

  async obtenerCursosPorAnioYColegio(anio, colegioId) {
    try {
      const params = {};
      if (anio) params.anio = anio;
      if (colegioId) params.colegio = colegioId;
      
      const response = await this.requestHandler.getRequest("/academico/cursos/", params);
      console.log(`Cursos obtenidos para año ${anio} y colegio ${colegioId}:`, response.data);  // Debug
      return response.data;
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      throw error;
    }
  }
}
