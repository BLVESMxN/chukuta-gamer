<template>
    <div>
      <h1>Vista previa de las materias</h1>
      <div class="card-grid">
        <SubjectCard 
          v-for="(subject, index) in subjects" 
          :key="index" 
          :subjectName="subject.name" 
          :studentCount="subject.students" 
        />
      </div>
    </div>
  </template>
  
  <script>
  import SubjectCard from "@/components/tarjeta_materias.vue";
  
  export default {
    name: "ScreenPreview",
    components: {
      SubjectCard
    },
    data() {
      return {
        subjects: [
          { name: "Matemáticas", students: 30 },
          { name: "Historia", students: 25 },
          { name: "Ciencias", students: 20 },
          { name: "Física", students: 15 },
          { name: "Química", students: 18 },
          { name: "Geografía", students: 12 }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-gap: 16px;
    justify-items: center;
  }
  h1 {
    text-align: center;
    margin-bottom: 24px;
  }
  </style>
  