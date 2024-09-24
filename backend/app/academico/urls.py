from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GradoViewSet, 
)

router = DefaultRouter()
router.register(r'grados', GradoViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
