from django.urls import path
from accounts.views import signUp, signIn

urlpatterns = [
    path('signUp/', signUp, name = 'signUp'),
    path('signIn/', signIn, name = 'signIn'),
    #path('logout/', LogoutView.as_view(), name = 'logout'),
    #path('profile/', ProfileView.as_view(), name = 'profile'),
]