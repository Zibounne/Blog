from django.urls import path
from authentication.views import UserCreateView

urlpatterns = [
    path('signUp/', UserCreateView.as_view(), name='signUp'),
]