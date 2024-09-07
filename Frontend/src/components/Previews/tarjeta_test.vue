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
  import service from './authService'; // Importa el servicio de autenticación
  
  export default {
    data() {
      return {
        showLogin: false,
        username: '',
        password: '',
        userRole: 'guest', // guest, estudiante, docente
      };
    },
    methods: {
      isActive(route) {
        return this.$route.path === route;
      },
      login() {
        const result = authService.login(this.username, this.password);
        if (result.route) {
          this.userRole = result.role;
          this.$router.push(result.route);
        } else {
          alert(result.error);
        }
        this.showLogin = false;
      },
      logout() {
        const result = authService.logout();
        this.userRole = result.role;
        this.username = '';
        this.password = '';
        this.$router.push(result.route);
      }
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
  