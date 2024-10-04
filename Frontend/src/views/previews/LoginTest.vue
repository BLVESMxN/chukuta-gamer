<template>
  <div>
    <h1>Login Real con Token desde Cookie</h1>
  </div>
</template>

<script>
import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      requestHandler: new RequestHandler(),
    };
  },
  async created() {
    try {
      // Paso 1: Login con credenciales reales (datos de la base de datos)
      const loginPayload = {
        email: "admin@example.com",
        password: "admin",
      };

      // Realizamos una solicitud POST al endpoint de token
      let res = await this.requestHandler.postRequest(
        "/user/token/",
        loginPayload
      );

      if (res && res.status === 200) {
        // Paso 2: El token está en la cookie `csrftoken`, vamos a obtenerlo
        const tokenSesion = this.requestHandler.getCookie("csrftoken");

        if (tokenSesion) {
          // Imprimir el token de la sesión
          console.log(
            "Login exitoso, token obtenido de la cookie:",
            tokenSesion
          );

          // Paso 3: Usar el token en futuras solicitudes (ejemplo con estudiantes)
          this.verificarLogin(tokenSesion);
        } else {
          console.error("Error: No se pudo obtener el token de la cookie.");
        }
      } else {
        console.error("Error en el login: Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
    }
  },
  methods: {
    async verificarLogin(tokenSesion) {
      try {
        // Incluimos el token en el encabezado de la solicitud GET
        const res = await this.requestHandler.getRequest(
          "/academico/estudiantes/",
          {
            headers: {
              Authorization: `Bearer ${tokenSesion}`,
            },
          }
        );

        if (res && res.data) {
          console.log("Usuario logueado, acceso a estudiantes permitido.");
        } else {
          console.error("No se pudo obtener la información de estudiantes.");
        }
      } catch (error) {
        console.error("Error verificando el login:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
