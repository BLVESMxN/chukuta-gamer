<template>
    <div>
      <header id="header">
        <h1>GESTIÓN DE ADMINISTRADORES</h1>
      </header>
  
      <!-- Formulario para agregar nuevo administrador -->
      <div class="form-container">
        <h2>Agregar Administrador</h2>
        <label for="nombre">Nombre</label>
        <input v-model="nuevoAdmin.name" class="input-field" type="text" placeholder="Nombre del Administrador" />
  
        <label for="email">Correo Electrónico</label>
        <input v-model="nuevoAdmin.email" class="input-field" type="email" placeholder="Correo Electrónico" />
  
        <label for="password">Contraseña</label>
        <input v-model="nuevoAdmin.password" class="input-field" type="password" placeholder="Contraseña" />
  
        <button @click="agregarAdmin" class="add-button">
          Agregar Administrador
        </button>
      </div>
  
      <!-- Sección para mostrar la lista de usuarios -->
      <div class="usuarios-container">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>PK</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Estado</th>
              <th>Role Field</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.pk">
              <td>{{ usuario.pk }}</td>  
              <td>{{ usuario.name }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.is_active ? 'Activo' : 'Inactivo' }}</td>
              <td>{{ usuario.role_field }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import AdministrativoModel from "@/modelo/AdministrativoModel.mjs";
  
  export default {
    data() {
      return {
        administrativoModel: new AdministrativoModel(), // Crear una instancia del modelo
        nuevoAdmin: {
          name: "", // Nombre del administrador
          email: "", // Correo electrónico del administrador
          password: "", // Contraseña del administrador
        },
        usuarios: [], // Lista de usuarios
      };
    },
    methods: {
      // Método para agregar un nuevo administrador utilizando el modelo
      async agregarAdmin() {
        try {
          await this.administrativoModel.agregarAdmin(this.nuevoAdmin);
          alert("¡Administrador agregado exitosamente!");
          this.limpiarFormularioAdmin(); // Limpiar el formulario después de agregar
          await this.obtenerUsuarios(); // Actualizar la lista de usuarios
        } catch (error) {
          console.error("Error:", error);
          alert(error.message); // Muestra el mensaje de error
        }
      },
  
      // Método para obtener la lista de usuarios
      async obtenerUsuarios() {
        try {
          this.usuarios = await this.administrativoModel.obtenerUsuarios();
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
        }
      },
  
      // Método para limpiar el formulario después de agregar un administrador
      limpiarFormularioAdmin() {
        this.nuevoAdmin = {
          name: "",
          email: "",
          password: "",
        };
      },
    },
    // Llamar a obtenerUsuarios al montar el componente
    mounted() {
      this.obtenerUsuarios();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  #header {
    background-color: #004d40;
    color: white;
    padding: 15px;
    text-align: center;
  }
  
  h2 {
    text-align: center;
    color: #004d40;
  }
  
  .form-container {
    margin: 20px auto;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .input-field {
    margin-bottom: 15px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
  
  .add-button {
    background-color: #004d40;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .add-button:hover {
    background-color: #00332c;
  }
  
  .usuarios-container {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    padding: 12px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #333;
    color: white;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  