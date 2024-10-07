from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Grado
from academico.serializers import GradoSerializer

# Definir la URL base para Grado (asegúrate que coincide con tu urls.py)
GRADO_URL = reverse('grado-list')

def sample_grado(**params):
    """Crea un Grado de ejemplo"""
    defaults = {
        'nombre': 'Primero Básico',
    }
    defaults.update(params)
    return Grado.objects.create(**defaults)

class GradoViewSetTests(TestCase):
    """Pruebas para el GradoViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_grados(self):
        """Prueba listar grados"""
        sample_grado()
        sample_grado(nombre='Segundo Básico')

        res = self.client.get(GRADO_URL)
        grados = Grado.objects.all()
        serializer = GradoSerializer(grados, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_grado(self):
        """Prueba crear un grado"""
        payload = {'nombre': 'Tercero Básico'}
        res = self.client.post(GRADO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        grado = Grado.objects.get(id=res.data['id'])
        self.assertEqual(grado.nombre, payload['nombre'])

    def test_update_grado(self):
        """Prueba actualizar un grado"""
        grado = sample_grado()

        payload = {'nombre': 'Actualizado Básico'}
        url = reverse('grado-detail', args=[grado.id])
        res = self.client.patch(url, payload)

        grado.refresh_from_db()
        self.assertEqual(grado.nombre, payload['nombre'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_grado(self):
        """Prueba eliminar un grado"""
        grado = sample_grado()
        url = reverse('grado-detail', args=[grado.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Grado.objects.filter(id=grado.id).exists())
