<template>
  <div>
    <h1>Estudiantes</h1>

    <!-- Botón para agregar nuevo estudiante -->
    <div class="form-container">
      <button @click="navegarAgregarEstudiante" class="add-button">
        Agregar Estudiante
      </button>
    </div>

    <!-- Lista de estudiantes -->
    <div class="estudiantes-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantes" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.name }}</td>
            <td>{{ estudiante.email }}</td>
            <td>{{ estudiante.is_active ? "Sí" : "No" }}</td>
            <td>
              <button
                @click="navegarEditarEstudiante(estudiante.id)"
                class="edit-button"
              >
                Editar
              </button>
              <button
                @click="eliminarEstudiante(estudiante.id)"
                class="delete-button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { EstudiantesService } from "@/modelo/EstudiantesService.mjs";

export default {
  data() {
    return {
      estudiantes: [],
      estudiantesService: new EstudiantesService(),
    };
  },
  async created() {
    await this.cargarEstudiantes();
  },
  methods: {
    async cargarEstudiantes() {
      try {
        this.estudiantes = await this.estudiantesService.obtenerEstudiantes();
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
      }
    },

    navegarAgregarEstudiante() {
      this.$router.push("/Agregar-Estudiante");
    },

    navegarEditarEstudiante(id) {
      this.$router.push(`/Editar-Estudiante/${id}`);
    },

    async eliminarEstudiante(id) {
      if (confirm("¿Estás seguro de eliminar este estudiante?")) {
        try {
          await this.estudiantesService.eliminarEstudiante(id);
          this.cargarEstudiantes();
          alert("¡Estudiante eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el estudiante:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor de estudiantes en formato de lista */
.estudiantes-container {
  padding: 20px;
}

.add-button {
  background-color: #35853f;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  margin-bottom: 20px;
}

.edit-button,
.delete-button {
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

table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

/* Otros estilos */
</style>
