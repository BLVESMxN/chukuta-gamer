<template>
  <div class="app-container">
    <header id="header">
      <h1>Editar Asignatura</h1>
    </header>

    <!-- Formulario para editar la asignatura -->
    <div class="form-container" v-if="asignatura">
      <div class="input-group">
        <label for="nombre">Nombre de la Asignatura</label>
        <input
          v-model="asignatura.nombre"
          id="nombre"
          placeholder="Nombre de la Asignatura"
          class="input-field"
        />
      </div>

      <div class="input-group">
        <label for="colegio">Seleccionar Colegio</label>
        <select v-model="asignatura.colegio" class="input-field">
          <option
            v-for="colegio in colegios"
            :key="colegio.id"
            :value="colegio.id"
          >
            {{ colegio.nombre }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label for="grado">Seleccionar Grado</label>
        <select v-model="asignatura.grado" class="input-field">
          <option v-for="grado in grados" :key="grado.id" :value="grado.id">
            {{ grado.grado }}
          </option>
        </select>
      </div>

      <button @click="actualizarAsignatura" class="update-button">
        Guardar Cambios
      </button>
    </div>

    <!-- Mensaje de éxito o error -->
    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { AsignaturaModel } from "@/modelo/AsignaturaModel"; // Importa el modelo
import { RequestHandler } from "@/controlador/RequestHandler"; // Para el login forzado

export default {
  data() {
    return {
      asignatura: null, // Datos de la asignatura que estamos editando
      colegios: [], // Lista de colegios
      grados: [], // Lista de grados
      mensaje: "", // Mensaje de éxito o error
      usuarioLogueado: null, // Datos del usuario logueado
    };
  },
  async mounted() {
    const asignaturaId = this.$route.params.id; // Obtener el ID de la asignatura desde la URL

    // Forzar login para debug
    const ojo = new RequestHandler();
    const loginResponse = await ojo.postRequest("user/token/", {
      email: "ojo@amdin.com",
      password: "123",
    });

    // Guardar el usuario logueado
    this.usuarioLogueado = loginResponse.data;

    // Cargar la asignatura actual, colegios y grados
    await this.cargarAsignatura(asignaturaId);
    await this.cargarColegios();
    await this.cargarGrados();
  },
  methods: {
    // Cargar los datos de la asignatura que se está editando
    async cargarAsignatura(id) {
      try {
        const asignaturaModel = new AsignaturaModel();
        this.asignatura = await asignaturaModel.obtenerAsignatura(id);
      } catch (error) {
        console.error(`Error al cargar la asignatura con ID ${id}:`, error);
      }
    },

    // Cargar todos los colegios del administrador
    async cargarColegios() {
      try {
        const asignaturaModel = new AsignaturaModel();
        this.colegios = await asignaturaModel.obtenerColegios(); // Lista de colegios
      } catch (error) {
        console.error("Error al cargar los colegios:", error);
      }
    },

    // Cargar todos los grados del administrador
    async cargarGrados() {
      try {
        const asignaturaModel = new AsignaturaModel();
        this.grados = await asignaturaModel.obtenerGrados(); // Lista de grados
      } catch (error) {
        console.error("Error al cargar los grados:", error);
      }
    },

    // Guardar los cambios realizados en la asignatura
    async actualizarAsignatura() {
      try {
        const asignaturaModel = new AsignaturaModel();

        // Actualizar la asignatura con los nuevos datos
        await asignaturaModel.actualizarAsignatura(
          this.asignatura.id,
          this.asignatura.nombre,
          this.asignatura.grado,
          this.asignatura.colegio
        );

        // Mostrar mensaje de éxito
        this.mensaje = "Asignatura actualizada exitosamente";
      } catch (error) {
        this.mensaje = "Error al actualizar la asignatura. Intenta de nuevo.";
        console.error("Error al actualizar asignatura:", error);
      }
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
  height: 45vh;
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

h1 {
  margin: 0;
  font-size: 24px;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.input-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.update-button {
  width: 100%;
  padding: 12px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button:hover {
  background-color: #005bb5;
}

.mensaje {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}
</style>
