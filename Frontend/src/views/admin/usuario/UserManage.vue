<template>
    <div id="app">
      <header id="header">
        <h1>Gestión de Usuario</h1>
      </header>
  
      <!-- Formulario de gestión de usuario -->
      <div class="form-container">
        <h2>Editar Datos de Usuario</h2>
  
        <div class="form-field">
          <label for="email">Email</label>
          <input v-model="usuario.email" placeholder="Email del usuario" class="input-field" />
        </div>
  
        <div class="form-field">
          <label for="name">Nombre</label>
          <input v-model="usuario.name" placeholder="Nombre del usuario" class="input-field" />
        </div>
  
        <div class="form-field">
          <label for="password">Nueva Contraseña</label>
          <input v-model="usuario.password" type="password" placeholder="Contraseña" class="input-field" />
        </div>
  
        <button @click="actualizarUsuario" class="save-button">Guardar Cambios</button>
  
        <!-- Mostrar mensajes de éxito o error -->
        <div v-if="mensaje" class="mensaje">
          {{ mensaje }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserModel from "@/modelo/usuario/UserModel.mjs";
  
  export default {
    data() {
      return {
        usuario: {
          email: "",
          password: "",
          name: ""
        },
        mensaje: "", // Para mostrar mensajes de éxito o error
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
          // Nota: La contraseña no se muestra por razones de seguridad
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
          this.mensaje = "Error al cargar los datos del usuario.";
        }
      },
  
      // Método para actualizar los datos del usuario
      async actualizarUsuario() {
        try {
          const userModel = new UserModel();
          await userModel.actualizarUsuario(
            this.usuario.email,
            this.usuario.password,
            this.usuario.name
          );
          this.mensaje = "¡Datos de usuario actualizados exitosamente!";
        } catch (error) {
          console.error("Error al actualizar los datos del usuario:", error);
          this.mensaje = "Error al actualizar los datos del usuario.";
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
  
  .mensaje {
    margin-top: 20px;
    color: green;
    font-size: 18px;
  }
  </style>
  