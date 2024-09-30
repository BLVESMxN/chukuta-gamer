<template>
  <div class="container">
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
      <div class="checkbox-container">
        <input type="checkbox" v-model="nuevoEstudiante.is_active" />
        <label>Estudiante Activo</label>
      </div>
      <button @click="agregarEstudiante" class="add-button">
        ➕ Agregar Estudiante
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

.add-button {
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #2ecc71;
}
</style>
