import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import InicioEstudiante from "./views/InicioEstudiante.vue";
import MateriasEstudiante from "./views/MateriasEstudiante.vue";
import InicioDocente from "./views/InicioDocente.vue";
import MateriasDocente from "./views/MateriasDocente.vue";
import PaginaPrincipal from "./views/PaginaPrincipal.vue";
import EstudiantesDocente from "./views/EstudiantesDocente.vue";
import HorariosDocente from "./views/HorariosDocente.vue";
import prueba from "./views/previews/PruebaCrud.vue";
import LoginPrueba from "./views/previews/LoginTest.vue";
import AsignaturasCrud from "./views/AsignaturasCrud.vue";
import GradosCrud from "./views/GradosCrud.vue";
import CrearGrado from "./views/CrearGrado.vue";
import EditarGrado from "./views/EditarGrado.vue";

import AgregarAsignatura from "./views/AgregarAsignatura.vue";
import EditarAsignatura from "./views/EditarAsignatura.vue";

import AgregarEstudiante from "./views/AgregarEstudiante.vue";
import EstudiantesCrud from "./views/EstudiantesCrud.vue";

import { RequestHandler } from "./controlador/RequestHandler.mjs";
import EditarEstudiante from "./views/EditarEstudiante.vue";

// Definir rutas
const routes = [
  { path: "/", component: PaginaPrincipal },
  { path: "/inicio-estudiante", component: InicioEstudiante },
  { path: "/  ", component: MateriasEstudiante },
  { path: "/inicio-docente", component: InicioDocente },
  { path: "/materias-docente", component: MateriasDocente },
  { path: "/horarios-docente", component: HorariosDocente },
  { path: "/estudiantes-docente", component: EstudiantesDocente },
  { path: "/prueba-crud", component: prueba },
  { path: "/Login-Test", component: LoginPrueba },
  { path: "/Asignatura-Crud", component: AsignaturasCrud },
  { path: "/Grados-Crud", component: GradosCrud },
  { path: "/Crear-Grado", component: CrearGrado },
  { path: "/Editar-Grado/:id", component: EditarGrado },
  { path: "/Agregar-Asignatura", component: AgregarAsignatura },
  { path: "/Editar-Asignatura/:id", component: EditarAsignatura },

  { path: "/Estudiantes-Crud", component: EstudiantesCrud },
  { path: "/Agregar-Estudiante", component: AgregarEstudiante },
  { path: "/Editar-Estudiante/:id", component: EditarEstudiante },
];

// Configuración del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crear la aplicación Vue
const app = createApp(App);

// Usar el router en la aplicación
app.use(router);
app.mount("#app");

let handler = new RequestHandler();
console.log(handler);
let res = await handler.checkConnection();
console.log(res);

//res =  await handler.getRequest('api/user/token/');

const payload = {
  email: 'admin@example.com',
  password: 'admin',
}

res = await handler.postRequest('/user/token/', payload)
res = await handler.postRequest('/user/logout/')