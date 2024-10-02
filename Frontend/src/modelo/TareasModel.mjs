import { RequestHandler } from "@/controlador/RequestHandler.mjs"; // Importa el controlador para manejar solicitudes HTTP

export default {
  data() {
    return {
      tareas: [], // Lista de tareas obtenidas desde la API
      requestHandler: new RequestHandler(), // Instancia de RequestHandler para manejar peticiones
      nuevaTarea: {
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        curso: null,
        sesion: null
      }, // Nueva tarea que se agregará
      tareaEditada: null, // Tarea que se está editando
    };
  },
  
  created() {
    this.fetchTareas(); // Al crear el componente, se llama a fetchTareas para obtener las tareas
  },
  
  methods: {
    // Método para obtener la lista de tareas (GET)
    async fetchTareas() {
      try {
        const response = await this.requestHandler.getRequest("/academico/tareas/");
        this.tareas = response.data; // Asigna las tareas obtenidas a la lista
      } catch (error) {
        console.error("Error obteniendo las tareas:", error);
      }
    },
    
    // Método para agregar una nueva tarea (POST)
    async agregarTarea() {
      try {
        const response = await this.requestHandler.postRequest("/academico/tareas/", this.nuevaTarea);
        if (response.status === 201) {
          this.fetchTareas(); // Refresca la lista de tareas
          alert("¡Tarea agregada exitosamente!");
          this.nuevaTarea = { descripcion: "", fecha_inicio: "", fecha_fin: "", curso: null, sesion: null }; // Limpia el formulario
        }
      } catch (error) {
        console.error("Error agregando la tarea:", error);
      }
    },
    
    // Método para eliminar una tarea (DELETE)
    async deleteTarea(id) {
      const confirmation = confirm("¿Confirma eliminar la tarea?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/tareas/${id}`);
          this.fetchTareas(); // Refresca la lista de tareas tras eliminar
          alert("¡Tarea eliminada exitosamente!");
        } catch (error) {
          console.error("Error eliminando la tarea:", error);
        }
      }
    },
    
    // Método para establecer la tarea que se está editando
    setEditarTarea(tarea) {
      this.tareaEditada = { ...tarea }; // Clonar el objeto tarea para evitar cambios directos
    },
    
    // Método para editar la tarea (PUT)
    async editarTarea() {
      if (!this.tareaEditada) return; // Si no hay tarea seleccionada, no hace nada
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/tareas/${this.tareaEditada.id}`, 
          { 
            descripcion: this.tareaEditada.descripcion, 
            fecha_inicio: this.tareaEditada.fecha_inicio, 
            fecha_fin: this.tareaEditada.fecha_fin,
            curso: this.tareaEditada.curso,
            sesion: this.tareaEditada.sesion
          }
        );
        if (response.status === 200) {
          this.fetchTareas(); // Refresca la lista de tareas
          alert("¡Tarea editada exitosamente!");
          this.tareaEditada = null; // Limpia el formulario de edición
        }
      } catch (error) {
        console.error("Error editando la tarea:", error);
      }
    },
    
    // Método para cancelar la edición
    cancelarEdicion() {
      this.tareaEditada = null; // Restablece el estado del formulario de edición
    }
  }
};
