<template>
  <div>
    <h1>Agregar Estudiante</h1>

    <!-- Formulario para agregar nuevo estudiante -->
    <div class="form-container">
      <input
        v-model="nuevoEstudiante.name"
        placeholder="Nombre"
        class="input-field"
      />
      <input
        v-model="nuevoEstudiante.email"
        placeholder="Email"
        class="input-field"
        type="email"
      />
      <input
        v-model="nuevoEstudiante.password"
        placeholder="Contraseña"
        class="input-field"
        type="password"
      />
      <label>
        <input type="checkbox" v-model="nuevoEstudiante.is_active" />
        ¿Estudiante Activo?
      </label>
      <button @click="agregarEstudiante" class="add-button">
        Agregar Estudiante
      </button>
    </div>
  </div>
</template>

<script>
import { EstudiantesService } from "@/modelo/EstudiantesService.mjs";

export default {
  data() {
    return {
      nuevoEstudiante: {
        name: "",
        email: "",
        password: "",
        is_active: true,
      },
      estudiantesService: new EstudiantesService(),
    };
  },
  methods: {
    async agregarEstudiante() {
      try {
        const { name, email, password, is_active } = this.nuevoEstudiante;
        await this.estudiantesService.agregarEstudiante(
          name,
          email,
          password,
          is_active
        );
        alert("¡Estudiante agregado exitosamente!");
        this.$router.push("/Estudiantes-Crud"); // Volver a la lista de estudiantes
      } catch (error) {
        console.error("Error agregando el estudiante:", error);
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
