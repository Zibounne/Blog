from django.urls import path

from api.account.views import signUp, signIn, signOut, profile, profileUpdate

urlpatterns = [
    path('signUp/', signUp, name = 'signUp'),
    path('signIn/', signIn, name = 'signIn'),
    path('signOut/', signOut, name = 'signOut'),
    path('profile/', profile, name = 'profile'),
    path('profile/update/', profileUpdate, name = 'profileUpdate'),
]