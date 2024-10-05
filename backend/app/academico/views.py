# views.py

from rest_framework import viewsets, views, generics, serializers, exceptions
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import RelatedToColegio, RelatedToCurso, ValidSuscription
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

from core.models import Role, UserManager
from core.permissions import HasRole, IsLogged

User = get_user_model()

class GradoViewSet(viewsets.ModelViewSet):
    queryset = Grado.objects.all()
    serializer_class = GradoSerializer
    #permission_classes = [IsAuthenticated]

class ColegioViewSet(viewsets.ModelViewSet):
    queryset = Colegio.objects.all()
    serializer_class = ColegioSerializer
    permission_classes = [IsLogged, HasRole([Role.get_admin()])]

    def get_permissions(self):
        if self.action == 'list':
            return []
        return super().get_permissions()

    def get_queryset(self):
        admin = self.request.user
        if self.action == 'list':
            return Colegio.objects.all()
        
        queryset = Colegio.objects.filter(admin = admin)
        return queryset
    
    def perform_create(self, serializer):
        admin = serializer.validated_data.get('admin', None)
        if not admin:
            if Role.get_admin() == self.request.user.role:
                admin = Administrativo.objects.get(email=self.request.user.email) 
            else:
                raise serializers.ValidationError("Deber ser administrador para crear un colegio")
        
        serializer.save(admin=admin)
    
        

class AdministradorViewSet(generics.CreateAPIView):
    serializer_class = AdministrativoSerializer

