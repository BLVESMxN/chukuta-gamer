<template>
    <div>
      <div id="app">
        <header id="header">
          <h1>GESTIÓN DE HORARIOS</h1>
        </header>
  
        <!-- Formulario de Filtros -->
        <div class="filter-container">
          <h2>Filtrar Horarios</h2>
  
          <!-- Filtro por periodo -->
          <div class="form-field">
            <label for="periodoFilter">Filtrar por Periodo</label>
            <select v-model="filtroPeriodo" class="input-field">
              <option value="">Todos</option>
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <!-- Filtro por día -->
          <div class="form-field">
            <label for="diaFilter">Filtrar por Día</label>
            <select v-model="filtroDia" class="input-field">
              <option value="">Todos</option>
              <option value="LUN">Lunes</option>
              <option value="MAR">Martes</option>
              <option value="MIE">Miércoles</option>
              <option value="JUE">Jueves</option>
              <option value="VIE">Viernes</option>
            </select>
          </div>
        </div>
  
        <!-- Formulario para agregar nuevo horario -->
        <div class="form-container">
          <h2>Agregar Horario</h2>
  
          <!-- Selector de periodo -->
          <div class="form-field">
            <label for="periodo">Periodo</label>
            <select v-model="nuevoHorario.periodo" class="input-field">
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <!-- Selector de día -->
          <div class="form-field">
            <label for="dia">Día</label>
            <select v-model="nuevoHorario.dia" class="input-field">
              <option value="LUN">Lunes</option>
              <option value="MAR">Martes</option>
              <option value="MIE">Miércoles</option>
              <option value="JUE">Jueves</option>
              <option value="VIE">Viernes</option>
            </select>
          </div>
  
          <!-- Selector de horas -->
          <div class="form-field">
            <label for="inicio">Hora de Inicio</label>
            <select v-model="nuevoHorario.inicio" class="input-field" @change="autoCompletarFin">
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="fin">Hora de Fin</label>
            <select v-model="nuevoHorario.fin" class="input-field" @change="autoCompletarInicio">
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
            </select>
          </div>
  
          <button @click="agregarHorario" class="add-button">Agregar Horario</button>
        </div>
  
        <!-- Formulario para editar horario -->
        <div v-if="horarioEditado" class="form-container">
          <h2>Editar Horario</h2>
  
          <div class="form-field">
            <label for="periodo">Periodo</label>
            <select v-model="horarioEditado.periodo" class="input-field">
              <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">{{ periodo.anio }} - {{ periodo.trimestre }}º Trimestre</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="dia">Día</label>
            <select v-model="horarioEditado.dia" class="input-field">
              <option value="LUN">Lunes</option>
              <option value="MAR">Martes</option>
              <option value="MIE">Miércoles</option>
              <option value="JUE">Jueves</option>
              <option value="VIE">Viernes</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="inicio">Hora de Inicio</label>
            <select v-model="horarioEditado.inicio" class="input-field" @change="autoCompletarFinEditar">
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
            </select>
          </div>
  
          <div class="form-field">
            <label for="fin">Hora de Fin</label>
            <select v-model="horarioEditado.fin" class="input-field" @change="autoCompletarInicioEditar">
              <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
            </select>
          </div>
  
          <button @click="editarHorario" class="save-button">Guardar Cambios</button>
          <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
        </div>
  
        <!-- Tabla para mostrar horarios -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Periodo</th>
                <th>
                  Día
                  <button @click="ordenarPorDia" class="sort-button">
                    Ordenar {{ ordenDiaAscendente ? 'Ascendente' : 'Descendente' }}
                    <i :class="ordenDiaAscendente ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up'"></i>
                  </button>
                </th>
                <th>
                  Hora de Inicio
                  <button @click="ordenarPorHoraInicio" class="sort-button">
                    Ordenar {{ ordenHoraAscendente ? 'Ascendente' : 'Descendente' }}
                    <i :class="ordenHoraAscendente ? 'fas fa-sort-numeric-down' : 'fas fa-sort-numeric-up'"></i>
                  </button>
                </th>
                <th>Hora de Fin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="horario in horariosOrdenados" :key="horario.id">
                <td>{{ horario.id }}</td>
                <td>{{ obtenerDescripcionPeriodo(horario.periodo) }}</td>
                <td>{{ obtenerDiaCompleto(horario.dia) }}</td>
                <td>{{ horario.inicio }}</td>
                <td>{{ horario.fin }}</td>
                <td>
                  <button @click="setEditarHorario(horario)" class="edit-button">Editar</button>
                  <button @click="deleteHorario(horario.id)" class="delete-button">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HorariosModel from "@/modelo/HorariosModel.mjs";
  
  export default {
    mixins: [HorariosModel],
    data() {
      return {
        ordenDiaAscendente: true, // Estado para controlar el orden del día
        ordenHoraAscendente: true, // Estado para controlar el orden de la hora de inicio
      };
    },
    computed: {
      // Filtrar horarios por periodo y día
      horariosFiltrados() {
        return this.horarios.filter(horario => {
          const cumplePeriodo = this.filtroPeriodo ? horario.periodo === parseInt(this.filtroPeriodo) : true;
          const cumpleDia = this.filtroDia ? horario.dia === this.filtroDia : true;
          return cumplePeriodo && cumpleDia;
        });
      },
      // Ordenar horarios por día y hora de inicio
      horariosOrdenados() {
        return [...this.horariosFiltrados].sort((a, b) => {
          // Ordenar por día (alfabéticamente)
          if (this.ordenDiaAscendente) {
            return a.dia.localeCompare(b.dia);
          } else {
            return b.dia.localeCompare(a.dia);
          }
        }).sort((a, b) => {
          // Ordenar por hora de inicio
          if (this.ordenHoraAscendente) {
            return a.inicio.localeCompare(b.inicio);
          } else {
            return b.inicio.localeCompare(a.inicio);
          }
        });
      },
      // Horas disponibles desde 7:15 hasta 21:00 con incrementos de 45 minutos
      horasDisponibles() {
        return this.generarHoras("07:15", "21:00", 45);
      }
    },
    methods: {
      // Generar horas disponibles desde una hora de inicio hasta una hora de fin con un intervalo en minutos
      generarHoras(horaInicio, horaFin, intervalo) {
        const horas = [];
        let [horasInicio, minutosInicio] = horaInicio.split(":").map(Number);
        let [horasFin, minutosFin] = horaFin.split(":").map(Number);
        
        // Convertir la hora a minutos
        let inicioEnMinutos = horasInicio * 60 + minutosInicio;
        const finEnMinutos = horasFin * 60 + minutosFin;
        
        while (inicioEnMinutos <= finEnMinutos) {
          const horasActual = Math.floor(inicioEnMinutos / 60);
          const minutosActual = inicioEnMinutos % 60;
          horas.push(`${String(horasActual).padStart(2, "0")}:${String(minutosActual).padStart(2, "0")}`);
          inicioEnMinutos += intervalo;
        }
        return horas;
      },
  
      // Autocompletar la hora de fin basada en la hora de inicio seleccionada
      autoCompletarFin() {
        const indexInicio = this.horasDisponibles.indexOf(this.nuevoHorario.inicio);
        if (indexInicio !== -1 && indexInicio < this.horasDisponibles.length - 1) {
          this.nuevoHorario.fin = this.horasDisponibles[indexInicio + 1];
        }
      },
  
      // Autocompletar la hora de inicio basada en la hora de fin seleccionada
      autoCompletarInicio() {
        const indexFin = this.horasDisponibles.indexOf(this.nuevoHorario.fin);
        if (indexFin > 0) {
          this.nuevoHorario.inicio = this.horasDisponibles[indexFin - 1];
        }
      },
  
      // Autocompletar fin al editar horario
      autoCompletarFinEditar() {
        const indexInicio = this.horasDisponibles.indexOf(this.horarioEditado.inicio);
        if (indexInicio !== -1 && indexInicio < this.horasDisponibles.length - 1) {
          this.horarioEditado.fin = this.horasDisponibles[indexInicio + 1];
        }
      },
  
      // Autocompletar inicio al editar horario
      autoCompletarInicioEditar() {
        const indexFin = this.horasDisponibles.indexOf(this.horarioEditado.fin);
        if (indexFin > 0) {
          this.horarioEditado.inicio = this.horasDisponibles[indexFin - 1];
        }
      },
  
      // Alternar entre orden ascendente y descendente por día
      ordenarPorDia() {
        this.ordenDiaAscendente = !this.ordenDiaAscendente;
      },
  
      // Alternar entre orden ascendente y descendente por hora de inicio
      ordenarPorHoraInicio() {
        this.ordenHoraAscendente = !this.ordenHoraAscendente;
      },
  
      // Obtener la descripción del periodo basado en el ID
      obtenerDescripcionPeriodo(idPeriodo) {
        const periodo = this.periodos.find(p => p.id === idPeriodo);
        return periodo ? `${periodo.anio} - ${periodo.trimestre}º Trimestre` : 'N/A';
      },
  
      // Obtener el día completo basado en las iniciales
      obtenerDiaCompleto(diaIniciales) {
        const dias = {
          LUN: "Lunes",
          MAR: "Martes",
          MIE: "Miércoles",
          JUE: "Jueves",
          VIE: "Viernes"
        };
        return dias[diaIniciales] || "N/A";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Diseño consistente con ColegiosAdmin.vue y GradosAdmin.vue */
  
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
  
  /* Formulario y contenedor centrado */
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
  
  /* Campo de formulario con espacio adecuado */
  .form-field {
    margin-bottom: 20px;
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
  
  .sort-button:hover {
    background-color: #2980b9;
  }
  
  /* Tabla bien proporcionada */
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
  