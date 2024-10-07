<template>
    <div>
      <header id="header">
        <h1>Gestión de Padres</h1>
      </header>
  
      <!-- Filtro por Colegio -->
      <div class="filter-container">
        <h2>Filtrar Padres</h2>
  
        <div class="form-field">
          <label for="colegio">Seleccione un Colegio</label>
          <select v-model="filtroColegio" @change="filtrarPadresPorColegio" class="input-field">
            <option value="">Todos los Colegios</option>
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>
  
        <!-- Buscador por nombre -->
        <div class="form-field">
          <label for="buscarNombre">Buscar por Nombre</label>
          <input v-model="busquedaNombre" placeholder="Buscar por nombre..." class="input-field" />
        </div>
      </div>
  
      <!-- Formulario para agregar nuevo padre -->
      <div class="form-container">
        <h2>{{ editando ? 'Editar Padre' : 'Agregar Padre' }}</h2>
        <div class="form-field">
          <label for="name">Nombre del Padre</label>
          <input v-model="padre.name" placeholder="Nombre del Padre" class="input-field" />
        </div>
  
        <div class="form-field">
          <label for="colegio">Colegio</label>
          <select v-model="padre.colegio" class="input-field">
            <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
          </select>
        </div>
  
        <button @click="editando ? actualizarPadre() : agregarPadre()" class="add-button">
          {{ editando ? 'Guardar Cambios' : 'Agregar Padre' }}
        </button>
  
        <p v-if="errorMensaje" class="error">{{ errorMensaje }}</p>
      </div>
  
      <!-- Tabla para mostrar padres -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Colegio</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="padre in padresFiltrados" :key="padre.id">
              <td>{{ padre.id }}</td>
              <td>{{ padre.name }}</td>
              <td>{{ obtenerNombreColegio(padre.colegio) }}</td>
              <td>{{ padre.email }}</td>
              <td>
                <button @click="setEditarPadre(padre)" class="edit-button">Editar</button>
                <button @click="eliminarPadre(padre.id)" class="delete-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import PadresModel from "@/modelo/PadresModel.mjs"; // Importar el modelo de padres
  
  export default {
    data() {
      return {
        padres: [], // Lista de todos los padres
        colegios: [], // Lista de colegios
        filtroColegio: "", // Filtro de colegio
        busquedaNombre: "", // Filtro de búsqueda por nombre
        padre: {
          name: "",
          colegio: null,
        },
        errorMensaje: "",
        editando: false,
        padreId: null,
        modeloPadres: new PadresModel(), // Instancia del modelo
      };
    },
    computed: {
      padresFiltrados() {
        let padresFiltrados = this.padres;
  
        // Filtrar por colegio
        if (this.filtroColegio) {
          padresFiltrados = padresFiltrados.filter(padre => padre.colegio === parseInt(this.filtroColegio));
        }
  
        // Filtrar por nombre
        if (this.busquedaNombre) {
          padresFiltrados = padresFiltrados.filter(padre => 
            padre.name.toLowerCase().includes(this.busquedaNombre.toLowerCase())
          );
        }
  
        return padresFiltrados;
      },
    },
    async mounted() {
      await this.cargarDatos();
    },
    methods: {
      async cargarDatos() {
        try {
          this.padres = await this.modeloPadres.obtenerPadres();
          this.colegios = await this.modeloPadres.obtenerColegios();
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      },
  
      async agregarPadre() {
        try {
          await this.modeloPadres.crearPadre(this.padre.name, this.padre.colegio);
          await this.cargarDatos();
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al agregar padre:", error);
        }
      },
  
      async actualizarPadre() {
        try {
          await this.modeloPadres.actualizarPadre(this.padreId, this.padre.name, this.padre.colegio);
          await this.cargarDatos();
          this.limpiarFormulario();
          this.editando = false;
        } catch (error) {
          console.error("Error al actualizar padre:", error);
        }
      },
  
      async eliminarPadre(id) {
        const confirmar = confirm("¿Estás seguro de eliminar este padre?");
        if (confirmar) {
          try {
            await this.modeloPadres.eliminarPadre(id);
            await this.cargarDatos();
          } catch (error) {
            console.error("Error al eliminar padre:", error);
          }
        }
      },
  
      setEditarPadre(padre) {
        this.padreId = padre.id;
        this.padre = { ...padre };
        this.editando = true;
      },
  
      obtenerNombreColegio(colegioId) {
        const colegio = this.colegios.find((col) => col.id === colegioId);
        return colegio ? colegio.nombre : "N/A";
      },
  
      limpiarFormulario() {
        this.padre = {
          name: "",
          colegio: null,
        };
        this.padreId = null;
        this.errorMensaje = "";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos generales y específicos para el diseño */
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

  .filter-container,
  .form-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    margin: 20px auto;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .form-field {
    margin-bottom: 25px;
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
  
  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #333;
    color: white;
  }
</style>
  