class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
    permission_classes = [IsLogged, RelatedToColegio]

    def get_permissions(self):
        permissions = super().get_permissions()
        action = self.action 
        if action in  ['update', 'partial_update', 'create', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions 

    def get_queryset(self):
        user = self.request.user
        if not user.role: 
            return Profesor.objects.all()
        
        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return Profesor.objects.filter(colegio__in=colegios)
        if user.role == Role.get_student():
            return Profesor.objects.filter(colegio=user.estudiante.colegio)
        if user.role == Role.get_teacher():
            return Profesor.objects.filter(colegio=user.profesor.colegio)
        if user.role == Role.get_parent():
            children  = user.padre.get_children()
            colegios = children.values_list('colegio', flat=True)
            return Profesor.objects.filter(colegio__in=colegios)
        return Profesor.objects.none()
    
    def perform_create(self, serializer):
        colegio = serializer.validated_data.get('colegio', None)
        
        admin = self.request.user.administrativo
        if colegio not in admin.colegios.all():
            raise exceptions.PermissionDenied("Valor de colegio incorrecto")

        name = serializer.validated_data.get('name')
        email = User.objects.generate_email(name, "", colegio.extension)
        password = email
        
        serializer.save(email=email, password=password)


class PadreViewSet(viewsets.ModelViewSet):
    queryset = Padre.objects.all()
    serializer_class = PadreSerializer
    permission_classes = [IsLogged, RelatedToColegio]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Padre.objects.none()

        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return Padre.objects.filter(colegio__in=colegios)
        elif user.role == Role.get_parent():
            return Padre.objects.filter(id=user.padre.id)
        elif user.role == Role.get_teacher():
            return Padre.objects.filter(colegio=user.profesor.colegio)
        elif user.role == Role.get_student():
            return Padre.objects.filter(colegio=user.estudiante.colegio)
        return Padre.objects.none()

    def perform_create(self, serializer):
        colegio = serializer.validated_data.get('colegio')
        admin = self.request.user.administrativo

        if colegio not in admin.colegios.all():
            raise exceptions.PermissionDenied("Valor de colegio incorrecto")

        name = serializer.validated_data.get('name')
        email = User.objects.generate_email(name, "", colegio.extension)
        password = email

        serializer.save(email=email, password=password)

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [IsLogged, RelatedToColegio]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Estudiante.objects.none()

        estudiantes = Estudiante.objects.all()
        qp_colegio = self.request.query_params.get('colegio', None)

        if qp_colegio:
            estudiantes = estudiantes.filter(colegio=qp_colegio)

        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return estudiantes.filter(colegio__in=colegios)
        elif user.role == Role.get_teacher():
            return estudiantes.filter(colegio=user.profesor.colegio)
        elif user.role == Role.get_student():
            return estudiantes.filter(id=user.estudiante.id)
        elif user.role == Role.get_parent():
            return estudiantes.get_children()
        return Estudiante.objects.none()

    def perform_create(self, serializer):
        colegio = serializer.validated_data.get('colegio')
        admin = self.request.user.administrativo

        if colegio not in admin.colegios.all():
            raise exceptions.PermissionDenied("Valor de colegio incorrecto")

        name = serializer.validated_data.get('name')
        email = User.objects.generate_email(name, "", colegio.extension)
        password = email

        serializer.save(email=email, password=password)

class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer
    permission_classes = [IsLogged, RelatedToColegio]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Asignatura.objects.none()

        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return Asignatura.objects.filter(colegio__in=colegios)
        elif user.role == Role.get_teacher():
            return Asignatura.objects.filter(colegio=user.profesor.colegio)
        elif user.role == Role.get_student():
            return Asignatura.objects.filter(
                grado=user.estudiante.grado,
                colegio=user.estudiante.colegio
            )
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            colegios = children.values_list('colegio', flat=True)
            return Asignatura.objects.filter(colegio__in=colegios)
        return Asignatura.objects.none()

class PeriodoViewSet(viewsets.ModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer
    permission_classes = [IsLogged]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions

    def get_queryset(self):
        return Periodo.objects.all()

class HorarioViewSet(viewsets.ModelViewSet):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
    permission_classes = [IsLogged]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin(), Role.get_teacher()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Horario.objects.none()

        if user.role == Role.get_admin():
            # Admin can see all horarios
            return Horario.objects.all()
        elif user.role == Role.get_teacher():
            # Teachers can see horarios related to their cursos
            return Horario.objects.filter(cursos_horario__profesor=user.profesor).distinct()
        elif user.role == Role.get_student():
            # Students can see horarios related to their cursos
            return Horario.objects.filter(cursos_horario__estudiantes=user.estudiante).distinct()
        elif user.role == Role.get_parent():
            # Parents can see horarios related to their children's cursos
            children = user.padre.get_children()
            return Horario.objects.filter(cursos_horario__estudiantes__in=children).distinct()
        return Horario.objects.none()

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsLogged, RelatedToColegio]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Curso.objects.none()

        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return Curso.objects.filter(asignatura__colegio__in=colegios)
        elif user.role == Role.get_teacher():
            return Curso.objects.filter(profesor=user.profesor)
        elif user.role == Role.get_student():
            return Curso.objects.filter(estudiantes=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return Curso.objects.filter(estudiantes__in=children)
        return Curso.objects.none()
      
    
class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    permission_classes = [IsLogged, RelatedToCurso]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_admin(), Role.get_teacher()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Inscripcion.objects.none()

        curso = self.request.query_params.get('curso', None)
        inscripsiones = Inscripcion.objects.all()
        if curso:
            inscripsiones = inscripsiones.filter(curso = curso)

        if user.role == Role.get_admin():
            colegios = user.administrativo.colegios.all()
            return inscripsiones.filter(curso__asignatura__colegio__in=colegios)
        elif user.role == Role.get_teacher():
            return inscripsiones.filter(curso__profesor=user.profesor)
        elif user.role == Role.get_student():
            return inscripsiones.filter(estudiante=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return inscripsiones.filter(estudiante__in=children)
        return Inscripcion.objects.none()

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    permission_classes = [IsLogged, RelatedToCurso]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_teacher()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Tarea.objects.none()

        qp_curso = self.request.query_params.get('curso', None)
        tareas = Tarea.objects.all()
        if qp_curso:
            tareas = tareas.filter(curso=qp_curso)

        if user.role == Role.get_teacher():
            return tareas.filter(curso__profesor=user.profesor)
        elif user.role == Role.get_student():
            return tareas.filter(curso__estudiantes=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return tareas.filter(curso__estudiantes__in=children)
        return tareas.none()
    

class RevisionViewSet(viewsets.ModelViewSet):
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer
    permission_classes = [IsLogged, RelatedToCurso]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_teacher(), Role.get_student()]))
        return permissions


    def get_queryset(self):
        user = self.request.user

        entregas = Entrega.objects.all()
        qp_curso = self.request.query_params.get("curso", None)
        if(qp_curso):
            entregas = entregas.filter(curso=qp_curso)

        if not user.role:
            return Revision.objects.none()

        if user.role == Role.get_teacher():
            return entregas.filter(tarea__curso__profesor=user.profesor)
        elif user.role == Role.get_student():
            return entregas.objects.filter(estudiante=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return entregas.filter(estudiante__in=children)
        return Revision.objects.none()


class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    permission_classes = [IsLogged, RelatedToCurso]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create']:
            permissions.append(HasRole([Role.get_student()])())
        elif self.action in ['update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_teacher()]))
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Entrega.objects.none()

        if user.role == Role.get_teacher():
            return Entrega.objects.filter(revision__tarea__curso__profesor=user.profesor)
        elif user.role == Role.get_student():
            return Entrega.objects.filter(revision__estudiante=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return Entrega.objects.filter(revision__estudiante__in=children)
        return Entrega.objects.none()


class AsistenciaViewSet(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    serializer_class = AsistenciaSerializer
    permission_classes = [IsLogged, RelatedToCurso]

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permissions.append(HasRole([Role.get_teacher()])())
        return permissions

    def get_queryset(self):
        user = self.request.user
        if not user.role:
            return Asistencia.objects.none()

        if user.role == Role.get_teacher():
            return Asistencia.objects.filter(inscripcion__curso__profesor=user.profesor)
        elif user.role == Role.get_student():
            return Asistencia.objects.filter(inscripcion__estudiante=user.estudiante)
        elif user.role == Role.get_parent():
            children = user.padre.get_children()
            return Asistencia.objects.filter(inscripcion__estudiante__in=children)
        return Asistencia.objects.none()
