<template>
  <div class="app-container">
    <header id="header">
      <h1>Listado de Grados</h1>
    </header>

    <!-- Sección para mostrar tarjetas de grados -->
    <div class="cards-container">
      <div v-for="grado in grados" :key="grado.id" class="card">
        <!-- Botones de editar y eliminar -->
        <div class="card-actions">
          <button @click="editarGrado(grado.id)" class="edit-button">📝</button>
          <button @click="eliminarGrado(grado.id)" class="delete-button">
            ❌
          </button>
        </div>

        <!-- Contenido de la tarjeta -->
        <h2>{{ grado.nombre }}</h2>
        <p><strong>ID del Grado:</strong> {{ grado.id }}</p>
      </div>

      <!-- Tarjeta para agregar un nuevo grado -->
      <div class="card agregar-grado-card" @click="irAgregarGrado">
        <div class="add-icon">➕</div>
        <h2>Agregar Grado</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { GradosModel } from "@/modelo/GradosModel"; // Asegúrate de importar el modelo de Grados
import { RequestHandler } from "@/controlador/RequestHandler"; // Para el login forzado

export default {
  data() {
    return {
      grados: [], // Aquí se almacenarán los grados obtenidos
      usuarioLogueado: null, // Almacenamos los datos del usuario logueado
    };
  },
  async mounted() {
    // Realizar login forzado
    const ojo = new RequestHandler();
    const loginResponse = await ojo.postRequest("user/token/", {
      email: "ojo@amdin.com",
      password: "123",
    });
    this.usuarioLogueado = loginResponse.data;

    // Cargar los grados una vez que se ha realizado el login
    await this.cargarGrados();
  },
  methods: {
    // Cargar todos los grados desde el servidor
    async cargarGrados() {
      try {
        const gradosModel = new GradosModel();
        this.grados = await gradosModel.obtenerTodosGrados();
      } catch (error) {
        console.error("Error al cargar los grados:", error);
      }
    },

    // Editar un grado por ID
    editarGrado(id) {
      this.$router.push({ name: "EditarGrado", params: { id: id } });
    },

    // Eliminar un grado por ID
    async eliminarGrado(id) {
      const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este grado?"
      );
      if (confirmar) {
        try {
          const gradosModel = new GradosModel();
          await gradosModel.eliminarGrado(id);
          await this.cargarGrados(); // Recargar la lista de grados tras eliminar uno
        } catch (error) {
          console.error("Error al eliminar el grado:", error);
        }
      }
    },

    // Redirigir al formulario para agregar un nuevo grado
    irAgregarGrado() {
      this.$router.push({ name: "AgregarGrado" });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f4f7f6;
  min-height: 100vh;
}

#header {
  background-color: #0073e6;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
  position: relative;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.agregar-grado-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  color: #0073e6;
  cursor: pointer;
}

.add-icon {
  font-size: 50px;
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.edit-button {
  color: #0073e6;
}

.delete-button {
  color: #ff4d4d;
}
</style>
