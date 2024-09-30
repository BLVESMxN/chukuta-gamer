<template>
  <div>
    <h1>Asignaturas</h1>

    <!-- Contenedor de tarjetas de asignaturas -->
    <div class="asignaturas-container">
      <!-- Tarjeta de cada asignatura -->
      <div
        class="asignatura-card"
        v-for="asignatura in asignaturas"
        :key="asignatura.id"
      >
        <p>{{ asignatura.nombre }}</p>
        <p>Grado: {{ asignatura.grado }}</p>
        <button
          @click="navegarEditarAsignatura(asignatura.id)"
          class="edit-button"
        >
          Editar
        </button>
        <button
          @click="eliminarAsignatura(asignatura.id)"
          class="delete-button"
        >
          Eliminar
        </button>
      </div>

      <!-- Tarjeta de agregar asignatura -->
      <div class="add-asignatura-card" @click="navegarAgregarAsignatura">
        <button class="add-button">➕</button>
        <p>Agregar Asignatura</p>
      </div>
    </div>
  </div>
</template>

<script>
import { AsignaturasService } from "@/modelo/AsignaturasModel.mjs";

export default {
  data() {
    return {
      asignaturas: [],
      asignaturasService: new AsignaturasService(),
    };
  },
  async created() {
    await this.cargarAsignaturas();
  },
  methods: {
    async cargarAsignaturas() {
      try {
        this.asignaturas = await this.asignaturasService.obtenerAsignaturas();
      } catch (error) {
        console.error("Error cargando asignaturas:", error);
      }
    },

    navegarAgregarAsignatura() {
      this.$router.push("/Agregar-Asignatura");
    },

    navegarEditarAsignatura(id) {
      this.$router.push(`/Editar-Asignatura/${id}`);
    },

    async eliminarAsignatura(id) {
      if (confirm("¿Estás seguro de eliminar esta asignatura?")) {
        try {
          await this.asignaturasService.eliminarAsignatura(id);
          this.cargarAsignaturas();
          alert("¡Asignatura eliminada exitosamente!");
        } catch (error) {
          console.error("Error eliminando la asignatura:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor de asignaturas */
.asignaturas-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

/* Tarjeta de cada asignatura */
.asignatura-card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
  width: 200px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.asignatura-card p {
  margin: 10px 0;
  font-size: 16px;
}

.edit-button,
.delete-button {
  margin-top: 10px;
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
}

.delete-button {
  background-color: #dc3545;
}

/* Tarjeta de agregar asignatura */
.add-asignatura-card {
  background-color: #f3f3f3;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
  width: 200px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.add-button {
  background-color: #35853f;
  color: white;
  border: none;
  font-size: 24px;
  padding: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.add-asignatura-card p {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}
</style>
