import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import InicioEstudiante from "./views/Estudiante/InicioEstudiante.vue";
import MateriasEstudiante from "./views/Estudiante/MateriasEstudiante.vue";
import InicioDocente from "./views/Docente/InicioDocente.vue";
import MateriasDocente from "./views/Docente/MateriasDocente.vue";
import PaginaPrincipal from "./views/PaginaPrincipal.vue";
import EstudiantesDocente from "./views/Docente/EstudiantesDocente.vue";
import HorariosDocente from "./views/Docente/HorariosDocente.vue";
import prueba from "./views/previews/PruebaCrud.vue";

//Admin

import GradosAdmin from "./views/admin/GradosAdmin.vue";
import AdministrativoAdmin from "./views/admin/AdministrativoAdmin.vue";
import ColegiosAdmin from "./views/admin/ColegiosAdmin.vue";
import AsignaturasAdmin from "./views/admin/AsignaturasAdmin.vue";
import PeriodosAdmin from "./views/admin/PeriodosAdmin.vue";
import HorariosAdmin from "./views/admin/HorariosAdmin.vue";
import CursosAdmin from "./views/admin/CursosAdmin.vue";
import ProfesoresAdmin from "./views/admin/ProfesoresAdmin.vue";
//padres
import PadresAdmin from "./views/admin/PadresAdmin.vue";
//Estudiantes
import EstudiantesAdmin from "./views/admin/EstudiantesAdmin.vue";
//inscripciones
import InscripcionesAdmin from "./views/admin/InscripcionesAdmin.vue";

import UserManage from "./views/admin/usuario/UserManage.vue";

import StatisticsView from "./views/Estadisticas/StatisticsView.vue";

import AdminLayout from "./views/Layouts/AdminLayout.vue";
import { Session } from "./controlador/Session";
import { sessionPlugin } from "./controlador/SessionPlugin.mjs";

import "@fortawesome/fontawesome-free/css/all.css";
//import { RequestHandler } from "./controlador/RequestHandler.mjs";
import MenuPadres from "./views/padres/MenuPadres.vue";
import EstudiantesPadres from "./views/padres/EstudiantesPadres.vue";
import AsignaturasPadres from "./views/padres/AsignaturasPadres.vue";
import AsistenciaPadres from "./views/padres/AsistenciaPadres.vue";
import KardexPadres from "./views/padres/KardexPadres.vue";
import TareasPadres from "./views/padres/TareasPadres.vue";
import { RequestHandler } from "./controlador/RequestHandler.mjs";
//import { RequestHandler } from "./controlador/RequestHandler.mjs";

// Definir rutas
const routes = [
  { path: "/", component: PaginaPrincipal },
  { path: "/inicio-estudiante", component: InicioEstudiante },
  { path: "/materias-estudiante", component: MateriasEstudiante },
  { path: "/inicio-docente", component: InicioDocente },
  { path: "/materias-docente", component: MateriasDocente },
  { path: "/horarios-docente", component: HorariosDocente },
  { path: "/estudiantes-docente", component: EstudiantesDocente },
  { path: "/editar-usuario", component: UserManage },
  //admin

  // Rutas del admin, utilizando el AdminLayout
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "/grados-admin", component: GradosAdmin },
      { path: "/colegios-admin", component: ColegiosAdmin },
      { path: "/asignaturas-admin", component: AsignaturasAdmin },
      { path: "/periodos-admin", component: PeriodosAdmin },
      { path: "/horarios-admin", component: HorariosAdmin },
      { path: "/profesores-admin", component: ProfesoresAdmin },
      { path: "/cursos-admin", component: CursosAdmin },
      { path: "/administrativo-admin", component: AdministrativoAdmin },
      { path: "/Estadisticas-admin", component: StatisticsView },
      //padres
      { path: "/Padres-Admin", component: PadresAdmin },
      //Estudiantes
      { path: "/Estudiante-Admin", component: EstudiantesAdmin },
      { path: "/Inscripciones-Admin", component: InscripcionesAdmin },
    ],
  },
  //
  { path: "/prueba-crud", component: prueba },
  {
    path: "/MenuPadres",
    name: "MenuPadres",
    component: MenuPadres,
    props: true,
  },
  {
    path: "/EstudiantesPadres/:nombre",
    name: "EstudiantesPadres",
    component: EstudiantesPadres,
    props: true,
  },
  { path: "/AsignaturasPadres", component: AsignaturasPadres },
  { path: "/AsistenciaPadres", component: AsistenciaPadres },
  { path: "/KardexPadres", component: KardexPadres },
  {
    path: "/TareasPadres/:asignaturaId",
    name: "TareasPadres",
    component: TareasPadres,
  },
];

// Configuración del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

