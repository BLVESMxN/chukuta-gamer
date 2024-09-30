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
          v-for="(materia, index) in materias" 
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
          <v-btn color="primary" @click="descargarPDF" class="print-button">Descargar PDF</v-btn>
          <v-btn color="primary" @click="descargarExcel" class="print-button">Descargar Excel</v-btn>
        </v-card-actions>
      </div>
    </div>
  </template>
  
  <script>
  // Importamos las bibliotecas necesarias
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import * as XLSX from "xlsx";
  
  export default {
    name: 'ReporteAcademico',
    data() {
      return {
        estudiante: {
          nombres: 'Juan',
          apellidos: 'Pérez',
          grados: 'Secundaria',
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
          },
        ],
      };
    },
    methods: {
      // Función para descargar el PDF
      descargarPDF() {
        const doc = new jsPDF();
  
        // Título del PDF
        doc.setFontSize(18);
        doc.text('Reporte Académico del Estudiante', 20, 20);
  
        // Información del estudiante
        doc.setFontSize(12);
        doc.text(`Nombre: ${this.estudiante.nombres} ${this.estudiante.apellidos}`, 20, 30);
        doc.text(`Grado: ${this.estudiante.grados}`, 20, 40);
  
        // Datos de materias en tabla
        const columnas = ['Materia', 'Parcial 1', 'Parcial 2', 'Parcial 3', 'Tareas'];
        const filas = this.materias.map(materia => [
          materia.asignatura,
          materia.notas.parcial1,
          materia.notas.parcial2,
          materia.notas.parcial3,
          materia.tareas
        ]);
  
        doc.autoTable({
          startY: 50,
          head: [columnas],
          body: filas,
        });
  
        // Guardar el PDF
        doc.save('reporte_academico.pdf');
      },
  
      // Función para descargar el Excel
      descargarExcel() {
        const wb = XLSX.utils.book_new();
        const ws_data = [
          ['Materia', 'Parcial 1', 'Parcial 2', 'Parcial 3', 'Tareas'],
          ...this.materias.map(materia => [
            materia.asignatura,
            materia.notas.parcial1,
            materia.notas.parcial2,
            materia.notas.parcial3,
            materia.tareas
          ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, 'Reporte Académico');
  
        // Guardar el archivo Excel
        XLSX.writeFile(wb, 'reporte_academico.xlsx');
      }
    }
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
    flex-wrap: wrap; /* Permite que los elementos se distribuyan en varias filas */
    gap: 20px;
    justify-content: space-around; /* Alinea los elementos de manera uniforme */
  }
  
  .materia {
    background-color: #6ccf5f;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 30%; /* Cada materia ocupará el 30% del ancho disponible */
    text-align: center;
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
    background-color: #4CAF50;
    color: white;
    border-radius: 8px;
    padding: 10px 15px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  </style>
  