import { RequestHandler } from "./RequestHandler.mjs";

export default {
  async login(username, password) {
    const handler = new RequestHandler();

    // Imprimir los datos enviados al hacer login
    console.log("Datos enviados para login:");
    console.log({
      email: username,
      password: password, // Puedes ocultar este valor en producción por razones de seguridad
    });

    try {
      const loginResponse = await handler.postRequest("/user/token/", {
        email: username,
        password: password,
      });

      if (loginResponse && loginResponse.status === 200) {
        // Obtener el rol del usuario
        const userResponse = await handler.getRequest("/user/me/");
        if (userResponse && userResponse.status === 200) {
          const userData = userResponse.data;
          const userRole = userData.role_field;

          // Imprimir los datos del usuario obtenidos
          console.log("Datos del usuario logueado:");
          console.log(userData);

          // Almacenar el rol en el localStorage para acceder en el futuro
          localStorage.setItem("userRole", userRole);

          if (userRole === "Administrador") {
            return { role: "Administrador", route: "/grados-admin" };
          } else if (userRole === "Docente") {
            return { role: "docente", route: "/inicio-docente" };
          } else if (userRole === "Padre") {
            return { role: "Padre", route: "/MenuPadres" };
          } else {
            return { role: "estudiante", route: "/inicio-estudiante" };
          }
        } else {
          return {
            role: "guest",
            route: null,
            error: "Error al obtener los datos del usuario",
          };
        }
      } else {
        return {
          role: "guest",
          route: null,
          error: "Credenciales incorrectas",
        };
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      return { role: "guest", route: null, error: "Error en el servidor" };
    }
  },

  logout() {
    localStorage.removeItem("userRole"); // Eliminar el rol del usuario en el logout
    return { role: "guest", route: "/" };
  },

  getUserRole() {
    return { role: localStorage.getItem("userRole") || "guest" };
  },
};
