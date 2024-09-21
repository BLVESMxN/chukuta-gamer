<template>
  <div>
    <h1>Asignaturas</h1>
    <!-- Formulario para agregar nueva asignatura -->
    <div class="form-container">
      <h2>Agregar Asignatura</h2>
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

    <!-- Lista de asignaturas -->
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Grado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asignatura in asignaturas" :key="asignatura.id">
            <td>{{ asignatura.id }}</td>
            <td>{{ asignatura.nombre }}</td>
            <td>{{ asignatura.grado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { AsignaturasService } from "@/modelo/AsignaturasModel.mjs"; // Importamos el AsignaturasService

export default {
  data() {
    return {
      asignaturas: [],
      asignaturasService: new AsignaturasService(), // Instanciamos el servicio de asignaturas
      nuevaAsignatura: {
        nombre: "", // Campo para el nombre
        grado: 0, // Campo para el grado
      },
    };
  },
  async created() {
    await this.cargarAsignaturas();
  },
  methods: {
    // Método para cargar las asignaturas usando el servicio
    async cargarAsignaturas() {
      try {
        this.asignaturas = await this.asignaturasService.obtenerAsignaturas();
      } catch (error) {
        console.error("Error cargando asignaturas:", error);
      }
    },

    // Método para agregar una nueva asignatura usando el servicio
    async agregarAsignatura() {
      try {
        const { nombre, grado } = this.nuevaAsignatura;

        await this.asignaturasService.agregarAsignatura(nombre, grado);

        // Refrescar la lista de asignaturas después de agregar
        this.cargarAsignaturas();
        alert("¡Asignatura agregada exitosamente!");

        // Limpiar el formulario
        this.nuevaAsignatura = {
          nombre: "",
          grado: 0,
        };
      } catch (error) {
        console.error("Error agregando la asignatura:", error);
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
