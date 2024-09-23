<template>
  <div>
    <h1>Asistencias</h1>
    <!-- Formulario para agregar nueva asistencia -->
    <div class="form-container">
      <h2>Agregar Asistencia</h2>
      <input
        v-model="nuevaAsistencia.estudianteId"
        placeholder="ID del Estudiante"
        class="input-field"
        type="number"
      />
      <input
        v-model="nuevaAsistencia.asignaturaId"
        placeholder="ID de la Asignatura"
        class="input-field"
        type="number"
      />
      <input
        v-model="nuevaAsistencia.fecha"
        placeholder="Fecha (YYYY-MM-DD)"
        class="input-field"
        type="date"
      />
      <select v-model="nuevaAsistencia.estado" class="input-field">
        <option value="Presente">Presente</option>
        <option value="Ausente">Ausente</option>
        <option value="Permiso">Permiso</option>
      </select>
      <button @click="agregarAsistencia" class="add-button">
        Agregar Asistencia
      </button>
    </div>

    <!-- Lista de asistencias con la opción de cambiar el estado -->
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Asignatura</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asistencia in asistencias" :key="asistencia.id">
            <td>{{ asistencia.id }}</td>
            <td>{{ asistencia.estudiante_id }}</td>
            <td>{{ asistencia.asignatura_id }}</td>
            <td>{{ asistencia.fecha }}</td>
            <td>
              <select
                v-model="asistencia.estado"
                @change="actualizarEstado(asistencia)"
              >
                <option value="Presente">Presente</option>
                <option value="Ausente">Ausente</option>
                <option value="Permiso">Permiso</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { AsistenciasEstudiantesService } from "@/modelo/AsistenciaEstudiantes.mjs"; // Importamos el servicio de asistencias

export default {
  data() {
    return {
      asistencias: [],
      asistenciasService: new AsistenciasEstudiantesService(), // Instanciamos el servicio de asistencias
      nuevaAsistencia: {
        estudianteId: "",
        asignaturaId: "",
        fecha: "",
        estado: "Presente",
      },
    };
  },
  async created() {
    await this.cargarAsistencias();
  },
  methods: {
    async cargarAsistencias() {
      try {
        this.asistencias = await this.asistenciasService.obtenerAsistencias();
      } catch (error) {
        console.error("Error cargando asistencias:", error);
      }
    },

    async agregarAsistencia() {
      try {
        const { estudianteId, asignaturaId, fecha, estado } =
          this.nuevaAsistencia;

        await this.asistenciasService.agregarAsistencia(
          estudianteId,
          asignaturaId,
          fecha,
          estado
        );

        await this.cargarAsistencias();
        alert("¡Asistencia agregada exitosamente!");

        // Limpiar el formulario
        this.nuevaAsistencia = {
          estudianteId: "",
          asignaturaId: "",
          fecha: "",
          estado: "Presente",
        };
      } catch (error) {
        console.error("Error agregando la asistencia:", error);
      }
    },

    async actualizarEstado(asistencia) {
      try {
        await this.asistenciasService.actualizarAsistencia(
          asistencia.id,
          asistencia.estado
        );

        alert("Estado de asistencia actualizado exitosamente.");
      } catch (error) {
        console.error("Error actualizando el estado de la asistencia:", error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

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
  padding: 10px 20px;
  background-color: #35853f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