Session.getInstance();
const app = createApp(App);

app.use(sessionPlugin);
app.use(router);
app.mount("#app");

// async function runTests() {
//   let handler = new RequestHandler();
//   console.log(handler);

//   let res;
//   let payload;

//   let profesorPassword = 'string'; // Assuming default password

//   // 1. Create an Admin User
//   payload = {
//     email: 'user@example.com',
//     password: 'string',
//     name: 'user',
//   };

//   try {
//     await handler.postRequest('academico/administrativo/', payload);
//     console.log('Admin user created.');
//   } catch (error) {
//     console.log('Admin user already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   // Authenticate as Admin
//   payload = {
//     email: 'user@example.com',
//     password: 'string',
//   };

//   try {
//     res = await handler.postRequest('/user/token/', payload);
//   } catch (error) {
//     console.error('Failed to authenticate as admin.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   // 2. Create a Colegio
//   payload = {
//     nombre: 'Sagrado Cocorolo 2',
//     suscripcion: true,
//   };

//   let colegioId;
//   try {
//     res = await handler.postRequest('/academico/colegios/', payload);
//     colegioId = res.data.id;
//     console.log('Colegio created with ID:', colegioId);
//   } catch (error) {
//     console.log('Colegio already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Try to retrieve existing colegio
//     try {
//       res = await handler.getRequest('/academico/colegios/');
//       const colegios = res.data;
//       const existingColegio = colegios.find((c) => c.nombre === payload.nombre);
//       if (existingColegio) {
//         colegioId = existingColegio.id;
//         console.log('Using existing colegio with ID:', colegioId);
//       } else {
//         console.error('Colegio not found.');
//         return;
//       }
//     } catch (getError) {
//       console.error('Failed to retrieve colegios.');
//       console.error(getError.response ? getError.response.data : getError.message);
//       return;
//     }
//   }

//   // 3. Create a Grado
//   payload = {
//     nivel: 1, // Primaria
//     grado: 3, // 3ro
//   };

//   let gradoId;
//   try {
//     res = await handler.postRequest('/academico/grados/', payload);
//     gradoId = res.data.id;
//     console.log('Grado created with ID:', gradoId);
//   } catch (error) {
//     console.log('Grado already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Try to retrieve existing grado
//     try {
//       res = await handler.getRequest('/academico/grados/');
//       const grados = res.data;
//       const existingGrado = grados.find(
//         (g) => g.nivel === payload.nivel && g.grado === payload.grado
//       );
//       if (existingGrado) {
//         gradoId = existingGrado.id;
//         console.log('Using existing grado with ID:', gradoId);
//       } else {
//         console.error('Grado not found.');
//         return;
//       }
//     } catch (getError) {
//       console.error('Failed to retrieve grados.');
//       console.error(getError.response ? getError.response.data : getError.message);
//       return;
//     }
//   }

//   // 4. Create a Profesor
//   colegioId=1
//   payload = {
//     name: 'Juan Pérez',
//     colegio: colegioId,
//   };

//   let profesorId;
//   let profesorEmail;
//   try {
//     res = await handler.postRequest('/academico/profesores/', payload);
//     profesorId = res.data.id;
//     profesorEmail = res.data.email;
//     console.log('Profesor created with ID:', profesorId);
//   } catch (error) {
//     console.log('Profesor already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Try to retrieve existing profesor
//     try {
//       res = await handler.getRequest('/academico/profesores/');
//       const profesores = res.data;
//       const existingProfesor = profesores.find(
//         (p) => p.name === payload.name && p.colegio === payload.colegio
//       );
//       if (existingProfesor) {
//         profesorId = existingProfesor.id;
//         profesorEmail = existingProfesor.email;
//         console.log('Using existing profesor with ID:', profesorId);
//       } else {
//         console.error('Profesor not found.');
//         return;
//       }
//     } catch (getError) {
//       console.error('Failed to retrieve profesores.');
//       console.error(getError.response ? getError.response.data : getError.message);
//       return;
//     }
//   }

//   // 5. Create an Asignatura
//   payload = {
//     nombre: 'Matemáticas',
//     grado: gradoId,
//     colegio: colegioId,
//   };

//   let asignaturaId;
//   try {
//     res = await handler.postRequest('/academico/asignaturas/', payload);
//     asignaturaId = res.data.id;
//     console.log('Asignatura created with ID:', asignaturaId);
//   } catch (error) {
//     console.log('Asignatura already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Try to retrieve existing asignatura
//     try {
//       res = await handler.getRequest('/academico/asignaturas/');
//       const asignaturas = res.data;
//       const existingAsignatura = asignaturas.find(
//         (a) =>
//           a.nombre === payload.nombre &&
//           a.colegio === payload.colegio &&
//           a.grado === payload.grado
//       );
//       if (existingAsignatura) {
//         asignaturaId = existingAsignatura.id;
//         console.log('Using existing asignatura with ID:', asignaturaId);
//       } else {
//         console.error('Asignatura not found.');
//         return;
//       }
//     } catch (getError) {
//       console.error('Failed to retrieve asignaturas.');
//       console.error(getError.response ? getError.response.data : getError.message);
//       return;
//     }
//   }

