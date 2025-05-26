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

  // Actualizar los datos del usuario sin cambiar la contraseña
  async actualizarUsuario(email, name) {
    const data = {
      email: email,
      name: name,
    };
    try {
      const response = await this.requestHandler.patchRequest("/user/me/", data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      throw error;
    }
  }

  // Actualizar los datos del usuario y cambiar la contraseña
  async actualizarUsuarioConContraseña(email, name, contraseñaActual, contraseñaNueva) {
    const data = {
      email: email,
      name: name,
      password: contraseñaNueva, // Enviar la nueva contraseña
      old_password: contraseñaActual, // Verificar la contraseña actual
    };
    try {
      const response = await this.requestHandler.patchRequest("/user/me/", data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar los datos del usuario o la contraseña:", error);
      throw error;
    }
  }
}
