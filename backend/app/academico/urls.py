# urls.py

from django.urls import include, path
from rest_framework import routers
from .views import (
    GradoViewSet, ColegioViewSet, ProfesorViewSet, PadreViewSet,
    EstudianteViewSet, AsignaturaViewSet, PeriodoViewSet,
    HorarioViewSet, CursoViewSet, InscripcionViewSet, TareaViewSet,
    RevisionViewSet, EntregaViewSet, AsistenciaViewSet
)

router = routers.DefaultRouter()
router.register(r'grados', GradoViewSet)
router.register(r'colegios', ColegioViewSet)
router.register(r'profesores', ProfesorViewSet)
router.register(r'padres', PadreViewSet)
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'asignaturas', AsignaturaViewSet)
router.register(r'periodos', PeriodoViewSet)
router.register(r'horarios', HorarioViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'inscripciones', InscripcionViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'revisiones', RevisionViewSet)
router.register(r'entregas', EntregaViewSet)
router.register(r'asistencias', AsistenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
