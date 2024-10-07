<template>
  <div>
    <header id="header">
      <h1>Gestión de Estudiantes</h1>
    </header>

    <!-- Filtros -->
    <div class="filter-container">
      <h2>Filtrar Estudiantes</h2>

      <!-- Filtro por Colegio -->
      <div class="form-field">
        <label for="colegio">Filtrar por Colegio</label>
        <select
          v-model="filtroColegio"
          @change="filtrarEstudiantesPorColegio"
          class="input-field"
        >
          <option value="">Todos los Colegios</option>
          <option
            v-for="colegio in colegios"
            :key="colegio.id"
            :value="colegio.id"
          >
            {{ colegio.nombre }}
          </option>
        </select>
      </div>

      <!-- Buscador por nombre -->
      <div class="form-field">
        <label for="buscarNombre">Buscar por Nombre</label>
        <input
          v-model="busquedaNombre"
          placeholder="Buscar por nombre..."
          class="input-field"
        />
      </div>
    </div>

    <!-- Formulario para agregar o editar estudiante -->
    <div class="form-container">
      <h2>{{ editando ? "Editar Estudiante" : "Agregar Estudiante" }}</h2>

      <div class="form-field">
        <label for="name">Nombre del Estudiante</label>
        <input
          v-model="estudiante.name"
          placeholder="Nombre del Estudiante"
          class="input-field"
        />
      </div>

      <div class="form-field">
        <label for="colegio">Colegio</label>
        <select
          v-model="estudiante.colegio"
          @change="cargarGradosPadres"
          class="input-field"
        >
          <option
            v-for="colegio in colegios"
            :key="colegio.id"
            :value="colegio.id"
          >
            {{ colegio.nombre }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="grado">Grado</label>
        <select v-model="estudiante.grado" class="input-field">
          <option v-for="grado in grados" :key="grado.id" :value="grado.id">
            {{ mostrarGrado(grado) }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="email_padre">Correo del Padre</label>
        <input
          v-model="estudiante.email_padre"
          placeholder="Correo del Padre"
          class="input-field"
        />
      </div>

      <div class="form-field">
        <label for="email_madre">Correo de la Madre</label>
        <input
          v-model="estudiante.email_madre"
          placeholder="Correo de la Madre"
          class="input-field"
        />
      </div>

      <button
        @click="editando ? actualizarEstudiante() : agregarEstudiante()"
        class="add-button"
      >
        {{ editando ? "Guardar Cambios" : "Agregar Estudiante" }}
      </button>

      <p v-if="errorMensaje" class="error">{{ errorMensaje }}</p>
    </div>

    <!-- Tabla para mostrar estudiantes -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Colegio</th>
            <th>Grado</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantesFiltrados" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.name }}</td>
            <td>{{ obtenerNombreColegio(estudiante.colegio) }}</td>
            <td>{{ obtenerNombreGrado(estudiante.grado) }}</td>
            <td>{{ estudiante.email }}</td>
            <td>
              <button
                @click="setEditarEstudiante(estudiante)"
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
import EstudiantesModel from "@/modelo/EstudiantesModel.mjs";

export default {
  data() {
    return {
      estudiantes: [], // Lista de todos los estudiantes
      colegios: [], // Lista de colegios
      grados: [], // Lista de grados
      filtroColegio: "", // Filtro de colegio
      busquedaNombre: "", // Filtro de búsqueda por nombre
      estudiante: {
        name: "",
        colegio: null,
        grado: null,
        email_padre: "",
        email_madre: "",
      },
      errorMensaje: "",
      editando: false,
      estudianteId: null,
      modeloEstudiantes: new EstudiantesModel(), // Instancia del modelo
    };
  },
  computed: {
    estudiantesFiltrados() {
      let estudiantesFiltrados = this.estudiantes;

      // Filtrar por colegio
      if (this.filtroColegio) {
        estudiantesFiltrados = estudiantesFiltrados.filter(
          (estudiante) => estudiante.colegio === parseInt(this.filtroColegio)
        );
      }

      // Filtrar por nombre
      if (this.busquedaNombre) {
        estudiantesFiltrados = estudiantesFiltrados.filter((estudiante) =>
          estudiante.name
            .toLowerCase()
            .includes(this.busquedaNombre.toLowerCase())
        );
      }

      return estudiantesFiltrados;
    },
  },
  async mounted() {
    await this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        this.estudiantes = await this.modeloEstudiantes.obtenerEstudiantes();
        this.colegios = await this.modeloEstudiantes.obtenerColegios();
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    },

    async cargarGradosPadres() {
      if (this.estudiante.colegio) {
        this.grados = await this.modeloEstudiantes.obtenerGradosPorColegio(
          this.estudiante.colegio
        );
      }
    },

    mostrarGrado(grado) {
      const nivel = grado.nivel === 1 ? "Primaria" : "Secundaria";
      return `${nivel} - Grado ${grado.grado}`;
    },

    async agregarEstudiante() {
      try {
        // Obtener los IDs de los padres usando sus correos electrónicos
        const padre = await this.modeloEstudiantes.obtenerPadrePorCorreo(
          this.estudiante.email_padre,
          this.estudiante.colegio
        );
        const madre = await this.modeloEstudiantes.obtenerPadrePorCorreo(
          this.estudiante.email_madre,
          this.estudiante.colegio
        );

        if (!padre || !madre) {
          this.errorMensaje =
            "Uno o ambos correos no corresponden a los padres registrados en este colegio.";
          return;
        }

        // Imprimir los IDs de los padres
        console.log(`ID del padre: ${padre.id}`);
        console.log(`ID de la madre: ${madre.id}`);

        // Asignar los IDs obtenidos a los atributos correspondientes
        this.estudiante.user_padre = padre.id;
        this.estudiante.user_madre = madre.id;

        // Verificar que el grado pertenezca al colegio seleccionado
        const gradoValido =
          await this.modeloEstudiantes.verificarGradoPorColegio(
            this.estudiante.colegio,
            this.estudiante.grado
          );

        if (!gradoValido) {
          this.errorMensaje =
            "El grado seleccionado no corresponde al colegio seleccionado.";
          return;
        }

        // Llamar al modelo para crear el estudiante
        await this.modeloEstudiantes.crearEstudiante(this.estudiante);
        await this.cargarDatos();
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al agregar estudiante:", error);
      }
    },

    async actualizarEstudiante() {
      try {
        const gradoValido =
          await this.modeloEstudiantes.verificarGradoPorColegio(
            this.estudiante.colegio,
            this.estudiante.grado
          );
        if (!gradoValido) {
          this.errorMensaje =
            "El grado seleccionado no corresponde al colegio seleccionado.";
          return;
        }

        await this.modeloEstudiantes.actualizarEstudiante(
          this.estudianteId,
          this.estudiante
        );
        await this.cargarDatos();
        this.limpiarFormulario();
        this.editando = false;
      } catch (error) {
        console.error("Error al actualizar estudiante:", error);
      }
    },

    async eliminarEstudiante(id) {
      const confirmar = confirm("¿Estás seguro de eliminar este estudiante?");
      if (confirmar) {
        try {
          await this.modeloEstudiantes.eliminarEstudiante(id);
          await this.cargarDatos();
        } catch (error) {
          console.error("Error al eliminar estudiante:", error);
        }
      }
    },

    setEditarEstudiante(estudiante) {
      this.estudianteId = estudiante.id;
      this.estudiante = { ...estudiante };
      this.editando = true;
    },

    obtenerNombreColegio(colegioId) {
      const colegio = this.colegios.find((col) => col.id === colegioId);
      return colegio ? colegio.nombre : "N/A";
    },

    obtenerNombreGrado(gradoId) {
      const grado = this.grados.find((gr) => gr.id === gradoId);
      return grado ? `${this.mostrarGrado(grado)}` : "N/A";
    },

    limpiarFormulario() {
      this.estudiante = {
        name: "",
        colegio: null,
        grado: null,
        email_padre: "",
        email_madre: "",
      };
      this.estudianteId = null;
      this.errorMensaje = "";
    },
  },
};
</script>
<style scoped>
/* Estilos generales */
#header {
  background-color: #004d40;
  color: white;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  color: #004d40;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-field {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-button,
.edit-button,
.delete-button {
  background-color: #004d40;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.edit-button {
  background-color: #f39c12;
}

.delete-button {
  background-color: #e74c3c;
}

.table-container {
  margin: 20px auto;
  max-width: 1000px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #333;
  color: white;
}
</style>