//   // 6. Create a Periodo
//   payload = {
//     anio: 2024,
//     trimestre: 1,
//     fecha_inicio: '2024-01-01',
//     fecha_fin: '2024-03-31',
//   };

//   var periodoId;
//   try {
//     res = await handler.postRequest('/academico/periodos/', payload);
//     periodoId = res.data.id;
//     console.log('Periodo created with ID:', periodoId);
//   } catch (error) {
//     console.log('Periodo already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Handle as needed
//   }

//   // 7. Create Horarios
//   payload = {
//     periodo: periodoId,
//     dia: 'LUN', // Lunes
//     inicio: '08:00',
//     fin: '10:00',
//   };

//   let horarioId;
//   try {
//     res = await handler.postRequest('/academico/horarios/', payload);
//     horarioId = res.data.id;
//     console.log('Horario created with ID:', horarioId);
//   } catch (error) {
//     console.log('Horario already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Handle as needed
//   }

//   // 8. Create a Curso
//   payload = {
//     asignatura: asignaturaId,
//     periodo: periodoId,
//     profesor: profesorId,
//     horarios: [horarioId],
//   };

//   let cursoId;
//   try {
//     res = await handler.postRequest('/academico/cursos/', payload);
//     cursoId = res.data.id;
//     console.log('Curso created with ID:', cursoId);
//   } catch (error) {
//     console.log('Curso already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Handle as needed
//   }

//   // 9. Create an Estudiante
//   payload = {
//     name: 'María López',
//     grado: gradoId,
//     colegio: colegioId,
//   };

//   let estudianteId;
//   let estudianteEmail;
//   try {
//     res = await handler.postRequest('/academico/estudiantes/', payload);
//     estudianteId = res.data.id;
//     estudianteEmail = res.data.email;
//     console.log('Estudiante created with ID:', estudianteId);
//   } catch (error) {
//     console.log('Estudiante already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Try to retrieve existing estudiante
//     try {
//       res = await handler.getRequest('/academico/estudiantes/');
//       const estudiantes = res.data;
//       const existingEstudiante = estudiantes.find(
//         (e) => e.name === payload.name && e.colegio === payload.colegio
//       );
//       if (existingEstudiante) {
//         estudianteId = existingEstudiante.id;
//         estudianteEmail = existingEstudiante.email;
//         console.log('Using existing estudiante with ID:', estudianteId);
//       } else {
//         console.error('Estudiante not found.');
//         return;
//       }
//     } catch (getError) {
//       console.error('Failed to retrieve estudiantes.');
//       console.error(getError.response ? getError.response.data : getError.message);
//       return;
//     }
//   }

//   // 10. Enroll the student in the course (Inscripcion)
//   payload = {
//     curso: cursoId,
//     estudiante: estudianteId,
//     promedio: 0,
//   };

//   let inscripcionId;
//   try {
//     res = await handler.postRequest('/academico/inscripciones/', payload);
//     inscripcionId = res.data.id;
//     console.log('Inscripcion created with ID:', inscripcionId);
//   } catch (error) {
//     console.log('Inscripcion already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Handle as needed
//   }

//   // 11. Create a Tarea
//   // Authenticate as the profesor to create a Tarea
//   profesorPassword = profesorEmail
//   try {
//     payload = {
//       email: profesorEmail,
//       password: profesorPassword,
//     };
//     res = await handler.postRequest('/user/token/', payload);
//   } catch (error) {
//     console.error('Failed to authenticate as profesor.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   payload = {
//     descripcion: 'Primera tarea de matemáticas',
//     fecha_inicio: '2024-02-01T08:00:00Z',
//     fecha_fin: '2024-02-15T23:59:59Z',
//     curso: cursoId,
//   };

//   let tareaId;
//   try {
//     res = await handler.postRequest('/academico/tareas/', payload);
//     tareaId = res.data.id;
//     console.log('Tarea created with ID:', tareaId);
//   } catch (error) {
//     console.log('Tarea already exists or an error occurred.');
//     console.error(error.response ? error.response.data : error.message);
//     // Handle as needed
//   }

//   // 12. Submit an Entrega for the Tarea
//   // Authenticate as the student to submit an Entrega
//   try {
//     payload = {
//       email: estudianteEmail,
//       password: estudianteEmail,
//     };
//     res = await handler.postRequest('/user/token/', payload);

