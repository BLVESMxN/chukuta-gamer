<template>
  <div id="app">
    <header id="header">
      <h1>GESTIÓN DE ASIGNATURAS</h1>
    </header>

    <!-- Formulario para agregar nueva asignatura -->
    <div class="form-container">
      <h2>Agregar Asignatura</h2>
      <input
        v-model="nuevaAsignatura.nombre"
        placeholder="Nombre de la Asignatura"
        class="input-field"
      />
      <select v-model="nuevaAsignatura.grado" class="select-field">
        <option value="">Seleccionar Grado</option>
        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ grado.nombre }}</option>
      </select>
      <button @click="agregarAsignatura" class="add-button">
        Agregar Asignatura
      </button>
    </div>

    <!-- Formulario para editar asignatura -->
    <div v-if="asignaturaEditada" class="form-container">
      <h2>Editar Asignatura</h2>
      <input
        v-model="asignaturaEditada.nombre"
        placeholder="Nombre de la Asignatura"
        class="input-field"
      />
      <select v-model="asignaturaEditada.grado" class="select-field">
        <option value="">Seleccionar Grado</option>
        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ grado.nombre }}</option>
      </select>
      <button @click="editarAsignatura" class="save-button">Guardar Cambios</button>
      <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
    </div>

    <!-- Buscador y filtros -->
    <div class="filter-container">
      <input
        v-model="busqueda"
        placeholder="Buscar Asignaturas..."
        class="input-field"
      />
      <select v-model="filtroGrado" class="select-field">
        <option value="">Todos los Grados</option>
        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ grado.nombre }}</option>
      </select>
      <button @click="ordenarAsignaturas('nombre')" class="sort-button">Ordenar por Nombre</button>
      <button @click="ordenarAsignaturas('grado')" class="sort-button">Ordenar por Grado</button>
    </div>

    <!-- Tabla para mostrar asignaturas -->
    <div class="table-container">
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
          <tr v-for="asignatura in asignaturasFiltradas" :key="asignatura.id">
            <td>{{ asignatura.id }}</td>
            <td>{{ asignatura.nombre }}</td>
            <td>{{ asignatura.grado }}</td>
            <td>
              <button @click="setEditarAsignatura(asignatura)" class="edit-button">
                Editar
              </button>
              <button @click="deleteAsignatura(asignatura.id)" class="delete-button">
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
import AsignaturasModel from "@/modelo/AsignaturasModel.mjs";

export default {
  mixins: [AsignaturasModel],
  data() {
    return {
      busqueda: "",
      filtroGrado: "",
      grados: [],
      nuevaAsignatura: {
        nombre: "",
        grado: ""
      },
      asignaturaEditada: null,
    };
  },
  computed: {
    asignaturasFiltradas() {
      return this.asignaturas.filter(asignatura => {
        const matchesBusqueda = asignatura.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
        const matchesGrado = this.filtroGrado ? asignatura.grado === Number(this.filtroGrado) : true;
        return matchesBusqueda && matchesGrado;
      });
    },
  },
  methods: {
    ...AsignaturasModel.methods,
    fetchGrados() {
      this.requestHandler.getRequest("/academico/grados/")
        .then(response => {
          this.grados = response.data.map(grado => ({ id: grado.id, nombre: grado.nombre })); // Cargar ID y nombre de grado
        })
        .catch(error => console.error("Error obteniendo grados:", error));
    },
    ordenarAsignaturas(criterio) {
      this.asignaturas.sort((a, b) => {
        if (criterio === "nombre") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return a.grado - b.grado;
        }
      });
    },
  },
  created() {
    this.fetchAsignaturas();
    this.fetchGrados(); // Cargar los grados
  },
};
</script>

<style scoped>
/* Estilos generales */
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

#header {
  background-color: #35853f;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

h1, h2 {
  margin: 0;
}

/* Estilo para los contenedores del formulario y tabla */
.form-container,
.filter-container,
.table-container {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #35853f;
}

/* Mejora en los input fields */
.input-field,
.select-field {
  display: block;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.select-field:focus {
  border-color: #35853f;
}

/* Botones con estilos actualizados */
.add-button,
.save-button,
.cancel-button,
.edit-button,
.delete-button,
.sort-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 0;
  font-size: 14px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-button,
.save-button {
  background-color: #35853f;
  color: white;
}

.cancel-button,
.delete-button {
  background-color: #e74c3c;
  color: white;
}

.edit-button {
  background-color: #f39c12;
  color: white;
}

.sort-button {
  background-color: #007bff;
  color: white;
}

/* Hover effects en los botones */
.add-button:hover,
.save-button:hover {
  background-color: #2e7031;
}

.cancel-button:hover,
.delete-button:hover {
  background-color: #c0392b;
}

.edit-button:hover {
  background-color: #d68910;
}

.sort-button:hover {
  background-color: #0056b3;
}

/* Tabla sin fondos internos y bien proporcionada */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  font-size: 16px;
  border: 1px solid #ddd;
}

/* Encabezado de la tabla */
th {
  background-color: #35853f;
  color: white;
}

/* Quitar el fondo de los td */
td {
  background-color: #f9f9f9;
}

/* Centrado del contenido */
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
