from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Asistencia, AsignaturaEstudiante, Estudiante, AsignaturaPeriodo, Asignatura, Periodo
import datetime

# URL para listar asistencias (asegúrate de que el nombre coincide con el definido en urls.py)
ASISTENCIA_URL = reverse('asistencia-list')

def sample_estudiante(**params):
    """Crea un estudiante de ejemplo"""
    defaults = {
        'nombres': 'Juan',
        'apellidos': 'Pérez',
        'fecha_nacimiento': datetime.date(2000, 1, 1)
    }
    defaults.update(params)
    return Estudiante.objects.create(**defaults)

def sample_asignatura(**params):
    """Crea una asignatura de ejemplo"""
    defaults = {
        'nombre': 'Matemáticas'
    }
    defaults.update(params)
    return Asignatura.objects.create(**defaults)

def sample_periodo(**params):
    """Crea un periodo de ejemplo"""
    defaults = {
        'anio': 2023,
        'trimestre': 1
    }
    defaults.update(params)
    return Periodo.objects.create(**defaults)

def sample_asignatura_periodo(**params):
    """Crea una asignatura en un periodo de ejemplo"""
    asignatura = sample_asignatura()
    periodo = sample_periodo()
    return AsignaturaPeriodo.objects.create(asignatura=asignatura, periodo=periodo, **params)

def sample_asignatura_estudiante(**params):
    """Crea una asignatura estudiante de ejemplo"""
    estudiante = sample_estudiante()
    asignatura_periodo = sample_asignatura_periodo()
    defaults = {
        'promedio': 85.5
    }
    defaults.update(params)
    return AsignaturaEstudiante.objects.create(estudiante=estudiante, asignatura_periodo=asignatura_periodo)

class AsistenciaTests(TestCase):
    """Pruebas para el modelo Asistencia"""

    def setUp(self):
        self.client = APIClient()

    def test_list_asistencias(self):
        """Prueba listar asistencias"""
        asignatura_estudiante = sample_asignatura_estudiante()
        Asistencia.objects.create(asignatura_estudiante=asignatura_estudiante, estado_asisten=1)

        res = self.client.get(ASISTENCIA_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_asistencia(self):
        """Prueba crear una asistencia"""
        asignatura_estudiante = sample_asignatura_estudiante()

        payload = {
            'asignatura_estudiante': asignatura_estudiante.id,
            'estado_asisten': 1
        }

        res = self.client.post(ASISTENCIA_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        asistencia = Asistencia.objects.get(id=res.data['id'])
        self.assertEqual(asistencia.estado_asisten, payload['estado_asisten'])

    def test_update_asistencia(self):
        """Prueba actualizar una asistencia"""
        asistencia = Asistencia.objects.create(asignatura_estudiante=sample_asignatura_estudiante(), estado_asisten=1)
        payload = {'estado_asisten': 2}

        url = reverse('asistencia-detail', args=[asistencia.id])
        res = self.client.patch(url, payload)

        asistencia.refresh_from_db()
        self.assertEqual(asistencia.estado_asisten, payload['estado_asisten'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_asistencia(self):
        """Prueba eliminar una asistencia"""
        asistencia = Asistencia.objects.create(asignatura_estudiante=sample_asignatura_estudiante(), estado_asisten=1)

        url = reverse('asistencia-detail', args=[asistencia.id])
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Asistencia.objects.filter(id=asistencia.id).exists())
