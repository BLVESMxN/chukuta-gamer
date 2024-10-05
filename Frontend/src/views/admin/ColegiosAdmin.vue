<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE COLEGIOS</h1>
        </header>
  
        <!-- Formulario de Filtros -->
        <div class="filter-container">
          <h2>Filtrar Colegios</h2>
  
          <!-- Filtro por administrador -->
          <div class="form-field">
            <label for="adminFilter">Filtrar por Administrador</label>
            <select v-model="filtroAdmin" class="input-field">
              <option value="">Todos</option>
              <option v-for="admin in administradores" :key="admin.pk" :value="admin.pk">{{ admin.name }}</option>
            </select>
          </div>
  
          <!-- Buscador de colegios -->
          <div class="form-field">
            <label for="buscadorColegios">Buscar por Nombre</label>
            <input v-model="busquedaColegio" placeholder="Buscar colegio..." class="input-field" />
          </div>
        </div>
  
        <!-- Formulario para agregar nuevo colegio -->
        <div class="form-container">
          <h2>Agregar Colegio</h2>
  
          <div class="form-field">
            <label for="nombre">Nombre</label>
            <input v-model="nuevoColegio.nombre" placeholder="Nombre del colegio" class="input-field" />
          </div>
  
          <div class="form-field">
            <label for="admin">Administrador</label>
            <select v-model="nuevoColegio.admin" class="input-field">
              <option v-for="admin in administradores" :key="admin.pk" :value="admin.pk">{{ admin.name }}</option>
            </select>
          </div>
  
          <!-- Suscripción con estilo mejorado (interruptor de palanca) -->
          <div class="form-field">
            <label for="suscripcion" class="switch-label">Suscripción</label>
            <div class="switch-container">
              <label class="switch">
                <input v-model="nuevoColegio.suscripcion" type="checkbox" />
                <span class="slider"></span>
              </label>
              <span class="switch-text">
                {{ nuevoColegio.suscripcion ? 'Activa' : 'Inactiva' }}
              </span>
            </div>
          </div>
  
          <div class="form-field">
            <label for="extension">Extensión</label>
            <input v-model="nuevoColegio.extension" placeholder="Extensión del colegio" class="input-field" />
          </div>
  
          <button @click="agregarColegio" class="add-button">Agregar Colegio</button>
        </div>
  
        <!-- Formulario para editar colegio -->
        <div v-if="colegioEditado" class="form-container">
          <h2>Editar Colegio</h2>
  
          <div class="form-field">
            <label for="nombre">Nombre</label>
            <input v-model="colegioEditado.nombre" placeholder="Nombre del colegio" class="input-field" />
          </div>
  
          <div class="form-field">
            <label for="admin">Administrador</label>
            <select v-model="colegioEditado.admin" class="input-field">
              <option v-for="admin in administradores" :key="admin.pk" :value="admin.pk">{{ admin.name }}</option>
            </select>
          </div>
  
          <!-- Suscripción con estilo mejorado (interruptor de palanca) para la edición -->
          <div class="form-field">
            <label for="suscripcion" class="switch-label">Suscripción</label>
            <div class="switch-container">
              <label class="switch">
                <input v-model="colegioEditado.suscripcion" type="checkbox" />
                <span class="slider"></span>
              </label>
              <span class="switch-text">
                {{ colegioEditado.suscripcion ? 'Activa' : 'Inactiva' }}
              </span>
            </div>
          </div>
  
          <div class="form-field">
            <label for="extension">Extensión</label>
            <input v-model="colegioEditado.extension" placeholder="Extensión del colegio" class="input-field" />
          </div>
  
          <button @click="editarColegio" class="save-button">Guardar Cambios</button>
          <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar colegios -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Nombre
                  <button @click="ordenarPorNombre" class="sort-button">
                    Ordenar 
                    <i :class="ordenNombreAscendente ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up'"></i>
                  </button>
                </th>
                <th>Administrador</th>
                <th>Suscripción</th>
                <th>Extensión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="colegio in colegiosFiltrados" :key="colegio.id">
                <td>{{ colegio.id }}</td>
                <td>{{ colegio.nombre }}</td>
                <td>{{ obtenerNombreAdministrador(colegio.admin) }}</td>
                <td>{{ colegio.suscripcion ? 'Activa' : 'Inactiva' }}</td>
                <td>{{ colegio.extension }}</td>
                <td>
                  <button @click="setEditarColegio(colegio)" class="edit-button">Editar</button>
                  <button @click="deleteColegio(colegio.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ColegiosModel from "@/modelo/ColegiosModel.mjs";
  import { RequestHandler } from "@/controlador/RequestHandler.mjs";
  
  export default {
    mixins: [ColegiosModel],
    data() {
      return {
        filtroAdmin: "", // Filtro por administrador
        busquedaColegio: "", // Búsqueda por nombre
        ordenNombreAscendente: true, // Control para ordenamiento
        administradores: [], // Lista de administradores existentes
        requestHandler: new RequestHandler(), // Request handler para hacer solicitudes
      };
    },
    computed: {
      colegiosFiltrados() {
        return this.colegios
          .filter(colegio => {
            // Filtro por administrador
            const cumpleAdmin = this.filtroAdmin ? colegio.admin === parseInt(this.filtroAdmin) : true;
            // Filtro por búsqueda de nombre
            const cumpleBusqueda = colegio.nombre.toLowerCase().includes(this.busquedaColegio.toLowerCase());
            return cumpleAdmin && cumpleBusqueda;
          })
          .sort((a, b) => {
            // Ordenar por nombre de colegio
            if (this.ordenNombreAscendente) {
              return a.nombre.localeCompare(b.nombre);
            } else {
              return b.nombre.localeCompare(a.nombre);
            }
          });
      }
    },
    created() {
      this.fetchAdministradores(); // Cargar la lista de administradores al montar el componente
    },
    methods: {
      async fetchAdministradores() {
        try {
          const response = await this.requestHandler.getRequest("/user/list/");
          // Filtrar solo los usuarios que sean administradores
          this.administradores = response.data.filter(user => user.role_field === "Administrador");
        } catch (error) {
          console.error("Error obteniendo la lista de administradores:", error);
        }
      },
  
      obtenerNombreAdministrador(adminId) {
        const admin = this.administradores.find(ad => ad.pk === adminId);
        return admin ? admin.name : "N/A";
      },
  
      ordenarPorNombre() {
        // Alternar el orden de los colegios
        this.ordenNombreAscendente = !this.ordenNombreAscendente;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilo para el interruptor de palanca (switch) */
  .switch-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #004d40;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  /* Estilo para el texto del switch */
  .switch-text {
    margin-left: 10px;
    font-size: 16px;
    color: #333;
  }
  
  /* Label del switch */
  .switch-label {
    margin-right: 10px;
    font-size: 16px;
    color: #004d40;
  }
  
  /* Más espacio entre elementos */
  .form-field {
    margin-bottom: 20px;
  }
  
  /* Botón de ordenar */
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
  
  /* Centrado del formulario y ajustes de tamaño */
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
  
  /* Tabla sin fondos internos y bien proporcionada */
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
  