<template>
  <div>
    <h1>Editar Asignatura</h1>

    <!-- Formulario para editar asignatura -->
    <div class="form-container">
      <input
        v-model="asignatura.nombre"
        placeholder="Nombre"
        class="input-field"
      />
      <input
        v-model="asignatura.grado"
        placeholder="Grado"
        class="input-field"
        type="number"
      />
      <button @click="actualizarAsignatura" class="edit-button">
        Guardar Cambios
      </button>
    </div>
  </div>
</template>

<script>
import { AsignaturasService } from "@/modelo/AsignaturasModel.mjs";

export default {
  data() {
    return {
      asignatura: {
        id: null,
        nombre: "",
        grado: 0,
      },
      asignaturasService: new AsignaturasService(),
    };
  },
  async created() {
    const id = this.$route.params.id;
    await this.cargarAsignatura(id);
  },
  methods: {
    async cargarAsignatura(id) {
      try {
        const asignaturas = await this.asignaturasService.obtenerAsignaturas();
        this.asignatura = asignaturas.find((asig) => asig.id === parseInt(id));
      } catch (error) {
        console.error("Error cargando la asignatura:", error);
      }
    },
    async actualizarAsignatura() {
      try {
        const { id, nombre, grado } = this.asignatura;
        await this.asignaturasService.actualizarAsignatura(id, nombre, grado);
        alert("¡Asignatura actualizada exitosamente!");
        this.$router.push("/Asignatura-Crud"); // Volver a la lista de asignaturas
      } catch (error) {
        console.error("Error actualizando la asignatura:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el formulario */
.form-container {
  margin: 20px;
}

.input-field {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.edit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
</style>
