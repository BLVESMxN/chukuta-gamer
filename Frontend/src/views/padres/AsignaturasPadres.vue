<template>
  <div class="calendario-tareas">
    <h1>Calendario de Asistencias y Faltas</h1>
    <vue-cal
      :events="eventosTareas"
      default-view="month"
      time="24"
      class="calendario"
      :highlight="fechasDestacadas"
    />
    <div class="resumen">
      <p>Total de Asistencias: {{ totalAsistencias }}</p>
      <p>Total de Faltas: {{ totalFaltas }}</p>
    </div>
    <router-link to="/EstudiantesPadres/:nombre"
      >Volver a la lista de estudiantes</router-link
    >
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import AsistenciaPadres from "@/modelo/padres/AsistenciaPadres.mjs"; // Importar el modelo de asistencias

export default {
  name: "CalendarioAsistencias",
  components: {
    VueCal,
  },
  data() {
    return {
      asistencias: [], // Lista de asistencias obtenidas
      modeloAsistencia: new AsistenciaPadres(), // Instancia del modelo de asistencias
    };
  },
  async created() {
    await this.obtenerAsistencias();
  },
  computed: {
    // Mapeo de eventos para el calendario
    eventosTareas() {
      return this.asistencias.map((asistencia) => ({
        start: asistencia.fecha,
        end: asistencia.fecha,
        title: asistencia.titulo,
        color: asistencia.color,
      }));
    },
    totalAsistencias() {
      return this.asistencias.filter(
        (asistencia) => asistencia.tipo === "asistencia"
      ).length;
    },
    totalFaltas() {
      return this.asistencias.filter(
        (asistencia) => asistencia.tipo === "falta"
      ).length;
    },
    fechasDestacadas() {
      return this.asistencias.map((asistencia) => asistencia.fecha);
    },
  },
  methods: {
    async obtenerAsistencias() {
      try {
        this.asistencias = await this.modeloAsistencia.obtenerAsistencias();
      } catch (error) {
        console.error("Error al obtener las asistencias:", error);
      }
    },
  },
};
</script>

<style scoped>
.calendario-tareas {
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.calendario {
  margin: 20px 0;
  width: 80%;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Estilo para las fechas destacadas */
.vuecal__cell.vuecal__cell--highlighted {
  background-color: #ea00ff !important;
  color: #ff0000;
}

.resumen {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
}

.router-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
