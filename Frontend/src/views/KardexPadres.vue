<template>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span class="headline">Reporte Académico del Estudiante</span>
        <v-btn icon @click="imprimir">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
      </v-card-title>
  
      <v-card-subtitle>
        <!-- Datos Personales del Estudiante -->
        <div><strong>Nombre:</strong> {{ estudiante.nombres }} {{ estudiante.apellidos }}</div>
        <div><strong>Grado:</strong> {{ estudiante.grado.nombre }}</div>
        <div><strong>Días Asistidos:</strong> {{ asistencia }}</div>
      </v-card-subtitle>
  
      <v-data-table
        :headers="headers"
        :items="materias"
        class="elevation-1"
      >
        <!-- Personalizando las columnas para parciales y tareas -->
        <template v-slot:item.notas="{ item }">
          <span>{{ item.notas.parcial1 }} / {{ item.notas.parcial2 }} / {{ item.notas.parcial3 }}</span>
        </template>
        <template v-slot:item.tareas="{ item }">
          <span>{{ item.tareas }}</span>
        </template>
      </v-data-table>
  
      <v-card-actions>
        <v-btn color="primary" @click="imprimir">Imprimir / Descargar PDF</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { Estudiante } from "@/modelo/EstudiantesModel.mjs";
  
  export default {
    data() {
      return {
        estudiante: new Estudiante(), // Datos del estudiante
        asistencia: 0, // Cantidad de días asistidos
        materias: [], // Lista de materias
        headers: [
          { text: 'Asignatura', value: 'asignatura' },
          { text: 'Notas de Parciales', value: 'notas' },
          { text: 'Tareas', value: 'tareas' },
        ],
      };
    },
    created() {
      this.fetchEstudiante(); // Obtener los datos del estudiante
    },
    methods: {
      // Función para obtener el estudiante y sus materias
      async fetchEstudiante() {
        try {
          const response = await this.$http.get("/academico/estudiantes/1");
          this.estudiante = Estudiante.fromJson(response.data);
          this.materias = this.estudiante.grado.asignaturas; 
          this.asistencia = response.data.asistencia; 
        } catch (error) {
          console.error("Error al obtener el estudiante:", error);
        }
      },
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
  
  @media print {
    
    v-btn {
      display: none;
    }
  

    .v-card {
      padding: 20px;
      font-size: 14px;
    }
  }
  </style>
  