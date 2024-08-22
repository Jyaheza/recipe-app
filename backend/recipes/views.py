from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from .models import Ingredient, Recipe
from django.views.decorators.http import require_http_methods
from .serializers import IngredientSerializer, RecipeSerializer
from rest_framework.permissions import IsAuthenticated


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all() # All actions 
    serializer_class = RecipeSerializer

class IngredientViewSet(viewsets.ModelViewSet): 
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

