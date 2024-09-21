from rest_framework.permissions import BasePermission
from django.contrib.auth import models as Models
from django.db import models
from django.utils.translation import gettext_lazy as _





class Role(Models.AbstractBaseUser, Models.PermissionsMixin):
    """User roles in the system"""

    ADMIN = 'Administrador'
    TEACHER = 'Profesor'
    STUDENT = 'Estudiante'
    PARENT = 'Padre'

    groups = models.ManyToManyField(
        Models.Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="role_set",
        related_query_name="role",
    )
    user_permissions = models.ManyToManyField(
        Models.Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="role_set",
        related_query_name="role",
    )

    role_name = models.CharField(max_length=255, unique=True, primary_key=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'role_name'

    
        
    def createAdminRole():
        try:
            Role.objects.get(role_name = LAB_ADMIN)
            print(LAB_ADMIN + "LabAdmin Already Added")
        except:
            LabAdmin.objects.create()
            print(LAB_ADMIN + "LabAdmin Added")

    def createAssistantRole():
        try:
            Role.objects.get(role_name = LAB_ASSIST)
            print(LAB_ASSIST + "LabAssistant Already Added")
        except:
            LabAssistant.objects.create()
            print(LAB_ASSIST + "LabAssistant Added")

    def createRoles():
        createAdminRole()
        createAssistantRole()


    def createSuperInstance():
        data = {
                'email' : 'admin@example.com',
                'password' : '#123#AndresHinojosa#123',
        }
        admin = get_user_model().objects.filter(email = data['email']).first()
        if admin:
            print("Admin instance already created")
            return

        get_user_model().objects.create_superuser(**data)
        print("Admin instance created")

class IsLabAdmin(BasePermission):

    def has_permission(self, request, view):
        return isAdmin(request.user)







class RolePermissionsMixin(Models.PermissionsMixin):

    class Meta:
        abstract = True

    role = models.ForeignKey(Role, on_delete=models.CASCADE, null = True, default=None)

    def has_perm(self, perm, obj = None):
        super_perm = super().has_perm(perm, obj)
        return super_perm or self.role.has_perm(perm, obj)


    @classmethod
    def getDBPermission(db_permission):

        class DBPermissionHandler(BasePermission):
            def __init__(self):
                self.db_permission = db_permission

            def has_permission(self, request, view):
                if not request.user.is_authenticated: return False
                return request.user.has_perm(self.db_permission)

        return  DBPermissionHandler



class Admin(Role):
    """Lab Administrator role"""
    class Meta:
        permissions = [ ]
        proxy = True

    def save(self, *args, **kwargs):
        self.role_name = ADMIN
        super().save(*args, **kwargs)


class Teacher(Role):
    """Lab Assistant role"""

    class Meta:
        permissions = []
        proxy = True

    def save(self, *args, **kwargs):
        self.role_name = TEACHER
        super().save(*args, **kwargs)


class IsLogged(BasePermission):

    def has_permission(self, request, view):

        user = request.user
        return isLogged(user) or user.is_superuser


