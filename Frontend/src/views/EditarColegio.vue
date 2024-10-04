<template>
  <div class="app-container">
    <header id="header">
      <h1>Editar Colegio</h1>
    </header>

    <div v-if="colegio" class="form-container">
      <div class="input-group">
        <label for="nombre">Nombre del Colegio</label>
        <input
          v-model="colegio.nombre"
          id="nombre"
          placeholder="Nombre del Colegio"
          class="input-field"
        />
      </div>

      <div class="input-group">
        <label for="extension">Extensión</label>
        <input
          v-model="colegio.extension"
          id="extension"
          placeholder="Extensión del Colegio"
          class="input-field"
        />
      </div>

      <button @click="guardarCambios" class="save-button">
        Guardar Cambios
      </button>
    </div>

    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { ColegioModel } from "@/modelo/ColegioModel"; // Importa el modelo del colegio

export default {
  data() {
    return {
      colegio: null, // Aquí se almacenan los datos del colegio a editar
      mensaje: "", // Mensaje de confirmación o error
    };
  },
  async mounted() {
    const colegioId = this.$route.params.id; // Obtén el ID del colegio de la URL
    await this.cargarColegio(colegioId); // Carga los datos del colegio
  },
  methods: {
    // Cargar los datos del colegio basado en el ID
    async cargarColegio(id) {
      try {
        const colegioModel = new ColegioModel();
        this.colegio = await colegioModel.obtenerColegio(id); // Obtiene el colegio según su ID
      } catch (error) {
        console.error("Error al cargar el colegio:", error);
      }
    },

    // Guardar los cambios realizados en el colegio
    async guardarCambios() {
      try {
        const colegioModel = new ColegioModel();
        await colegioModel.actualizarColegio(
          this.colegio.id,
          this.colegio.nombre,
          this.colegio.admin,
          this.colegio.suscripcion,
          this.colegio.extension
        );
        this.mensaje = "Cambios guardados correctamente";
      } catch (error) {
        this.mensaje = "Error al guardar los cambios.";
        console.error("Error al guardar cambios:", error);
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

.save-button {
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

.save-button:hover {
  background-color: #005bb5;
}

.mensaje {
  margin-top: 20px;
  font-size: 18px;
  color: green;
}
</style>
