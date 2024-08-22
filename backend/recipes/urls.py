from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IngredientViewSet, RecipeViewSet

router = DefaultRouter() # This generates URL Patterns for my viewSet to handle CRUD
router.register(r'recipes', RecipeViewSet) # generating routes for /recipes/
router.register(r'ingredients', IngredientViewSet) # generating routes for /ingredients/

urlpatterns = [
    path('', include(router.urls)),
]
