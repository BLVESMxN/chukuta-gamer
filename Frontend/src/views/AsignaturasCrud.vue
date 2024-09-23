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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asignatura in asignaturas" :key="asignatura.id">
            <td>{{ asignatura.id }}</td>
            <td>{{ asignatura.nombre }}</td>
            <td>{{ asignatura.grado }}</td>
            <td>
              <button
                @click="mostrarModalEdicion(asignatura)"
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar asignatura -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="cerrarModal">&times;</span>
        <h2>Editar Asignatura</h2>
        <input
          v-model="asignaturaSeleccionada.nombre"
          placeholder="Nombre"
          class="input-field"
        />
        <input
          v-model="asignaturaSeleccionada.grado"
          placeholder="Grado"
          class="input-field"
          type="number"
        />
        <button @click="actualizarAsignatura" class="add-button">
          Guardar Cambios
        </button>
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
      nuevaAsignatura: {
        nombre: "",
        grado: 0,
      },
      mostrarModal: false, // Para mostrar u ocultar el modal
      asignaturaSeleccionada: {
        id: null,
        nombre: "",
        grado: 0,
      }, // Almacenar la asignatura que estamos editando
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

    async agregarAsignatura() {
      try {
        const { nombre, grado } = this.nuevaAsignatura;

        await this.asignaturasService.agregarAsignatura(nombre, grado);

        this.cargarAsignaturas();
        alert("¡Asignatura agregada exitosamente!");

        this.resetFormulario();
      } catch (error) {
        console.error("Error agregando la asignatura:", error);
      }
    },

    // Método para mostrar el modal con los datos de la asignatura a editar
    mostrarModalEdicion(asignatura) {
      this.asignaturaSeleccionada = { ...asignatura };
      this.mostrarModal = true;
    },

    // Método para cerrar el modal
    cerrarModal() {
      this.mostrarModal = false;
    },

    // Método para actualizar una asignatura
    async actualizarAsignatura() {
      try {
        const { id, nombre, grado } = this.asignaturaSeleccionada;

        await this.asignaturasService.actualizarAsignatura(id, nombre, grado);

        this.cargarAsignaturas();
        alert("¡Asignatura actualizada exitosamente!");

        this.cerrarModal();
      } catch (error) {
        console.error("Error actualizando la asignatura:", error);
      }
    },

    // Método para eliminar una asignatura
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

    // Método para resetear el formulario
    resetFormulario() {
      this.nuevaAsignatura = {
        nombre: "",
        grado: 0,
      };
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

.add-button,
.edit-button,
.delete-button {
  padding: 10px 20px;
  margin-right: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
  background-color: #35853f;
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

/* Estilos del modal */
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  border-radius: 8px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}
</style>
