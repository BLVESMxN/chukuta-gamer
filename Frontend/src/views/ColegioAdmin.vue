<template>
  <div class="app-container">
    <header id="header">
      <h1>Agregar Colegio</h1>
    </header>

    <!-- Formulario para agregar nuevo colegio -->
    <div class="form-container">
      <div class="input-group">
        <label for="nombre">Nombre del Colegio</label>
        <input
          v-model="nuevoColegio.nombre"
          id="nombre"
          placeholder="Nombre del Colegio"
          class="input-field"
        />
      </div>

      <div class="input-group">
        <label for="extension">Extensión</label>
        <input
          v-model="nuevoColegio.extension"
          id="extension"
          placeholder="Extensión del Colegio"
          class="input-field"
        />
      </div>

      <button @click="agregarColegio" class="add-button">
        Agregar Colegio
      </button>
    </div>

    <!-- Mensaje de éxito o error -->
    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { ColegioModel } from "@/modelo/ColegioModel"; // Asegúrate de tener el modelo importado
import { RequestHandler } from "@/controlador/RequestHandler"; // Para el login forzado

export default {
  data() {
    return {
      nuevoColegio: {
        nombre: "",
        suscripcion: true, // Siempre será true
        extension: "",
      },
      mensaje: "", // Para mostrar mensajes de éxito o error
      usuarioLogueado: null, // Aquí almacenaremos los datos del usuario logueado
    };
  },
  async mounted() {
    // Forzar login para debug
    const ojo = new RequestHandler();
    const loginResponse = await ojo.postRequest("user/token/", {
      email: "ojo@amdin.com",
      password: "123",
    });

    // Guardamos el usuario logueado en el estado
    this.usuarioLogueado = loginResponse.data;
  },
  methods: {
    // Agregar un nuevo colegio
    async agregarColegio() {
      try {
        const colegioModel = new ColegioModel();

        // Usamos el ID del usuario logueado como admin
        await colegioModel.crearColegio(
          this.nuevoColegio.nombre,
          this.usuarioLogueado.id, // Aquí usamos el ID del usuario logueado
          this.nuevoColegio.suscripcion, // Siempre true
          this.nuevoColegio.extension
        );

        // Mostrar mensaje de éxito
        this.mensaje = "Colegio agregado exitosamente";

        // Limpiar el formulario
        this.nuevoColegio = {
          nombre: "",
          suscripcion: true, // Siempre true
          extension: "",
        };
      } catch (error) {
        // Mostrar mensaje de error
        this.mensaje = "Error al agregar colegio. Intenta de nuevo.";
        console.error("Error al agregar colegio:", error);
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

.add-button {
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

.add-button:hover {
  background-color: #005bb5;
}

.mensaje {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}
</style>
