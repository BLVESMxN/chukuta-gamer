from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EstudianteViewSet, AsignaturaViewSet, AsistenciaViewSet,
    GradoViewSet, PeriodoViewSet, AsignaturaPeriodoViewSet,
    AsignaturaEstudianteViewSet, EstadoAsistenciaViewSet,
    TareaViewSet, EstadoTareaViewSet, LicenciaViewSet
)

router = DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'asignaturas', AsignaturaViewSet)
router.register(r'asistencias', AsistenciaViewSet)
router.register(r'grados', GradoViewSet)
router.register(r'periodos', PeriodoViewSet)
router.register(r'asignaturas-periodos', AsignaturaPeriodoViewSet)
router.register(r'asignaturas-estudiantes', AsignaturaEstudianteViewSet)
router.register(r'estados-asistencia', EstadoAsistenciaViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'estados-tareas', EstadoTareaViewSet)
router.register(r'licencias', LicenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
