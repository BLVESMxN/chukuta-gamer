import { RequestHandler } from "./RequestHandler.mjs";

export default {
  async login(username, password) {
    var handler = new RequestHandler();

    return handler
      .postRequest(
        "/user/token/",
        {
          email: username,
          password: password,
        },
        {}
      )
      .then(async (res) => {
        if (res && res.status === 200) {
          const userDetails = await handler.getRequest("/user/me/"); // Obtener los detalles del usuario logueado

          if (userDetails && userDetails.data && userDetails.data.role) {
            const role = userDetails.data.role;

            // Redireccionar según el rol
            if (role === "admin") {
              return { role: "admin", route: "/grados-admin" };
            } else if (role === "estudiante") {
              return { role: "estudiante", route: "/inicio-estudiante" };
            } else if (role === "docente") {
              return { role: "docente", route: "/inicio-docente" };
            } else {
              return { role: "guest", route: "/", error: "Rol desconocido" };
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
      })
      .catch((error) => {
        console.error("Error during login:", error);
        return { role: "guest", route: null, error: "Error en el servidor" };
      });
  },

  logout() {
    return { role: "guest", route: "/" };
  },
};
