<template>
  <div class="container">
    <h1>Gestión de Estudiantes</h1>

    <!-- Botón para agregar nuevo estudiante -->
    <div class="form-container">
      <button @click="navegarAgregarEstudiante" class="add-button">
        ➕ Agregar Estudiante
      </button>
    </div>

    <!-- Lista de estudiantes -->
    <div class="estudiantes-container">
      <table class="styled-table">
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
          <tr
            v-for="estudiante in estudiantes"
            :key="estudiante.id"
            class="table-row"
          >
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.name }}</td>
            <td>{{ estudiante.email }}</td>
            <td>
              <span
                :class="{
                  'badge-active': estudiante.is_active,
                  'badge-inactive': !estudiante.is_active,
                }"
              >
                {{ estudiante.is_active ? "Sí" : "No" }}
              </span>
            </td>
            <td class="actions">
              <button
                @click="navegarEditarEstudiante(estudiante.id)"
                class="edit-button"
              >
                ✏️
              </button>
              <button
                @click="eliminarEstudiante(estudiante.id)"
                class="delete-button"
              >
                ❌
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
/* Contenedor general */
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

/* Título principal */
h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Estilo del botón de agregar estudiante */
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

/* Contenedor de la tabla */
.estudiantes-container {
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

/* Estilos para la tabla */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  text-align: left;
  color: #34495e;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table th {
  background-color: #3498db;
  color: white;
}

.table-row:hover {
  background-color: #f0f0f0;
}

/* Estilo de las filas */
.table-row td {
  background-color: #ecf0f1;
  border-bottom: 1px solid #bdc3c7;
}

/* Botones de acción */
.actions {
  display: flex;
  justify-content: space-around;
}

.edit-button,
.delete-button {
  padding: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: #2980b9;
}

.edit-button:hover {
  background-color: #3498db;
}

.delete-button {
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* Badge para activo/inactivo */
.badge-active {
  background-color: #27ae60;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
}

.badge-inactive {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
}
</style>
