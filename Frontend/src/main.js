import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import InicioEstudiante from './views/InicioEstudiante.vue';
import MateriasEstudiante from './views/MateriasEstudiante.vue';
import InicioDocente from './views/InicioDocente.vue';
import MateriasDocente from './views/MateriasDocente.vue';
import PaginaPrincipal from './views/PaginaPrincipal.vue';

// Definir rutas
const routes = [
  { path: '/', component: PaginaPrincipal },
  { path: '/inicio-estudiante', component: InicioEstudiante },
  { path: '/materias-estudiante', component: MateriasEstudiante },
  { path: '/inicio-docente', component: InicioDocente },
  { path: '/materias-docente', component: MateriasDocente }
];

// Configuración del router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Crear la aplicación Vue
const app = createApp(App);

// Usar el router en la aplicación
app.use(router);
app.mount('#app');
