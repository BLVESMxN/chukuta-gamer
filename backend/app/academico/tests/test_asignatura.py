from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Asignatura, Grado
from academico.serializers import AsignaturaSerializer

ASIGNATURA_URL = reverse('asignatura-list')  # Asegúrate de que este nombre coincide con el que definiste en tu urls.py

def sample_grado(**params):
    """Crea un grado de ejemplo"""
    defaults = {
        'nombre': 'Primero'
    }
    defaults.update(params)
    return Grado.objects.create(**defaults)

def sample_asignatura(**params):
    """Crea una asignatura de ejemplo"""
    grado = sample_grado()
    defaults = {
        'nombre': 'Matemáticas',
        'grado': grado
    }
    defaults.update(params)
    return Asignatura.objects.create(**defaults)

class AsignaturaViewSetTests(TestCase):
    """Pruebas para el AsignaturaViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_asignaturas(self):
        """Prueba listar asignaturas"""
        sample_asignatura()
        sample_asignatura(nombre='Ciencias')

        res = self.client.get(ASIGNATURA_URL)
        asignaturas = Asignatura.objects.all()
        serializer = AsignaturaSerializer(asignaturas, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_asignatura(self):
        """Prueba crear una asignatura"""
        grado = sample_grado()
        payload = {
            'nombre': 'Historia',
            'grado': grado.id
        }
        res = self.client.post(ASIGNATURA_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        asignatura = Asignatura.objects.get(id=res.data['id'])
        self.assertEqual(asignatura.nombre, payload['nombre'])
        self.assertEqual(asignatura.grado.id, payload['grado'])

    def test_update_asignatura(self):
        """Prueba actualizar una asignatura"""
        asignatura = sample_asignatura()

        payload = {'nombre': 'Actualizado'}
        url = reverse('asignatura-detail', args=[asignatura.id])
        res = self.client.patch(url, payload)

        asignatura.refresh_from_db()
        self.assertEqual(asignatura.nombre, payload['nombre'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_asignatura(self):
        """Prueba eliminar una asignatura"""
        asignatura = sample_asignatura()
        url = reverse('asignatura-detail', args=[asignatura.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Asignatura.objects.filter(id=asignatura.id).exists())