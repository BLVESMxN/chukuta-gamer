import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default class UserModel {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Obtener los datos del usuario actual
  async obtenerUsuario() {
    try {
      const response = await this.requestHandler.getRequest("/user/me/");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      throw error;
    }
  }

  // Actualizar los datos del usuario
  async actualizarUsuario(email, password, name) {
    const data = {
      email: email,
      password: password,
      name: name,
    };
    try {
      const response = await this.requestHandler.putRequest("/user/manage/", data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      throw error;
    }
  }
}
