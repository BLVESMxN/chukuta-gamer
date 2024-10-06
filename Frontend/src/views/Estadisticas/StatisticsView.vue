<template>
    <div class="contenedor-estadisticas">
      <header id="header">
        <h1>Estadísticas del Sistema Académico</h1>
      </header>
  
      <!-- Filtros -->
      <div class="filtros">
        <select v-model="anioSeleccionado">
          <option value="">Todos los años</option>
          <option v-for="anio in anios" :key="anio" :value="anio">{{ anio }}</option>
        </select>
  
        <select v-model="colegioSeleccionado">
          <option value="">Todos los colegios</option>
          <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
        </select>
  
        <button @click="actualizarEstadisticas">Aplicar Filtros</button>
      </div>
  
      <!-- Cargando -->
      <div v-if="cargando" class="loading">
        <div class="spinner"></div>
        <p>Cargando datos...</p>
      </div>
  
      <!-- Sección de Visualización -->
      <div class="seccion-visualizacion" v-if="!cargando">
        <div class="contenedor-grafico" v-if="cursosPorPeriodo.length">
          <h2>Cursos por Periodo</h2>
          <canvas id="graficoCursos"></canvas>
        </div>
  
        <div class="contenedor-grafico" v-if="asignaturasPorGrado.length">
          <h2>Asignaturas por Grado</h2>
          <canvas id="graficoAsignaturas"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ModeloEstadisticas from "@/modelo/Estadisticas/StatisticsModel.mjs";
  import { Chart, registerables } from "chart.js";
  
  // Registrar los componentes de Chart.js
  Chart.register(...registerables);
  
  export default {
    data() {
      return {
        cursosPorPeriodo: [],
        asignaturasPorGrado: [],
        anios: [],
        colegios: [],
        anioSeleccionado: "",
        colegioSeleccionado: "",
        modeloEstadisticas: new ModeloEstadisticas(),
        graficoCursos: null,
        graficoAsignaturas: null,
        cargando: true, // Estado de carga
      };
    },
    async mounted() {
      await this.cargarDatosIniciales();
      await this.actualizarEstadisticas();
    },
    methods: {
      async cargarDatosIniciales() {
        this.cargando = true;
        try {
          this.anios = await this.modeloEstadisticas.obtenerAnios();
          this.colegios = await this.modeloEstadisticas.obtenerColegios();
          console.log("Años cargados:", this.anios);  // Debug
          console.log("Colegios cargados:", this.colegios);  // Debug
        } catch (error) {
          console.error("Error al cargar datos iniciales:", error);
        } finally {
          this.cargando = false; // Desactivar cargando al finalizar
        }
      },
      async actualizarEstadisticas() {
        this.cargando = true;
        try {
          const asignaturas = await this.modeloEstadisticas.obtenerAsignaturasPorAnioYColegio(
            this.anioSeleccionado,
            this.colegioSeleccionado
          );
          const cursos = await this.modeloEstadisticas.obtenerCursosPorAnioYColegio(
            this.anioSeleccionado,
            this.colegioSeleccionado
          );
  
          // Debug para mostrar datos obtenidos
          console.log("Datos de asignaturas:", asignaturas);
          console.log("Datos de cursos:", cursos);
  
          // Actualizar los datos de las gráficas
          this.cursosPorPeriodo = cursos;
          this.asignaturasPorGrado = asignaturas;
  
          // Renderizar los gráficos después de cargar los datos
          this.$nextTick(() => {
            this.renderizarGraficos();
          });
        } catch (error) {
          console.error("Error al actualizar estadísticas:", error);
        } finally {
          this.cargando = false; // Desactivar cargando
        }
      },
      renderizarGraficos() {
        this.renderizarGraficoCursos();
        this.renderizarGraficoAsignaturas();
      },
      renderizarGraficoCursos() {
        const canvasCursos = document.getElementById("graficoCursos");
        if (this.graficoCursos) this.graficoCursos.destroy(); // Destruir gráfico existente si ya hay uno
        if (canvasCursos) {
          const ctx = canvasCursos.getContext("2d");
          const etiquetas = this.cursosPorPeriodo.map(item => `Periodo ${item.periodo}`);
          const datos = this.cursosPorPeriodo.map(item => item.totalCursos);
  
          this.graficoCursos = new Chart(ctx, {
            type: "bar",
            data: {
              labels: etiquetas,
              datasets: [{
                label: "Cursos por Trimestre",
                data: datos,
                backgroundColor: "#3498db",
              }]
            }
          });
        }
      },
      renderizarGraficoAsignaturas() {
        const canvasAsignaturas = document.getElementById("graficoAsignaturas");
        if (this.graficoAsignaturas) this.graficoAsignaturas.destroy(); // Destruir gráfico existente si ya hay uno
        if (canvasAsignaturas) {
          const ctx = canvasAsignaturas.getContext("2d");
          const etiquetas = this.asignaturasPorGrado.map(item => `Grado ${item.grado}`);
          const datos = this.asignaturasPorGrado.map(item => item.totalAsignaturas);
  
          this.graficoAsignaturas = new Chart(ctx, {
            type: "pie",
            data: {
              labels: etiquetas,
              datasets: [{
                label: "Asignaturas por Grado",
                data: datos,
                backgroundColor: ["#e74c3c", "#3498db", "#2ecc71"],
              }]
            }
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí va el CSS previamente proporcionado */
  </style>
  