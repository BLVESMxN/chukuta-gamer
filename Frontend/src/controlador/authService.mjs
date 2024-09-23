import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export class AuthService {
  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Función para realizar el login con credenciales proporcionadas
  async login(email, password) {
    try {
      // Credenciales de prueba para testing, están comentadas
      /*
      const loginPayload = {
        email: "admin@example.com",
        password: "#123#AndresHinojosa#123",
      };
      */

      // Payload dinámico, con los parámetros recibidos
      const loginPayload = {
        email: email,
        password: password,
      };

      // Realizamos la solicitud POST para obtener el token
      let res = await this.requestHandler.postRequest(
        "/user/token/",
        loginPayload
      );

      if (res && res.status === 200) {
        // Obtener el token de la cookie 'csrftoken'
        const tokenSesion = this.requestHandler.getCookie("csrftoken");

        if (tokenSesion) {
          // Si el token se obtiene correctamente, retornarlo
          console.log(
            "Login exitoso, token obtenido de la cookie:",
            tokenSesion
          );
          return tokenSesion;
        } else {
          console.error("Error: No se pudo obtener el token de la cookie.");
          return null;
        }
      } else {
        console.error("Error en el login: Respuesta inesperada del servidor.");
        return null;
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      return null;
    }
  }

  // Función para obtener el token sin necesidad de login si ya está en la cookie
  getTokenFromCookie() {
    const tokenSesion = this.requestHandler.getCookie("csrftoken");
    if (tokenSesion) {
      console.log("Token:", tokenSesion);
      return tokenSesion;
    } else {
      console.error("No se encontró el token ");
      return null;
    }
  }

  // Función para asegurarse de que tenemos un token válido (login si es necesario)
  async ensureAuthenticated(email, password) {
    // Intentar obtener el token directamente de la cookie
    let tokenSesion = this.getTokenFromCookie();

    // Si no hay token en la cookie, hacer login para obtener uno
    if (!tokenSesion) {
      console.log("No hay token en la cookie, realizando login...");
      tokenSesion = await this.login(email, password);
    }

    // Devolver el token, o null si no se pudo obtener
    return tokenSesion;
  }
}
