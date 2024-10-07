import { RequestHandler } from "@/controlador/RequestHandler.mjs";

export default {
  data() {
    return {
      horarios: [], // Lista de horarios
      periodos: [], // Lista de periodos disponibles
      requestHandler: new RequestHandler(),
      nuevoHorario: {
        periodo: 0, // ID del periodo
        dia: "LUN", // Día (iniciales)
        inicio: "", // Hora de inicio
        fin: "", // Hora de fin
      },
      horarioEditado: null, // Horario en edición
      filtroPeriodo: "", // Filtro por periodo
      filtroDia: "", // Filtro por día
    };
  },
  created() {
    this.fetchHorarios();
    this.fetchPeriodos(); // Obtener lista de periodos al crear el componente
  },
  methods: {
    // Método para obtener la lista de horarios
    async fetchHorarios() {
      try {
        const response = await this.requestHandler.getRequest("/academico/horarios/");
        this.horarios = response.data;
      } catch (error) {
        console.error("Error obteniendo horarios:", error);
      }
    },

    // Método para obtener la lista de periodos
    async fetchPeriodos() {
      try {
        const response = await this.requestHandler.getRequest("/academico/periodos/");
        this.periodos = response.data;
      } catch (error) {
        console.error("Error obteniendo periodos:", error);
      }
    },

    // Método para agregar un nuevo horario
    async agregarHorario() {
      try {
        const response = await this.requestHandler.postRequest(
          "/academico/horarios/",
          this.nuevoHorario
        );
        if (response.status === 201) {
          this.fetchHorarios();
          alert("¡Horario agregado exitosamente!");
          this.nuevoHorario = { periodo: 0, dia: "LUN", inicio: "", fin: "" }; // Limpiar el formulario
        }
      } catch (error) {
        console.error("Error agregando el horario:", error);
      }
    },

    // Método para eliminar un horario
    async deleteHorario(id) {
      const confirmation = confirm("¿Confirma eliminar el horario?");
      if (confirmation) {
        try {
          await this.requestHandler.deleteRequest(`/academico/horarios/${id}`);
          this.fetchHorarios();
          alert("¡Horario eliminado exitosamente!");
        } catch (error) {
          console.error("Error eliminando el horario:", error);
        }
      }
    },

    // Método para establecer el horario en edición
    setEditarHorario(horario) {
      this.horarioEditado = { ...horario };
    },

    // Método para editar un horario
    async editarHorario() {
      if (!this.horarioEditado) return;
      try {
        const response = await this.requestHandler.putRequest(
          `/academico/horarios/${this.horarioEditado.id}/`,
          {
            periodo: this.horarioEditado.periodo,
            dia: this.horarioEditado.dia,
            inicio: this.horarioEditado.inicio,
            fin: this.horarioEditado.fin,
          }
        );
        if (response.status === 200) {
          this.fetchHorarios();
          alert("¡Horario editado exitosamente!");
          this.horarioEditado = null;
        }
      } catch (error) {
        console.error("Error editando el horario:", error);
      }
    },

    // Método para cancelar la edición
    cancelarEdicion() {
      this.horarioEditado = null;
    },
  },
};
