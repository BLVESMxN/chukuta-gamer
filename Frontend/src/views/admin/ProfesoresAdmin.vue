<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE PROFESORES</h1>
        </header>
  
        <!-- Filtros y Buscador -->
        <div class="filter-container">
          <h2>Buscar y Filtrar Profesores</h2>
  
          <!-- Filtro por nombre -->
          <div class="form-field">
            <label for="nombreFilter">Buscar por Nombre</label>
            <input v-model="filtroNombre" class="input-field" placeholder="Nombre del profesor..." />
          </div>
  
          <!-- Filtro por colegio -->
          <div class="form-field">
            <label for="colegioFilter">Filtrar por Colegio</label>
            <select v-model="filtroColegio" class="input-field">
              <option value="">Todos</option>
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
            </select>
          </div>
        </div>
  
        <!-- Formulario para agregar o editar profesor -->
        <div class="form-container">
          <h2>{{ profesorEditado ? "Editar Profesor" : "Agregar Profesor" }}</h2>
  
          <!-- Campo para nombre -->
          <div class="form-field">
            <label for="name">Nombre del Profesor</label>
            
            <!-- Input para nombre cuando se está editando -->
            <input v-if="profesorEditado" v-model="profesorEditado.name" class="input-field" placeholder="Nombre" />
            
            <!-- Input para nombre cuando se está creando -->
            <input v-else v-model="nuevoProfesor.name" class="input-field" placeholder="Nombre" />
          </div>
  
          <!-- Selector de colegio -->
          <div class="form-field">
            <label for="colegio">Colegio</label>
            
            <!-- Selector de colegio para editar -->
            <select v-if="profesorEditado" v-model="profesorEditado.colegio" class="input-field">
              <option value="0" disabled>Seleccione un Colegio</option>
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
            </select>
            
            <!-- Selector de colegio para crear -->
            <select v-else v-model="nuevoProfesor.colegio" class="input-field">
              <option value="0" disabled>Seleccione un Colegio</option>
              <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
            </select>
          </div>
  
          <!-- Botones de guardar -->
          <button v-if="profesorEditado" @click="editarProfesor" class="save-button">Guardar Cambios</button>
          <button v-else @click="agregarProfesor" class="add-button">Agregar Profesor</button>
          <button v-if="profesorEditado" @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar profesores -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Nombre
                  <button @click="ordenarPorNombre" class="sort-button">
                    Ordenar {{ ordenNombreAscendente ? 'Ascendente' : 'Descendente' }}
                  </button>
                </th>
                <th>
                  Colegio
                  <button @click="ordenarPorColegio" class="sort-button">
                    Ordenar {{ ordenColegioAscendente ? 'Ascendente' : 'Descendente' }}
                  </button>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="profesor in profesoresOrdenados" :key="profesor.id">
                <td>{{ profesor.id }}</td>
                <td>{{ profesor.name }}</td>
                <td>{{ obtenerNombreColegio(profesor.colegio) }}</td>
                <td>
                  <button @click="setEditarProfesor(profesor)" class="edit-button">Editar</button>
                  <button @click="deleteProfesor(profesor.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProfesoresModel from "@/modelo/ProfesoresModel.mjs";
  
  export default {
    mixins: [ProfesoresModel],
    data() {
      return {
        ordenNombreAscendente: true,   // Estado para ordenar nombres
        ordenColegioAscendente: true,  // Estado para ordenar colegios
      };
    },
    computed: {
      // Filtrar y ordenar profesores
      profesoresFiltrados() {
        return this.profesores.filter(profesor => {
          const cumpleNombre = this.filtroNombre
            ? profesor.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
            : true;
          const cumpleColegio = this.filtroColegio ? profesor.colegio === parseInt(this.filtroColegio) : true;
          return cumpleNombre && cumpleColegio;
        });
      },
      // Ordenar profesores por nombre y colegio
      profesoresOrdenados() {
        return [...this.profesoresFiltrados].sort((a, b) => {
          if (this.ordenNombreAscendente) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        }).sort((a, b) => {
          if (this.ordenColegioAscendente) {
            return a.colegio - b.colegio;
          } else {
            return b.colegio - a.colegio;
          }
        });
      }
    },
    methods: {
      // Alternar ordenamiento por nombre
      ordenarPorNombre() {
        this.ordenNombreAscendente = !this.ordenNombreAscendente;
      },
      // Alternar ordenamiento por colegio
      ordenarPorColegio() {
        this.ordenColegioAscendente = !this.ordenColegioAscendente;
      },
      // Obtener el nombre del colegio según su ID
      obtenerNombreColegio(idColegio) {
        const colegio = this.colegios.find(c => c.id === idColegio);
        return colegio ? colegio.nombre : "N/A";
      }
    }
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
  
  /* Formularios y tablas */
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
  
  /* Tabla */
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
  