<template>
  <div class="listado-tareas">
    <h1>Listado de Tareas</h1>
    <table class="tabla-tareas">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de Entrega</th>
          <th>Calificación</th>
          <th>Entregado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarea, index) in tareas" :key="index">
          <td>{{ tarea.nombre }}</td>
          <td>{{ tarea.fechaEntrega }}</td>
          <td>
            {{ tarea.calificacion !== null ? tarea.calificacion : "N/A" }}
          </td>
          <td
            :class="{
              entregado: tarea.entregado,
              noEntregado: !tarea.entregado,
            }"
          >
            {{ tarea.entregado ? "Sí" : "No" }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="barra-progreso">
      <div class="progreso" :style="{ width: porcentajeEntregado + '%' }"></div>
    </div>
    <p class="texto-progreso">
      Progreso de tareas entregadas: {{ porcentajeEntregado }}%
    </p>
  </div>
</template>

<script>
import TareasPadres from "@/modelo/padres/TareasPadres.mjs";
export default {
  name: "ListadoTareas",
  mixins: [TareasPadres],
  data() {
    return {
      tar: [],
    };
  },
  computed: {
    porcentajeEntregado() {
      const totalTareas = this.tareas.length;
      const tareasEntregadas = this.tareas.filter(
        (tarea) => tarea.entregado
      ).length;
      return Math.round((tareasEntregadas / totalTareas) * 100);
    },
  },
};
</script>

<style scoped>
.listado-tareas {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.tabla-tareas {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f0f0f0;
}

.entregado {
  color: green;
}

.noEntregado {
  color: red;
}

.barra-progreso {
  margin: 20px 0;
  width: 100%;
  height: 25px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progreso {
  height: 100%;
  background-color: #4caf50;
  width: 0; /* Se ajusta dinámicamente con el estilo en línea */
  transition: width 0.5s ease;
}

.texto-progreso {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}
</style>
