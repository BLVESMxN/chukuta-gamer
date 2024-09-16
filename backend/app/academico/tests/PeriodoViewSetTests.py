from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from academico.models import Periodo
from academico.serializers import PeriodoSerializer

# Definir la URL para el endpoint de Periodo
PERIODO_URL = reverse('periodo-list')

def sample_periodo(**params):
    """Crea un periodo de ejemplo"""
    defaults = {
        'anio': 2024,
        'trimestre': 1,
    }
    defaults.update(params)
    return Periodo.objects.create(**defaults)

class PeriodoViewSetTests(TestCase):
    """Pruebas para el PeriodoViewSet"""

    def setUp(self):
        self.client = APIClient()

    def test_list_periodos(self):
        """Prueba para listar periodos"""
        sample_periodo()
        sample_periodo(anio=2023, trimestre=2)

        res = self.client.get(PERIODO_URL)
        periodos = Periodo.objects.all()
        serializer = PeriodoSerializer(periodos, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_periodo(self):
        """Prueba para crear un nuevo periodo"""
        payload = {
            'anio': 2025,
            'trimestre': 3,
        }
        res = self.client.post(PERIODO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        periodo = Periodo.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(periodo, key))

    def test_update_periodo(self):
        """Prueba para actualizar un periodo"""
        periodo = sample_periodo()

        payload = {'anio': 2026, 'trimestre': 4}
        url = reverse('periodo-detail', args=[periodo.id])
        res = self.client.patch(url, payload)

        periodo.refresh_from_db()
        self.assertEqual(periodo.anio, payload['anio'])
        self.assertEqual(periodo.trimestre, payload['trimestre'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_periodo(self):
        """Prueba para eliminar un periodo"""
        periodo = sample_periodo()
        url = reverse('periodo-detail', args=[periodo.id])

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Periodo.objects.filter(id=periodo.id).exists())
