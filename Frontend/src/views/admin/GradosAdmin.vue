<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE GRADOS</h1>
        </header>
  
        <!-- Formulario de Filtros -->
        <div class="filter-container">
          <h2>Filtrar Grados</h2>
  
          <!-- Filtro por nivel -->
          <div class="form-field">
            <label for="nivelFilter">Filtrar por Nivel</label>
            <select v-model="filtroNivel" class="input-field">
              <option value="">Todos</option>
              <option value="1">Primaria</option>
              <option value="2">Secundaria</option>
            </select>
          </div>
  
          <!-- Filtro por grado -->
          <div class="form-field">
            <label for="gradoFilter">Filtrar por Grado</label>
            <select v-model="filtroGrado" class="input-field">
              <option value="">Todos</option>
              <option v-for="n in 6" :key="n" :value="n">{{ n }}º</option>
            </select>
          </div>
        </div>
  
        <!-- Formulario para agregar nuevo grado -->
        <div class="form-container">
          <h2>Agregar Grado</h2>
  
          <div class="form-field">
            <label for="nivel">Nivel</label>
            <select v-model="nuevoGrado.nivel" class="input-field">
              <option value="1">Primaria</option>
              <option value="2">Secundaria</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="grado">Grado</label>
            <select v-model="nuevoGrado.grado" class="input-field">
              <option v-for="n in 6" :key="n" :value="n">{{ n }}º</option>
            </select>
          </div>
  
          <button @click="agregarGrado" class="add-button">Agregar Grado</button>
        </div>
  
        <!-- Formulario para editar grado -->
        <div v-if="gradoEditado" class="form-container">
          <h2>Editar Grado</h2>
  
          <div class="form-field">
            <label for="nivel">Nivel</label>
            <select v-model="gradoEditado.nivel" class="input-field">
              <option value="1">Primaria</option>
              <option value="2">Secundaria</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="grado">Grado</label>
            <select v-model="gradoEditado.grado" class="input-field">
              <option v-for="n in 6" :key="n" :value="n">{{ n }}º</option>
            </select>
          </div>
  
          <button @click="editarGrado" class="save-button">Guardar Cambios</button>
          <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar grados -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nivel</th>
                <th>
                  Grado
                  <button @click="ordenarPorGrado" class="sort-button">
                    Ordenar 
                    <i :class="ordenGradoAscendente ? 'fas fa-sort-numeric-down' : 'fas fa-sort-numeric-up'"></i>
                  </button>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grado in gradosOrdenados" :key="grado.id">
                <td>{{ grado.id }}</td>
                <td>{{ grado.nivel === 1 ? 'Primaria' : 'Secundaria' }}</td>
                <td>{{ grado.grado }}º</td>
                <td>
                  <button @click="setEditarGrado(grado)" class="edit-button">Editar</button>
                  <button @click="deleteGrado(grado.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import GradosModel from "@/modelo/GradosModel.mjs";
  
  export default {
    mixins: [GradosModel],
    data() {
      return {
        filtroNivel: "",
        filtroGrado: "",
        ordenGradoAscendente: true, // Control para orden ascendente/descendente
      };
    },
    computed: {
      gradosFiltrados() {
        return this.grados.filter(grado => {
          const cumpleNivel = this.filtroNivel
            ? grado.nivel === parseInt(this.filtroNivel)
            : true;
          const cumpleGrado = this.filtroGrado
            ? grado.grado === parseInt(this.filtroGrado)
            : true;
          return cumpleNivel && cumpleGrado;
        });
      },
      gradosOrdenados() {
        return [...this.gradosFiltrados].sort((a, b) => {
          return this.ordenGradoAscendente ? a.grado - b.grado : b.grado - a.grado;
        });
      }
    },
    methods: {
      ordenarPorGrado() {
        this.ordenGradoAscendente = !this.ordenGradoAscendente;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilo para el botón de ordenar */
  .sort-button {
    background-color: #3498db;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .sort-button i {
    margin-left: 8px;
  }
  
  .sort-button:hover {
    background-color: #2980b9;
  }
  
  /* Más espacio entre elementos */
  .form-field {
    margin-bottom: 20px;
  }
  
  /* Estilo general */
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
  .delete-button {
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
  