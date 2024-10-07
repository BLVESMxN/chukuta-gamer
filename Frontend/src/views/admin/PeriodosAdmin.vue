<template>
  <div>
    <div id="app">
      <header id="header">
        <h1>GESTIÓN DE PERIODOS</h1>
      </header>

      <!-- Formulario de Filtros -->
      <div class="filter-container">
        <h2>Filtrar Periodos</h2>

        <!-- Filtro por año -->
        <div class="form-field">
          <label for="anioFilter">Filtrar por Año</label>
          <select v-model="filtroAnio" class="input-field">
            <option value="">Todos</option>
            <option v-for="anio in aniosDisponibles" :key="anio" :value="anio">{{ anio }}</option>
          </select>
        </div>

        <!-- Filtro por trimestre -->
        <div class="form-field">
          <label for="trimestreFilter">Filtrar por Trimestre</label>
          <select v-model="filtroTrimestre" class="input-field">
            <option value="">Todos</option>
            <option value="1">1º Trimestre</option>
            <option value="2">2º Trimestre</option>
            <option value="3">3º Trimestre</option>
          </select>
        </div>

        <!-- Filtro por rango de fechas -->
        <div class="form-field">
          <label for="fechaInicioFilter">Filtrar por Fecha de Inicio</label>
          <input type="date" v-model="filtroFechaInicio" class="input-field" />
        </div>
        <div class="form-field">
          <label for="fechaFinFilter">Filtrar por Fecha de Fin</label>
          <input type="date" v-model="filtroFechaFin" class="input-field" />
        </div>
      </div>

      <!-- Formulario para agregar nuevo periodo -->
      <div class="form-container">
        <h2>Agregar Periodo (Trimestres calculados automáticamente)</h2>

        <div class="form-field">
          <label for="anio">Año</label>
          <select v-model="nuevoPeriodo.anio" class="input-field">
            <option v-for="anio in aniosDisponibles" :key="anio" :value="anio">{{ anio }}</option>
          </select>
        </div>

        <div class="form-field">
          <label for="fecha_inicio">Fecha de Inicio del 1er Trimestre</label>
          <input type="date" v-model="nuevoPeriodo.fecha_inicio" class="input-field" />
        </div>

        <button @click="calcularTrimestres" class="add-button">Agregar Trimestres</button>
      </div>

      <!-- Tabla para mostrar periodos -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Año
                <button @click="ordenarPorAnio" class="sort-button">
                  Ordenar {{ ordenAnioAscendente ? 'Ascendente' : 'Descendente' }}
                  <i :class="ordenAnioAscendente ? 'fas fa-sort-numeric-down' : 'fas fa-sort-numeric-up'"></i>
                </button>
              </th>
              <th>
                Trimestre
                <button @click="ordenarPorTrimestre" class="sort-button">
                  Ordenar {{ ordenTrimestreAscendente ? 'Ascendente' : 'Descendente' }}
                  <i :class="ordenTrimestreAscendente ? 'fas fa-sort-numeric-down' : 'fas fa-sort-numeric-up'"></i>
                </button>
              </th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="periodo in periodosOrdenados" :key="periodo.id">
              <td>{{ periodo.id }}</td>
              <td>{{ periodo.anio }}</td>
              <td>{{ periodo.trimestre }}º Trimestre</td>
              <td>{{ periodo.fecha_inicio }}</td>
              <td>{{ periodo.fecha_fin }}</td>
              <td>
                <button @click="setEditarPeriodo(periodo)" class="edit-button">Editar</button>
                <button @click="deletePeriodo(periodo.id)" class="delete-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PeriodosModel from "@/modelo/PeriodosModel.mjs";
import { addDays, format, parseISO } from "date-fns"; // Para calcular las fechas de los trimestres

export default {
  mixins: [PeriodosModel],
  data() {
    return {
      ordenAnioAscendente: true, // Estado para controlar el orden del año
      ordenTrimestreAscendente: true, // Estado para controlar el orden del trimestre
    };
  },
  computed: {
    // Filtrar periodos por año, trimestre y rango de fechas
    periodosFiltrados() {
      return this.periodos.filter((periodo) => {
        const cumpleAnio = this.filtroAnio ? periodo.anio === parseInt(this.filtroAnio) : true;
        const cumpleTrimestre = this.filtroTrimestre ? periodo.trimestre === parseInt(this.filtroTrimestre) : true;
        const cumpleFechaInicio = this.filtroFechaInicio
          ? new Date(periodo.fecha_inicio) >= new Date(this.filtroFechaInicio)
          : true;
        const cumpleFechaFin = this.filtroFechaFin
          ? new Date(periodo.fecha_fin) <= new Date(this.filtroFechaFin)
          : true;

        return cumpleAnio && cumpleTrimestre && cumpleFechaInicio && cumpleFechaFin;
      });
    },
    // Ordenar periodos por año y trimestre
    periodosOrdenados() {
      return [...this.periodosFiltrados]
        .sort((a, b) => (this.ordenAnioAscendente ? a.anio - b.anio : b.anio - a.anio))
        .sort((a, b) => (this.ordenTrimestreAscendente ? a.trimestre - b.trimestre : b.trimestre - a.trimestre));
    },
    // Años disponibles
    aniosDisponibles() {
      return Array.from({ length: 11 }, (_, i) => 2024 + i);
    },
  },
  methods: {
    // Alternar entre orden ascendente y descendente por año
    ordenarPorAnio() {
      this.ordenAnioAscendente = !this.ordenAnioAscendente;
    },

    // Alternar entre orden ascendente y descendente por trimestre
    ordenarPorTrimestre() {
      this.ordenTrimestreAscendente = !this.ordenTrimestreAscendente;
    },

    // Calcular y agregar los tres trimestres en base a la fecha de inicio del primer trimestre
    calcularTrimestres() {
      if (!this.nuevoPeriodo.fecha_inicio) {
        alert("Por favor, selecciona la fecha de inicio del 1er trimestre.");
        return;
      }

      const primerTrimestreInicio = parseISO(this.nuevoPeriodo.fecha_inicio);

      // Crear los trimestres
      const trimestres = [
        { trimestre: 1, fecha_inicio: format(primerTrimestreInicio, "yyyy-MM-dd"), fecha_fin: format(addDays(primerTrimestreInicio, 89), "yyyy-MM-dd") },
        { trimestre: 2, fecha_inicio: format(addDays(primerTrimestreInicio, 90), "yyyy-MM-dd"), fecha_fin: format(addDays(primerTrimestreInicio, 179), "yyyy-MM-dd") },
        { trimestre: 3, fecha_inicio: format(addDays(primerTrimestreInicio, 180), "yyyy-MM-dd"), fecha_fin: format(addDays(primerTrimestreInicio, 269), "yyyy-MM-dd") },
      ];

      // Enviar cada trimestre al modelo
      trimestres.forEach((trimestre) => {
        this.nuevoPeriodo.trimestre = trimestre.trimestre;
        this.nuevoPeriodo.fecha_inicio = trimestre.fecha_inicio;
        this.nuevoPeriodo.fecha_fin = trimestre.fecha_fin;
        this.agregarPeriodo();
      });
    },
  },
};
</script>

<style scoped>
/* Misma consistencia de estilo */
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

.form-field {
  margin-bottom: 20px;
}

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

.add-button,
.save-button,
.cancel-button,
.edit-button,
.delete-button,
.sort-button {
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

.sort-button {
  background-color: #3498db;
  color: white;
}

.sort-button i {
  margin-left: 8px;
}

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

.sort-button:hover {
  background-color: #2980b9;
}

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