//   } catch (error) {
//     console.error('Failed to authenticate as estudiante.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   // Get the Revision ID for the student and tarea
//   try {
//     res = await handler.getRequest(`/academico/revisiones/?tarea=${tareaId}`);
//     const revision = res.data.find(
//       (rev) => rev.estudiante === estudianteId && rev.tarea === tareaId
//     );
//     if (!revision) {
//       console.error('Revision not found.');
//       return;
//     }
//     const revisionId = revision.id;

//     payload = {
//       revision: revisionId,
//       comentario: 'Aquí está mi tarea completada.',
//     };
//     res = await handler.postRequest('/academico/entregas/', payload);
//     console.log('Entrega submitted with ID:', res.data.id);
//   } catch (error) {
//     console.error('Failed to submit entrega.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   // 13. Record Asistencia (Attendance)
//   // Authenticate back as the profesor to record attendance
//   profesorPassword = profesorEmail
//   try {
//     payload = {
//       email: profesorEmail,
//       password: profesorPassword,
//     };
//     res = await handler.postRequest('/user/token/', payload);
//   } catch (error) {
//     console.error('Failed to authenticate as profesor.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   payload = {
//     fecha: '2024-02-01',
//     estado: 'ASI', // Asistio
//     inscripcion: inscripcionId,
//   };

//   try {
//     res = await handler.postRequest('/academico/asistencias/', payload);
//     console.log('Asistencia recorded with ID:', res.data.id);
//   } catch (error) {
//     console.log('Failed to record asistencia.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   // 14. Update the Colegio
//   // Authenticate back as the admin

//   try {
//     payload = {
//       email:'user@example.com',
//       password: 'string',
//     };
//     res = await handler.postRequest('/user/token/', payload);
//   } catch (error) {
//     console.error('Failed to authenticate as profesor.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   payload = {
//     nombre: 'Sagrado Corazón Renovado' + Math.random(),
//     suscripcion: false,
//   };

//   try {
//     res = await handler.putRequest(`/academico/colegios/${colegioId}/`, payload);
//     console.log('Colegio updated.');
//   } catch (error) {
//     console.log('Failed to update colegio.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   // 15. Delete the Tarea
//   // Authenticate as the profesor

//   profesorPassword = profesorEmail
//   try {
//     payload = {
//       email: profesorEmail,
//       password: profesorPassword,
//     };
//     res = await handler.postRequest('/user/token/', payload);
//   } catch (error) {
//     console.error('Failed to authenticate as profesor.');
//     console.error(error.response ? error.response.data : error.message);
//     return;
//   }

//   try {
//     res = await handler.deleteRequest(`/academico/tareas/${tareaId}/`);
//     console.log('Tarea deleted.');
//   } catch (error) {
//     console.log('Failed to delete tarea.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   try {
//     res = await handler.getRequest('/academico/cursos/');
//     console.log('Cursos retrieved:', res.data);
//   } catch (error) {
//     console.log('Failed to retrieve cursos.');
//     console.error(error.response ? error.response.data : error.message);
//   }

//   console.log('Tests completed successfully.');
// }

// // Call the runTests function
// runTests().catch((error) => {
//   console.error('An unexpected error occurred during testing:', error);
// });

//var profesor1 = {
//"name": "Juan Perez",
//"colegio": 1
//}

//var user1 = {
//"email": "user@example.com",
//"password": "string"
//}

//let handler = new RequestHandler()
//handler.postRequest('/user/token/', user1)
//handler.postRequest('/academico/profesores/', profesor1)

/*
var admin = new RequestHandler()
admin.postRequest('/user/token/',{
  email: 'pedro@pruebas.com',
  password: '123'
})

/*admin.postRequest('/academico/administrativo/',{
  name: 'Pedro',
  email:'pedro@pruebas.com',
  password:'123'
})*/

//admin.getRequest('/user/me/',)

//var padre = new RequestHandler();

/*
padre
  .postRequest("user/token/", {
    email: "prueba@po.com",
    password: "prueba@po.com",
  })
  .then(() => {
    // Una vez logueado, obten los datos del usuario
    padre
      .getRequest("user/me/")
      .then((response) => {
        var pk = response.data.pk; // Guarda el pk en la variable
        console.log("El pk del usuario es:", pk); // Imprime el pk en la consola
      })
      .catch((error) => {
        console.error("Error obteniendo los datos del usuario:", error);
      });
  })
  .catch((error) => {
    console.error("Error durante el login:", error);
  });*/

var padre = new RequestHandler();
padre.postRequest("user/token/", {
  email: "ionit@pe.com",
  password: "ionit@pe.com",
});

padre.getRequest("academico/asistencias/");
