from django.urls import path, include 
from rest_framework.routers import DefaultRouter

from .views import ForoViewSet, MensajeViewSet

router = DefaultRouter()
router.register(r'foros', ForoViewSet)
router.register(r'mensajes', MensajeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]