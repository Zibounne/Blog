from django.urls import path
from accounts.views import signUp

urlpatterns = [
    path('signUp/', signUp, name = 'signUp'),
    #path('login/', LoginView.as_view(), name = 'login'),
    #path('logout/', LogoutView.as_view(), name = 'logout'),
    #path('profile/', ProfileView.as_view(), name = 'profile'),
]