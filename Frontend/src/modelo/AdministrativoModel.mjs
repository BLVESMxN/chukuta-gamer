import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class AdministrativoModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Método para agregar un nuevo administrador
  async agregarAdmin(nuevoAdmin) {
    // Validaciones de entrada
    if (!nuevoAdmin.name || !nuevoAdmin.email || !nuevoAdmin.password) {
      throw new Error("Por favor, completa todos los campos.");
    }

    try {
      const response = await this.requestHandler.postRequest(
        "/academico/administrativo/",
        nuevoAdmin
      );

      if (response.status === 201) {
        return response; // Se devuelve la respuesta si se agrega correctamente
      } else {
        throw new Error("Hubo un error al agregar el administrador. Verifica los datos.");
      }
    } catch (error) {
      console.error("Error al agregar el administrador:", error);
      throw new Error("Hubo un error al agregar el administrador. Verifica los datos.");
    }
  }

  // Método para obtener la lista de usuarios
  async obtenerUsuarios() {
    try {
      const response = await this.requestHandler.getRequest("/user/list/");
      return response.data; // Devuelve la lista de usuarios
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  }
}
