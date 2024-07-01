from django.urls import path
from api.views import UserCreate

urlpatterns = [
    path('api/signUp/', UserCreate.as_view()),
]