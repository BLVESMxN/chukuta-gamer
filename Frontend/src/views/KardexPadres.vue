<template>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span class="headline">Reporte Académico del Estudiante</span>
        <v-btn icon @click="imprimir">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
      </v-card-title>
  
      <!-- Contenedor con el ID para la impresión -->
      <div id="kardex-content">
        <v-card-subtitle>
          <!-- Datos Personales del Estudiante -->
          <div><strong>Nombre:</strong> {{ estudiante.nombres }} {{ estudiante.apellidos }}</div>
          <div><strong>Grado:</strong> {{ estudiante.grado }}</div>
          <div><strong>Días Asistidos:</strong> {{ asistencia }}</div>
        </v-card-subtitle>
  
        <!-- Tabla de materias -->
        <v-data-table :headers="headers" :items="materias" class="elevation-1">
          <!-- Notas de parciales -->
          <template v-slot:item="{ item }">
            <span>{{ item.notas.parcial1 }} / {{ item.notas.parcial2 }} / {{ item.notas.parcial3 }}</span>
          </template>
          <!-- Tareas -->
          <template v-slot:[`item.tareas`]="{ item }">
            <span>{{ item.tareas }}</span>
          </template>
        </v-data-table>
      </div>
  
      <v-card-actions>
        <v-btn color="primary" @click="imprimir">Imprimir / Descargar PDF</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Datos de prueba del estudiante
        estudiante: {
          nombres: 'Juan',
          apellidos: 'Pérez',
          grado: 'Primero de Secundaria',
        },
        asistencia: 180, // Días asistidos de prueba
        // Materias de prueba
        materias: [
          {
            asignatura: 'Matemáticas',
            notas: {
              parcial1: 80,
              parcial2: 85,
              parcial3: 90,
            },
            tareas: 'Completado',
          },
          {
            asignatura: 'Ciencias',
            notas: {
              parcial1: 75,
              parcial2: 80,
              parcial3: 85,
            },
            tareas: 'Completado',
          }
        ],
        // Encabezados de la tabla
        headers: [
          { text: 'Asignatura', value: 'asignatura' },
          { text: 'Notas de Parciales', value: 'notas' },
          { text: 'Tareas', value: 'tareas' },
        ],
      };
    },
    methods: {
      // Función para imprimir o guardar como PDF
      imprimir() {
        const contenido = document.getElementById('kardex-content').innerHTML;
        const originalContent = document.body.innerHTML;
  
        document.body.innerHTML = contenido;
        window.print();
        document.body.innerHTML = originalContent;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .headline {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  /* Estilos para la impresión */
  @media print {
    v-btn {
      display: none; /* Ocultar el botón de impresión cuando se imprime */
    }
  
    .v-card {
      padding: 20px;
      font-size: 14px;
    }
  }
  </style>
  