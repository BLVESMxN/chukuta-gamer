<template>
    <nav class="navbar">
      <div class="navbar-left">
        <span v-if="userRole === 'guest'">
          <button @click="toggleMenu" class="menu-button">☰</button>
          <span class="title">SISTEMA DE ESTUDIANTES</span>
        </span>
        <span v-if="userRole === 'estudiante'">
          <router-link to="/inicio-estudiante" :class="{ active: isActive('/inicio-estudiante') }" class="nav-link">INICIO</router-link>
          <router-link to="/materias-estudiante" :class="{ active: isActive('/materias-estudiante') }" class="nav-link">MATERIAS</router-link>
        </span>
        <span v-if="userRole === 'docente'">
          <router-link to="/inicio-docente" :class="{ active: isActive('/inicio-docente') }" class="nav-link">INICIO</router-link>
          <router-link to="/materias-docente" :class="{ active: isActive('/materias-docente') }" class="nav-link">MATERIAS</router-link>
        </span>
      </div>
  
      <div class="navbar-right">
        <button v-if="userRole === 'guest'" @click="showLogin = true" class="login-button">
          <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" />
        </button>
        <span v-else>
          <button @click="logout" class="logout-button">Cerrar Sesión</button>
        </span>
      </div>
  
      <!-- Modal de Inicio de Sesión -->
      <div v-if="showLogin" class="login-modal">
        <div class="modal-content">
          <span class="close" @click="showLogin = false">&times;</span>
          <h2 class="modal-title">Iniciar Sesión</h2>
          <div class="modal-body">
            <input type="text" placeholder="Usuario" v-model="username" class="input-field" />
            <input type="password" placeholder="Contraseña" v-model="password" class="input-field" />
            <button @click="login" class="login-button">Ingresar</button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
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
        if (this.username === 'estudiante' && this.password === '1234') {
          this.userRole = 'estudiante';
          this.$router.push('/inicio-estudiante');
        } else if (this.username === 'docente' && this.password === '1234') {
          this.userRole = 'docente';
          this.$router.push('/inicio-docente');
        } else {
          alert('Credenciales incorrectas');
        }
        this.showLogin = false;
      },
      logout() {
        this.userRole = 'guest';
        this.username = '';
        this.password = '';
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la barra de navegación */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007B83;
    color: white;
    padding: 10px 20px;
    border-bottom: 2px solid #004d40;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
    flex-grow: 1; /* Asegura que el contenedor ocupe el espacio disponible */
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .title {
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 10px;
  }
  
  .menu-button, .login-button, .logout-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
  }
  
  .menu-button:hover, .login-button:hover, .logout-button:hover {
    color: #e0f2f1;
  }
  
  .user-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #fff;
    object-fit: cover;
  }
  
  /* Estilos para los enlaces de navegación */
  .navbar-left {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1em;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .nav-link.active, .nav-link:hover {
    background-color: #004d40;
    color: #e0f2f1;
  }
  
  /* Estilos para el modal */
  .login-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    width: 100%;
    max-width: 400px; /* Ajusta el tamaño máximo del modal */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    transform: scale(1);
  }
  
  .modal-content:hover {
    transform: scale(1.05);
  }
  
  .modal-title {
    font-size: 1.5em;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .modal-body {
    display: flex;
    flex-direction: column;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .input-field:focus {
    border-color: #007B83;
    outline: none;
  }
  
  button.login-button {
    background-color: #007B83;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  button.login-button:hover {
    background-color: #004d40;
  }
  
  /* Estilos para la "X" */
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
  }
  
  .close:hover {
    color: #d32f2f;
  }
  </style>
  