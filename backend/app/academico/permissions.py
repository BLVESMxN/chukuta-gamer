# permissions.py

from rest_framework.permissions import BasePermission
from .models import Curso, Colegio

from core.models import Role

class RelatedToColegio(BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if not user.role: return True
        if user.role == Role.get_admin():
            set_colegio = Colegio.objects.filter(admin=user.administrativo)
            return set_colegio.exists()
        return True

    def has_object_permission(self, request, view, obj):
        obj_colegio=None
        if hasattr(obj, 'get_colegio'):
            obj_colegio = obj.get_colegio()
        elif isinstance(obj, Colegio):
            obj_colegio = obj
        else:
            return False
        
        user = request.user

        if user.role == Role.get_admin():
            set_colegio = Colegio.objects.filter(admin=user.administrativo)
            return obj_colegio in set_colegio
        
        if user.role == Role.get_student():
            return obj_colegio == user.estudiante.get_colegio()
        if user.role == Role.get_parent():
            return obj_colegio == user.padre.get_colegio()
        if user.role == Role.get_teacher():
            return obj_colegio == user.profesor.get_colegio()
        return False
        
class RelatedToCurso(RelatedToColegio):

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        if not super().has_object_permission(request, view, obj):
            return False

        if not hasattr(obj, 'get_curso'): return False
        obj_curso = obj.get_curso()
        user = request.user

        if user.role == Role.get_admin():
            return True
        if user.role == Role.get_teacher():
            return user.profesor == obj_curso.profesor
        if user.role == Role.get_student():
            return user.estudiante in obj_curso.estudiantes
        if user.role == Role.get_parent():
            children = user.padre.get_children()
            cursos = children.values_list('record__pk', flat=True)
            return obj_curso.pk in cursos
        return False

class ValidSuscription(BasePermission):
    def has_permission(self, request, view):
        return True
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Colegio):
            return obj.suscripcion
        
        if hasattr(obj, 'get_colegio'):
            return obj.get_colegio().suscripcion
        
        return False