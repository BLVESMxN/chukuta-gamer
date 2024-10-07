<template>
  <div id="app">
    <header id="header">
      <h1>Gestión de Usuario</h1>
    </header>

    <!-- Formulario de gestión de usuario -->
    <div class="form-container">
      <h2>Editar Datos de Usuario</h2>

      <!-- Formulario de cambio de email y nombre -->
      <div class="form-field">
        <label for="email">Email</label>
        <input v-model="usuario.email" placeholder="Email del usuario" class="input-field" />
      </div>

      <div class="form-field">
        <label for="name">Nombre</label>
        <input v-model="usuario.name" placeholder="Nombre del usuario" class="input-field" />
      </div>

      <!-- Formulario de cambio de contraseña -->
      <div class="form-field">
        <h3>Cambiar Contraseña</h3>
        <label for="password-actual">Contraseña Actual</label>
        <input v-model="contraseñaActual" type="password" placeholder="Contraseña Actual" class="input-field" />

        <label for="password-nueva">Nueva Contraseña</label>
        <input v-model="contraseñaNueva" type="password" placeholder="Nueva Contraseña" class="input-field" />

        <label for="password-confirmar">Confirmar Nueva Contraseña</label>
        <input v-model="confirmarContraseñaNueva" type="password" placeholder="Confirmar Nueva Contraseña" class="input-field" />
      </div>

      <button @click="actualizarUsuario" class="save-button">Guardar Cambios</button>

      <!-- Mostrar mensajes de éxito o error -->
      <div v-if="mensaje" :class="{'mensaje-error': esError, 'mensaje-exito': !esError}">
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script>
import UserModel from "@/modelo/usuario/UserModel.mjs"; // Importa el UserModel

export default {
  data() {
    return {
      usuario: {
        email: "",
        name: "",
      },
      contraseñaActual: "",
      contraseñaNueva: "",
      confirmarContraseñaNueva: "",
      mensaje: "", // Para mostrar mensajes de éxito o error
      esError: false, // Controla si el mensaje es de error o éxito
    };
  },
  async mounted() {
    // Cargar los datos del usuario logueado al montar el componente
    await this.cargarUsuario();
  },
  methods: {
    // Método para cargar los datos del usuario
    async cargarUsuario() {
      try {
        const userModel = new UserModel();
        const usuarioData = await userModel.obtenerUsuario();
        this.usuario.email = usuarioData.email;
        this.usuario.name = usuarioData.name;
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        this.mensaje = "Error al cargar los datos del usuario.";
        this.esError = true;
      }
    },

    // Método para actualizar los datos del usuario
    async actualizarUsuario() {
      if (this.contraseñaNueva !== this.confirmarContraseñaNueva) {
        this.mensaje = "La nueva contraseña no coincide con la confirmación.";
        this.esError = true;
        return;
      }

      try {
        const userModel = new UserModel();
        // Solo actualizamos la contraseña si el usuario ha ingresado la contraseña actual y una nueva
        if (this.contraseñaActual && this.contraseñaNueva) {
          await userModel.actualizarUsuarioConContraseña(
            this.usuario.email,
            this.usuario.name,
            this.contraseñaActual,
            this.contraseñaNueva
          );
        } else {
          await userModel.actualizarUsuario(this.usuario.email, this.usuario.name);
        }

        this.mensaje = "¡Datos de usuario actualizados exitosamente!";
        this.esError = false;
      } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
        this.mensaje = "Error al actualizar los datos del usuario.";
        this.esError = true;
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}

#header {
  background-color: #004d40;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-field {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.save-button {
  width: 100%;
  padding: 12px;
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mensaje-exito {
  margin-top: 20px;
  color: green;
  font-size: 18px;
}

.mensaje-error {
  margin-top: 20px;
  color: red;
  font-size: 18px;
}
</style>
