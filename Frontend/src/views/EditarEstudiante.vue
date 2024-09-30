<template>
  <div class="container">
    <h1>Editar Estudiante</h1>

    <div v-if="estudiante">
      <!-- Formulario para editar el estudiante -->
      <div class="form-container">
        <input
          v-model="estudiante.name"
          placeholder="Nombre"
          class="input-field"
        />
        <input
          v-model="estudiante.email"
          placeholder="Email"
          class="input-field"
          type="email"
        />
        <div class="checkbox-container">
          <input type="checkbox" v-model="estudiante.is_active" />
          <label>Estudiante Activo</label>
        </div>
        <button @click="editarEstudiante" class="edit-button">
          Guardar Cambios
        </button>
      </div>
    </div>
    <div v-else>
      <p>Cargando estudiante...</p>
    </div>
  </div>
</template>

<script>
import { EstudiantesService } from "@/modelo/EstudiantesService.mjs";

export default {
  data() {
    return {
      estudiante: null,
      estudiantesService: new EstudiantesService(),
    };
  },
  async created() {
    const id = parseInt(this.$route.params.id);
    this.estudiante = await this.estudiantesService.obtenerEstudiantePorId(id);
  },
  methods: {
    async editarEstudiante() {
      const { id, name, email, is_active } = this.estudiante;
      await this.estudiantesService.editarEstudiante(
        id,
        name,
        email,
        is_active
      );
      alert("¡Estudiante actualizado exitosamente!");
      this.$router.push("/Estudiantes-Crud"); // Volver a la lista de estudiantes
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.input-field {
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #2980b9;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-button {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #2980b9;
}
</style>
