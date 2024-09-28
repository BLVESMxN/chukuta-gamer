# permissions.py

from rest_framework.permissions import BasePermission
from .models import Curso

class IsAuthenticatedAndRelatedToColegio(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and self.get_user_colegio(request.user) is not None

    def has_object_permission(self, request, view, obj):
        user_colegio = self.get_user_colegio(request.user)
        object_colegio = self.get_object_colegio(obj)
        return user_colegio == object_colegio

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

    def get_object_colegio(self, obj):
        if hasattr(obj, 'colegio'):
            return obj.colegio
        elif hasattr(obj, 'get_colegio'):
            return obj.get_colegio()
        return None

class IsAuthenticatedAndRelatedToCurso(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        user_cursos = self.get_user_cursos(request.user)
        object_curso = self.get_object_curso(obj)
        return object_curso in user_cursos

    def get_user_cursos(self, user):
        if hasattr(user, 'profesor'):
            return user.profesor.cursos.all()
        elif hasattr(user, 'estudiante'):
            return Curso.objects.filter(estudiantes=user)
        return Curso.objects.none()

    def get_object_curso(self, obj):
        if hasattr(obj, 'curso'):
            return obj.curso
        elif hasattr(obj, 'get_curso'):
            return obj.get_curso()
        return None
