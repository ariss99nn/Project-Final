from django.shortcuts import render
from rest_framework import viewsets
from .models import Categoria, Producto, Proveedor
from .serializers import CategoriaSerializer, ProductoSerializer, ProveedorSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth.models import Permission
from rest_framework.permissions import AllowAny



class IsAdminOrEmployee(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.groups.filter(name__in=["ADMIN", "EMPLOYEE", "CLIENT"]).exists()
        return False  # No autenticado, sin acceso
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
    #IsAuthenticated
    #permission_classes = [IsAdminOrEmployee]  #Se aplica el permiso

    def get_queryset(self):
        
        user = self.request.user
        if user.groups.filter(name="ADMIN").exists() or user.groups.filter(name="EMPLOYEE").exists():
            return Producto.objects.all()  # Admins y empleados ven todo
        elif user.groups.filter(name="CLIENT").exists():
            return Producto.objects.all()  # Clientes ven todo, pero no pueden modificar
        return Producto.objects.none()  # No autorizado
    
class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer