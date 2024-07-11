from django.urls import path
from api.account.views import signUp, signIn

urlpatterns = [
    path('signUp/', signUp, name = 'signUp'),
    path('signIn/', signIn, name = 'signIn'),
]