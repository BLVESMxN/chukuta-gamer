<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE ASIGNATURAS</h1>
        </header>
  
        <!-- Formulario de Filtros -->
        <div class="filter-container">
          <h2>Filtrar Asignaturas</h2>
  
          <!-- Campo de búsqueda -->
          <div class="form-field">
            <label for="busqueda">Buscar por Nombre</label>
            <input v-model="busquedaAsignatura" placeholder="Buscar asignatura..." class="input-field" />
          </div>
  
          <!-- Filtro por colegio -->
          <div class="form-field">
            <label for="colegioFilter">Filtrar por Colegio</label>
            <select v-model="filtroColegio" class="input-field">
              <option value="">Todos</option>
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">
                {{ colegio.nombre }}
              </option>
            </select>
          </div>
  
          <!-- Filtro por grado -->
          <div class="form-field">
            <label for="gradoFilter">Filtrar por Grado</label>
            <select v-model="filtroGrado" class="input-field">
              <option value="">Todos</option>
              <option v-for="grado in grados" :key="grado.id" :value="grado.id">
                {{ grado.nivel === 1 ? 'Primaria' : 'Secundaria' }} - {{ grado.grado }}º
              </option>
            </select>
          </div>
        </div>
  
        <!-- Formulario para agregar nueva asignatura -->
        <div class="form-container">
          <h2>Agregar Asignatura</h2>
  
          <div class="form-field">
            <label for="nombre">Nombre</label>
            <input v-model="nuevaAsignatura.nombre" placeholder="Nombre de la asignatura" class="input-field" />
          </div>
  
          <div class="form-field">
            <label for="grado">Grado</label>
            <select v-model="nuevaAsignatura.grado" class="input-field">
              <option v-for="grado in grados" :key="grado.id" :value="grado.id">
                {{ grado.nivel === 1 ? 'Primaria' : 'Secundaria' }} - {{ grado.grado }}º
              </option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="colegio">Colegio</label>
            <select v-model="nuevaAsignatura.colegio" class="input-field">
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">
                {{ colegio.nombre }}
              </option>
            </select>
          </div>
  
          <button @click="agregarAsignatura" class="add-button">Agregar Asignatura</button>
        </div>
  
        <!-- Formulario para editar asignatura -->
        <div v-if="asignaturaEditada" class="form-container">
          <h2>Editar Asignatura</h2>
  
          <div class="form-field">
            <label for="nombre">Nombre</label>
            <input v-model="asignaturaEditada.nombre" placeholder="Nombre de la asignatura" class="input-field" />
          </div>
  
          <div class="form-field">
            <label for="grado">Grado</label>
            <select v-model="asignaturaEditada.grado" class="input-field">
              <option v-for="grado in grados" :key="grado.id" :value="grado.id">
                {{ grado.nivel === 1 ? 'Primaria' : 'Secundaria' }} - {{ grado.grado }}º
              </option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="colegio">Colegio</label>
            <select v-model="asignaturaEditada.colegio" class="input-field">
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">
                {{ colegio.nombre }}
              </option>
            </select>
          </div>
  
          <button @click="editarAsignatura" class="save-button">Guardar Cambios</button>
          <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar asignaturas -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Nombre
                  <button @click="ordenarPorNombre" class="sort-button">
                    Ordenar {{ ordenNombreAscendente ? 'Ascendente' : 'Descendente' }}
                    <i :class="ordenNombreAscendente ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up'"></i>
                  </button>
                </th>
                <th>Grado</th>
                <th>Colegio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asignatura in asignaturasOrdenadas" :key="asignatura.id">
                <td>{{ asignatura.id }}</td>
                <td>{{ asignatura.nombre }}</td>
                <td>{{ obtenerDescripcionGrado(asignatura.grado) }}</td>
                <td>{{ obtenerNombreColegio(asignatura.colegio) }}</td>
                <td>
                  <button @click="setEditarAsignatura(asignatura)" class="edit-button">Editar</button>
                  <button @click="deleteAsignatura(asignatura.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AsignaturasModel from "@/modelo/AsignaturasModel.mjs";
  
  export default {
    mixins: [AsignaturasModel],
    data() {
      return {
        ordenNombreAscendente: true, // Estado para controlar el orden del nombre
        filtroColegio: "",
        filtroGrado: "",
        busquedaAsignatura: "" // Campo para la búsqueda
      };
    },
    computed: {
      // Filtrar asignaturas por nombre, colegio y grado
      asignaturasFiltradas() {
        return this.asignaturas.filter(asignatura => {
          // Filtrar por búsqueda (nombre de la asignatura)
          const cumpleBusqueda = asignatura.nombre
            .toLowerCase()
            .includes(this.busquedaAsignatura.toLowerCase());
  
          // Filtrar por colegio
          const cumpleColegio = this.filtroColegio
            ? asignatura.colegio === parseInt(this.filtroColegio)
            : true;
  
          // Filtrar por grado
          const cumpleGrado = this.filtroGrado
            ? asignatura.grado === parseInt(this.filtroGrado)
            : true;
  
          return cumpleBusqueda && cumpleColegio && cumpleGrado;
        });
      },
      // Ordenar asignaturas por nombre
      asignaturasOrdenadas() {
        return [...this.asignaturasFiltradas].sort((a, b) => {
          if (this.ordenNombreAscendente) {
            return a.nombre.localeCompare(b.nombre);
          } else {
            return b.nombre.localeCompare(a.nombre);
          }
        });
      }
    },
    methods: {
      // Alternar entre orden ascendente y descendente por nombre
      ordenarPorNombre() {
        this.ordenNombreAscendente = !this.ordenNombreAscendente;
      },
  
      // Obtener la descripción completa del grado
      obtenerDescripcionGrado(idGrado) {
        const grado = this.grados.find(gr => gr.id === idGrado);
        return grado ? `${grado.nivel === 1 ? 'Primaria' : 'Secundaria'} - ${grado.grado}º` : 'N/A';
      },
  
      // Obtener el nombre del colegio
      obtenerNombreColegio(idColegio) {
        const colegio = this.colegios.find(col => col.id === idColegio);
        return colegio ? colegio.nombre : 'N/A';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Diseño consistente con ColegiosAdmin.vue y GradosAdmin.vue */
  
  #app {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  #header {
    background-color: #004d40;
    color: white;
    padding: 15px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  h2 {
    text-align: center;
    color: #004d40;
    padding: 8px;
  }
  
  /* Formulario y contenedor centrado */
  .form-container {
    margin: 20px auto;
    max-width: 400px;
    text-align: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Campo de formulario con espacio adecuado */
  .form-field {
    margin-bottom: 20px;
  }
  
  /* Mejora en los input fields */
  .input-field {
    display: block;
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 100%;
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus {
    border-color: #004d40;
  }
  
  /* Botones con estilos actualizados */
  .add-button,
  .save-button,
  .cancel-button,
  .edit-button,
  .delete-button,
  .sort-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    font-size: 14px;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .add-button,
  .save-button {
    background-color: #004d40;
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
    background-color: #3498db;
    color: white;
  }
  
  .sort-button i {
    margin-left: 8px;
  }
  
  /* Hover effects en los botones */
  .add-button:hover,
  .save-button:hover {
    background-color: #004d40;
  }
  
  .cancel-button:hover,
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .edit-button:hover {
    background-color: #d68910;
  }
  
  .sort-button:hover {
    background-color: #2980b9;
  }
  
  /* Tabla bien proporcionada */
  .table-container {
    margin: 20px auto;
    max-width: 1200px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    padding: 12px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #333;
    color: white;
  }
  </style>
  