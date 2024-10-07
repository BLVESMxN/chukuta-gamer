// PadresModel.mjs
import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      padres: [],          // Lista de padres
      colegios: [],        // Lista de colegios
      requestHandler: new RequestHandler(),
      nuevoPadre: {
        name: "",          // Nombre del padre
        colegio: 0         // ID del colegio
      },
      padreEditado: null,   // Padre que se está editando
      filtroColegio: "",    // Filtro por colegio
      busquedaNombre: "",   // Buscador por nombre
      ordenNombreAscendente: true,  // Ordenación ascendente por nombre
    };
  },
  created() {
    this.fetchPadres();       // Obtener la lista de padres al crear el componente
    this.fetchColegios();     // Obtener la lista de colegios
  },
  methods: {
    // Obtener la lista de padres
    async fetchPadres() {
      try {
        const response = await this.requestHandler.getRequest("/academico/padres/");
        this.padres = response.data;
      } catch (error) {
        console.error("Error obteniendo padres:", error);
      }
    },

    // Obtener la lista de colegios
    async fetchColegios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/colegios/");
        this.colegios = response.data;
      } catch (error) {
        console.error("Error obteniendo colegios:", error);
      }
    },

    // Agregar un nuevo padre (sin email, el backend lo genera)
    async agregarPadre() {
      try {
        const response = await this.requestHandler.postRequest("/academico/padres/", {
          name: this.nuevoPadre.name,
          colegio: this.nuevoPadre.colegio
        });
        if (response.status === 201) {
          this.fetchPadres();
          alert("¡Padre agregado exitosamente!");
          this.nuevoPadre = { name: "", colegio: 0 }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el padre:", error);
      }
    },

    // Eliminar un padre
    async deletePadre(id) {
      const confirmation = confirm("¿Confirma eliminar el padre?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/padres/${id}`);
          this.fetchPadres();
          alert("¡Padre eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el padre:", error);
        }
      }
    },

    // Establecer el padre que se está editando
    setEditarPadre(padre) {
      this.padreEditado = { ...padre }; // Clonar para evitar cambios directos
    },

    // Editar un padre (incluyendo el email generado automáticamente)
    async editarPadre() {
      if (!this.padreEditado) return;
      try {
        const response = await this.requestHandler.putRequest(`/academico/padres/${this.padreEditado.id}/`, {
          name: this.padreEditado.name,
          colegio: this.padreEditado.colegio
        });
        if (response.status === 200) {
          this.fetchPadres();
          alert("¡Padre editado exitosamente!");
          this.padreEditado = null;
        }
      } catch (error) {
        console.error("Error editando el padre:", error);
      }
    },

    // Cancelar la edición
    cancelarEdicion() {
      this.padreEditado = null;
    }
  },
  computed: {
    // Filtrar y buscar padres
    padresFiltrados() {
      return this.padres.filter(padre => {
        const cumpleColegio = this.filtroColegio ? padre.colegio === parseInt(this.filtroColegio) : true;
        const cumpleNombre = this.busquedaNombre ? padre.name.toLowerCase().includes(this.busquedaNombre.toLowerCase()) : true;
        return cumpleColegio && cumpleNombre;
      });
    },
    // Ordenar padres por nombre
    padresOrdenados() {
      return [...this.padresFiltrados].sort((a, b) => {
        if (this.ordenNombreAscendente) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
  }
};
