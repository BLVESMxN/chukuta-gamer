from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from academico.models import Estudiante
from django.contrib.auth import get_user_model
from academico.serializers import EstudianteSerializer
import datetime
# Create your tests here.
ESTUDIANTE_URL = reverse('estudiante-list')  # Asegúrate de que este nombre coincide con el que definiste en tu `urls.py`

def sample_estudiante(**params):
    """Crea un estudiante de ejemplo"""
    defaults = {
        'nombres': 'Juan',
        'apellidos': 'Pérez',
        'fecha_nacimiento': datetime.date(2000, 1, 1)  # Cambiamos a un objeto date
    }
    defaults.update(params)
    
    # Crear y devolver el estudiante
    return Estudiante.objects.create(**defaults)

class EstudianteViewSetTests(TestCase):
    """Pruebas para el EstudianteViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_estudiantes(self):
        """Prueba listar estudiantes"""
        sample_estudiante()
        sample_estudiante(nombres='Maria', apellidos='López')

        res = self.client.get(ESTUDIANTE_URL)
        estudiantes = Estudiante.objects.all()
        serializer = EstudianteSerializer(estudiantes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

def test_create_estudiante(self):
    """Prueba crear un estudiante"""
    payload = {
        'nombres': 'Carlos',
        'apellidos': 'Gomez',
        'fecha_nacimiento': '1999-05-15'
    }
    res = self.client.post(ESTUDIANTE_URL, payload)

    self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    estudiante = Estudiante.objects.get(id=res.data['id'])
    for key in payload.keys():
        if key == 'fecha_nacimiento':
            # Convertir la cadena en el payload a un objeto datetime.date para la comparación
            self.assertEqual(datetime.datetime.strptime(payload[key], '%Y-%m-%d').date(), getattr(estudiante, key))
        else:
            self.assertEqual(payload[key], getattr(estudiante, key))

    def test_update_estudiante(self):
        """Prueba actualizar un estudiante"""
        estudiante = sample_estudiante()

        payload = {'nombres': 'Actualizado'}
        url = reverse('estudiante-detail', args=[estudiante.id])
        res = self.client.patch(url, payload)

        estudiante.refresh_from_db()
        self.assertEqual(estudiante.nombres, payload['nombres'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_estudiante(self):
        """Prueba eliminar un estudiante"""
        estudiante = sample_estudiante()
        url = reverse('estudiante-detail', args=[estudiante.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Estudiante.objects.filter(id=estudiante.id).exists())