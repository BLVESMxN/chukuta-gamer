<template>
    <div>
      <div class="banner">
        <h1>Reporte Académico del Estudiante</h1>
        <p>Consulta los detalles académicos y las materias del estudiante.</p>
      </div>
      
      <h2>Materias y Notas</h2>
      <div class="lista-materias">
        <div 
          class="materia" 
          v-for="(materia, index) in paginatedMaterias" 
          :key="index"
        >
          <div class="informacion-materia">
            <p class="nombre-materia"><strong>Materia:</strong> {{ materia.asignatura }}</p>
            <p><strong>Notas:</strong> {{ materia.notas.parcial1 }} / {{ materia.notas.parcial2 }} / {{ materia.notas.parcial3 }}</p>
            <p><strong>Tareas:</strong> {{ materia.tareas }}</p>
          </div>
        </div>
      </div>
      <div class="controles">
        <v-card-actions>
            <v-btn color="primary" @click="imprimir" class="print-button">Imprimir / Descargar PDF</v-btn>
            </v-card-actions>
        <button @click="paginaAnterior" :disabled="paginaActual === 0">Anterior</button>
        <button @click="paginaSiguiente" :disabled="paginaActual >= maxPaginas - 1">Siguiente</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReporteAcademico',
    data() {
      return {
        estudiante:{
            nombres:'Juan',
            apellidos: 'Pérez',
            grados: 'Secundariaa',
        },
        materias: [
          {
            asignatura: 'Matemáticas',
            notas: { parcial1: 80, parcial2: 85, parcial3: 90 },
            tareas: 'Completado',
          },
          {
            asignatura: 'Ciencias',
            notas: { parcial1: 75, parcial2: 80, parcial3: 85 },
            tareas: 'Completado',
          },
          {
            asignatura: 'Historia',
            notas: { parcial1: 90, parcial2: 92, parcial3: 88 },
            tareas: 'Pendiente',
          },
          {
            asignatura: 'Inglés',
            notas: { parcial1: 78, parcial2: 85, parcial3: 80 },
            tareas: 'Completado',
          },
          {
            asignatura: 'Educación Física',
            notas: { parcial1: 95, parcial2: 92, parcial3: 96 },
            tareas: 'Completado',
          }
        ],
        paginaActual: 0,
        materiasPorPagina: 3,
      };
    },
    computed: {
      paginatedMaterias() {
        const inicio = this.paginaActual * this.materiasPorPagina;
        const fin = inicio + this.materiasPorPagina;
        return this.materias.slice(inicio, fin);
      },
      maxPaginas() {
        return Math.ceil(this.materias.length / this.materiasPorPagina);
      },
    },
    methods: {
      paginaSiguiente() {
        if (this.paginaActual < this.maxPaginas - 1) {
          this.paginaActual++;
        }
      },
      paginaAnterior() {
        if (this.paginaActual > 0) {
          this.paginaActual--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .banner {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .lista-materias {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .materia {
    background-color: #f1f1f1;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .informacion-materia {
    font-family: 'Roboto', sans-serif;
  }
  
  .nombre-materia {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .controles {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 10px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:not(:disabled):hover {
    background-color: #45a049;
  }
  @media print {
  .print-button {
    display: none;
  }

  .v-card {
    padding: 20px;
    font-size: 14px;
  }
}
.print-button:hover {
  background-color: #004d40;
  transform: scale(1.05);
}
.print-button {
  background-color: #4CAF50;;
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
  </style>
  