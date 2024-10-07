import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      periodos: [], // Lista de periodos
      requestHandler: new RequestHandler(),
      nuevoPeriodo: {
        anio: 2024,
        trimestre: 1,
        fecha_inicio: "",
        fecha_fin: "",
      },
      periodoEditado: null, // Periodo en edición
      filtroAnio: "", // Filtro por año
      filtroTrimestre: "", // Filtro por trimestre
      filtroFechaInicio: "", // Filtro por fecha de inicio
      filtroFechaFin: "" // Filtro por fecha de fin
    };
  },
  created() {
    this.fetchPeriodos();
  },
  methods: {
    // Obtener la lista de periodos
    async fetchPeriodos() {
      try {
        const response = await this.requestHandler.getRequest("/academico/periodos/");
        this.periodos = response.data;
      } catch (error) {
        console.error("Error obteniendo periodos:", error);
      }
    },

    // Agregar un nuevo periodo
    async agregarPeriodo() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/periodos/",
          this.nuevoPeriodo
        );
        if (response.status === 201) {
          this.fetchPeriodos();
          alert("¡Periodo agregado exitosamente!");
          this.nuevoPeriodo = { anio: 2024, trimestre: 1, fecha_inicio: "", fecha_fin: "" }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el periodo:", error);
      }
    },

    // Eliminar un periodo
    async deletePeriodo(id) {
      const confirmation = confirm("¿Confirma eliminar el periodo?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/periodos/${id}`);
          this.fetchPeriodos();
          alert("¡Periodo eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el periodo:", error);
        }
      }
    },

    // Establecer el periodo en edición
    setEditarPeriodo(periodo) {
      this.periodoEditado = { ...periodo };
    },

    // Editar un periodo
    async editarPeriodo() {
      if (!this.periodoEditado) return;
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/periodos/${this.periodoEditado.id}/`,
          {
            anio: this.periodoEditado.anio,
            trimestre: this.periodoEditado.trimestre,
            fecha_inicio: this.periodoEditado.fecha_inicio,
            fecha_fin: this.periodoEditado.fecha_fin,
          }
        );
        if (response.status === 200) {
          this.fetchPeriodos();
          alert("¡Periodo editado exitosamente!");
          this.periodoEditado = null;
        }
      } catch (error) {
        console.error("Error editando el periodo:", error);
      }
    },

    // Cancelar edición
    cancelarEdicion() {
      this.periodoEditado = null;
    }
  }
};
