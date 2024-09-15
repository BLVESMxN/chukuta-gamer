import { createApp } from 'vue';
import App from './App.vue'; // ✔️ Importa App.vue correctamente

import { createRouter, createWebHistory } from 'vue-router';

// Importar Vuetify y sus estilos
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos de Vuetify
import '@mdi/font/css/materialdesignicons.css'; // (Opcional) Importa iconos
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// Importa componentes de Vuetify (en caso de necesitar temas o configuraciones específicas)
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

// Importar tus vistas y rutas
import InicioEstudiante from './views/InicioEstudiante.vue';
import MateriasEstudiante from './views/MateriasEstudiante.vue';
import InicioDocente from './views/InicioDocente.vue';
import MateriasDocente from './views/MateriasDocente.vue';
import PaginaPrincipal from './views/PaginaPrincipal.vue';
import EstudiantesDocente from './views/EstudiantesDocente.vue';
import HorariosDocente from './views/HorariosDocente.vue';
import Prueba from './views/Prueba.vue';

import { RequestHandler } from './controlador/RequestHandler.mjs';

// Definir rutas
const routes = [
  { path: '/', component: PaginaPrincipal },
  { path: '/inicio-estudiante', component: InicioEstudiante },
  { path: '/materias-estudiante', component: MateriasEstudiante },
  { path: '/inicio-docente', component: InicioDocente },
  { path: '/materias-docente', component: MateriasDocente },
  { path: '/horarios-docente', component: HorariosDocente },
  { path: '/estudiantes-docente', component: EstudiantesDocente },
  { path: '/probando', component: Prueba }
];

// Configuración del router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Crear la aplicación Vue

const app = createApp(App);

// Usar el router y Vuetify en la aplicación
app.use(router);
app.use(vuetify);

// Montar la aplicación en el DOM
app.mount('#app');

// Utilizar el RequestHandler
let handler = new RequestHandler();
console.log(handler);
let res = await handler.checkConnection();
console.log(res);
