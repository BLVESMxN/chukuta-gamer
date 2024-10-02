# views.py

from rest_framework import viewsets, views, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import IsAuthenticatedAndRelatedToColegio, IsAuthenticatedAndRelatedToCurso
from .models import (
    Grado, Colegio,Administrativo, Profesor, Padre, Estudiante,
    Asignatura, Periodo, Horario, Curso, Inscripcion,
    Tarea, Revision, Entrega, Asistencia
)
from .serializers import (
    GradoSerializer, ColegioSerializer, ProfesorSerializer,
    PadreSerializer, EstudianteSerializer, AsignaturaSerializer,
    PeriodoSerializer, HorarioSerializer, CursoSerializer,
    InscripcionSerializer, TareaSerializer, RevisionSerializer,
    EntregaSerializer, AsistenciaSerializer, AdministrativoSerializer
)
from django.contrib.auth import get_user_model

User = get_user_model()

class GradoViewSet(viewsets.ModelViewSet):
    queryset = Grado.objects.all()
    serializer_class = GradoSerializer
    #permission_classes = [IsAuthenticated]

class ColegioViewSet(viewsets.ModelViewSet):
    queryset = Colegio.objects.all()
    serializer_class = ColegioSerializer
    #permission_classes = [IsAuthenticated]


class AdministradorViewSet(generics.CreateAPIView):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoSerializer

    

class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user_colegio = self.get_user_colegio(self.request.user)
        return Profesor.objects.filter(colegio=user_colegio)

    def get_user_colegio(self, user):
        if hasattr(user, 'colegio'):
            return user.colegio
        elif hasattr(user, 'profesor'):
            return user.profesor.colegio
        elif hasattr(user, 'padre'):
            return user.padre.colegio
        elif hasattr(user, 'estudiante'):
            return user.estudiante.colegio
        elif hasattr(user, 'institucion'):
            return user.institucion
        return None

class PadreViewSet(viewsets.ModelViewSet):
    queryset = Padre.objects.all()
    serializer_class = PadreSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user_colegio = self.get_user_colegio(self.request.user)
        return Padre.objects.filter(colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'estudiante'):
            return Estudiante.objects.filter(pk=user.pk)
        elif hasattr(user, 'padre'):
            return Estudiante.objects.filter(user_padre=user) | Estudiante.objects.filter(user_madre=user)
        else:
            user_colegio = self.get_user_colegio(user)
            return Estudiante.objects.filter(colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)

class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user_colegio = self.get_user_colegio(self.request.user)
        return Asignatura.objects.filter(colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)

class PeriodoViewSet(viewsets.ModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer
    #permission_classes = [IsAuthenticated]

class HorarioViewSet(viewsets.ModelViewSet):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
    #permission_classes = [IsAuthenticated]

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profesor'):
            return Curso.objects.filter(profesor=user)
        else:
            user_colegio = self.get_user_colegio(user)
            return Curso.objects.filter(asignatura__colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'profesor') and serializer.validated_data.get('profesor') == user:
            serializer.save()
        else:
            raise PermissionDenied("No tiene permiso para crear este curso.")

class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user_colegio = self.get_user_colegio(self.request.user)
        return Inscripcion.objects.filter(curso__asignatura__colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToCurso]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profesor'):
            return Tarea.objects.filter(curso__profesor=user)
        elif hasattr(user, 'estudiante'):
            return Tarea.objects.filter(curso__estudiantes=user)
        else:
            return Tarea.objects.none()

class RevisionViewSet(viewsets.ModelViewSet):
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profesor'):
            return Revision.objects.filter(tarea__curso__profesor=user)
        elif hasattr(user, 'estudiante'):
            return Revision.objects.filter(estudiante=user)
        else:
            return Revision.objects.none()

class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profesor'):
            return Entrega.objects.filter(revision__tarea__curso__profesor=user)
        elif hasattr(user, 'estudiante'):
            return Entrega.objects.filter(revision__estudiante=user)
        else:
            return Entrega.objects.none()

class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer
    #permission_classes = [IsAuthenticated, IsAuthenticatedAndRelatedToColegio]

    def get_queryset(self):
        user_colegio = self.get_user_colegio(self.request.user)
        return Asistencia.objects.filter(inscripcion__curso__asignatura__colegio=user_colegio)

    def get_user_colegio(self, user):
        return ProfesorViewSet.get_user_colegio(self, user)
