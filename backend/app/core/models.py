"""
Database models
"""
from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)

from core.permissions import Role, RolePermissionsMixin
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework.permissions import BasePermission




class UserManager(BaseUserManager):
    """Manager for users."""

    def generate_email(self, names, last_names, extension, **extra_fields):
        names = names.split(' ')
        last_names = last_names.split(' ')
        if(len(names)<1 or len(last_names)<1):
            raise ValueError('Nombre inválido')
        
        for namex in names:
            if not namex.isalpha():
                raise ValueError(f'El nombre {namex} inválido')
        for namex in last_names:
            if not namex.isalpha():
                raise ValueError(f'El apellido {namex} es inválido')

        names_str = names[0]
        last_names_str = last_names[0]

        names = '.' + '.'.join(names[1:]) if len(names)>1 else ''
        last_names = '.' + '.'.join(last_names[1:]) if len(last_names)>1 else ''

        new_email = f'{names_str}.{last_names_str}@{extension}.com'
        query = self.filter(email=new_email)
        i=0
        j=0
        c=1
        while(query.exists()):
            if(len(last_names_str)>j):    
                    last_names_str += last_names[j]
                    if(last_names[j]=='.'):
                        j += 1
                        last_names_str += last_names[j]
            else:
                if(len(names_str)>i):
                    names_str += names[i]
                    if(names[i]=='.'):
                        i += 1
                        names_str += names[i]
                else:
                    last_names_str += str(c)
                    c += 1   
            new_email = f'{names_str}.{last_names_str}@{extension}.com'
            query = self.filter(email=new_email)


    def create_user(self, email, password=None, role=None **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.role = getAdminRole()
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_parent(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.role = getAssistantRole()
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_student(self, first_name, last_name, password=None, **extra_fields):
        if not first_name:
            raise ValueError('Se debe especificar el primer nombre')
        if not last_name:
            raise ValueError('Se debe especificar el apellido')
        
        email = self.generate_email(first_name, last_name)
        self.create_user(email, password, )

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

    def get_last_session(self, user):
        if not user.is_authenticated: return None
        last_session = Session.objects.filter(user=user).order_by('-login_time').first()
        if last_session:
            return last_session
        else:
            return None

    def get_open_session(self, user):
        last_session = self.get_last_session(user)
        if not last_session: return None
        if last_session.logout_time:
            return None
        else:
            return last_session
    
    def isLogged(self, user):
        if self.get_open_session(user):
            return True
        return False
    
    def logOut(self, user):
        last_session = self.get_open_session(user)
        if not last_session:
            return
        last_session.logout_time = timezone.now()
        last_session.save()

    def logIn(self, user):

        if not user.is_authenticated:
            return
        if self.get_open_session(user):
            self.logOut(user)
        Session.objects.create(user=user)


class User(AbstractBaseUser, RolePermissionsMixin):
    """User in the system."""

    class Meta:
        permissions = [("own_password_modification", "Modification of self's account password"),
                       ("own_phone_modification", "Modification of self's account phone number"),]

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email





class Session(models.Model):
    user = models.ForeignKey(get_user_model(), null=False, blank=False, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time =  models.DateTimeField(null=True, blank=True)
    #session_key = models.CharField(max_length=255,  null=False, blank=True)





