<template>
  <div>
    <h1>Agregar Asignatura</h1>

    <!-- Formulario para agregar nueva asignatura -->
    <div class="form-container">
      <input
        v-model="nuevaAsignatura.nombre"
        placeholder="Nombre"
        class="input-field"
      />
      <input
        v-model="nuevaAsignatura.grado"
        placeholder="Grado"
        class="input-field"
        type="number"
      />
      <button @click="agregarAsignatura" class="add-button">
        Agregar Asignatura
      </button>
    </div>
  </div>
</template>

<script>
import { AsignaturasService } from "@/modelo/AsignaturaModel.mjs";

export default {
  data() {
    return {
      nuevaAsignatura: {
        nombre: "",
        grado: 0,
      },
      asignaturasService: new AsignaturasService(),
    };
  },
  methods: {
    async agregarAsignatura() {
      try {
        const { nombre, grado } = this.nuevaAsignatura;
        await this.asignaturasService.agregarAsignatura(nombre, grado);
        alert("¡Asignatura agregada exitosamente!");
        this.$router.push("/Asignatura-Crud"); // Volver a la lista de asignaturas
      } catch (error) {
        console.error("Error agregando la asignatura:", error);
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

.add-button {
  background-color: #35853f;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
</style>
