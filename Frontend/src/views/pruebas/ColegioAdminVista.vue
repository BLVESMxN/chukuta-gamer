<template>
  <div class="app-container">
    <header id="header">
      <h1>Listado de Colegios</h1>
    </header>

    <!-- Sección para mostrar tarjetas de colegios -->
    <div class="cards-container">
      <div v-for="colegio in colegios" :key="colegio.id" class="card">
        <!-- Botones de editar y eliminar -->
        <div class="card-actions">
          <button @click="editarColegio(colegio.id)" class="edit-button">
            📝
          </button>
          <button @click="eliminarColegio(colegio.id)" class="delete-button">
            ❌
          </button>
        </div>

        <!-- Contenido de la tarjeta -->
        <h2>{{ colegio.nombre }}</h2>
        <p><strong>ID del Colegio:</strong> {{ colegio.id }}</p>
        <p><strong>Administrador:</strong> {{ colegio.admin }}</p>
        <p>
          <strong>Suscripción:</strong>
          {{ colegio.suscripcion ? "Activa" : "Inactiva" }}
        </p>
        <p><strong>Extensión:</strong> {{ colegio.extension }}</p>
      </div>

      <!-- Tarjeta para agregar un nuevo colegio -->
      <div class="card agregar-colegio-card" @click="irAgregarColegio">
        <div class="add-icon">➕</div>
        <h2>Agregar Colegio</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ColegioModel } from "@/modelo/ColegioModel";
import { RequestHandler } from "@/controlador/RequestHandler";

export default {
  data() {
    return {
      colegios: [],
      usuarioLogueado: null,
    };
  },
  async mounted() {
    const ojo = new RequestHandler();
    const loginResponse = await ojo.postRequest("user/token/", {
      email: "ojo@amdin.com",
      password: "123",
    });
    this.usuarioLogueado = loginResponse.data;

    await this.cargarColegios();
  },
  methods: {
    async cargarColegios() {
      try {
        const colegioModel = new ColegioModel();
        this.colegios = await colegioModel.getAllColegios();
      } catch (error) {
        console.error("Error al cargar colegios:", error);
      }
    },
    editarColegio(id) {
      this.$router.push({ name: "EditarColegio", params: { id: id } });
    },
    async eliminarColegio(id) {
      const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este colegio?"
      );
      if (confirmar) {
        try {
          const colegioModel = new ColegioModel();
          await colegioModel.eliminarColegio(id);
          await this.cargarColegios();
        } catch (error) {
          console.error("Error al eliminar el colegio:", error);
        }
      }
    },
    // Redirigir al formulario de agregar colegio
    irAgregarColegio() {
      this.$router.push({ name: "ColegioAdmin" });
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
  min-height: 45vh;
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

.agregar-colegio-card {
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
