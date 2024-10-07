from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Estudiante, AsignaturaPeriodo, AsignaturaEstudiante, Asignatura, Periodo
from django.contrib.auth import get_user_model
from academico.serializers import AsignaturaEstudianteSerializer
import datetime

# Definir las URLs para los endpoints
ASIGNATURAESTUDIANTE_URL = reverse('asignaturaestudiante-list')

def sample_user(email='test@example.com', password='Testpass123#Testpass123#'):
    """Crear un usuario de ejemplo"""
    return get_user_model().objects.create_user(email, password)

def sample_estudiante(**params):
    """Crear un estudiante de ejemplo"""
    defaults = {
        'nombres': 'Juan',
        'apellidos': 'Pérez',
        'fecha_nacimiento': datetime.date(2000, 1, 1)
    }
    defaults.update(params)
    return Estudiante.objects.create(**defaults)

def sample_asignatura(nombre='Matemáticas'):
    """Crear una asignatura de ejemplo"""
    return Asignatura.objects.create(nombre=nombre)

def sample_periodo(anio=2024, trimestre=1):
    """Crear un periodo de ejemplo"""
    return Periodo.objects.create(anio=anio, trimestre=trimestre)

def sample_asignatura_periodo(user, asignatura=None, periodo=None):
    """Crear una AsignaturaPeriodo de ejemplo"""
    asignatura = asignatura or sample_asignatura()
    periodo = periodo or sample_periodo()
    return AsignaturaPeriodo.objects.create(asignatura=asignatura, periodo=periodo, usuario=user)

def sample_asignatura_estudiante(estudiante, asignatura_periodo, promedio=85.00):
    """Crear una AsignaturaEstudiante de ejemplo"""
    return AsignaturaEstudiante.objects.create(
        estudiante=estudiante,
        asignatura_periodo=asignatura_periodo,
        promedio=promedio
    )

class AsignaturaEstudianteViewSetTests(TestCase):
    """Pruebas para el AsignaturaEstudianteViewSet"""

    def setUp(self):
        self.client = APIClient()
        self.user = sample_user()

    def test_list_asignatura_estudiantes(self):
        """Prueba para listar AsignaturaEstudiantes"""
        estudiante = sample_estudiante()
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        sample_asignatura_estudiante(estudiante, asignatura_periodo)

        res = self.client.get(ASIGNATURAESTUDIANTE_URL)
        asignatura_estudiantes = AsignaturaEstudiante.objects.all()
        serializer = AsignaturaEstudianteSerializer(asignatura_estudiantes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_asignatura_estudiante(self):
        """Prueba para crear un nuevo AsignaturaEstudiante"""
        estudiante = sample_estudiante()
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        payload = {
            'promedio': 90.00,
            'estudiante': estudiante.id,
            'asignatura_periodo': asignatura_periodo.id
        }
        res = self.client.post(ASIGNATURAESTUDIANTE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        asignatura_estudiante = AsignaturaEstudiante.objects.get(id=res.data['id'])
        self.assertEqual(asignatura_estudiante.promedio, payload['promedio'])
        self.assertEqual(asignatura_estudiante.estudiante, estudiante)
        self.assertEqual(asignatura_estudiante.asignatura_periodo, asignatura_periodo)

    def test_update_asignatura_estudiante(self):
        """Prueba para actualizar un AsignaturaEstudiante"""
        estudiante = sample_estudiante()
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        asignatura_estudiante = sample_asignatura_estudiante(estudiante, asignatura_periodo)

        payload = {'promedio': 95.00}
        url = reverse('asignaturaestudiante-detail', args=[asignatura_estudiante.id])
        res = self.client.patch(url, payload)

        asignatura_estudiante.refresh_from_db()
        self.assertEqual(asignatura_estudiante.promedio, payload['promedio'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_asignatura_estudiante(self):
        """Prueba para eliminar un AsignaturaEstudiante"""
        estudiante = sample_estudiante()
        asignatura_periodo = sample_asignatura_periodo(user=self.user)
        asignatura_estudiante = sample_asignatura_estudiante(estudiante, asignatura_periodo)
        url = reverse('asignaturaestudiante-detail', args=[asignatura_estudiante.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(AsignaturaEstudiante.objects.filter(id=asignatura_estudiante.id).exists())
