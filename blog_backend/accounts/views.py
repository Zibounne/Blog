from django.shortcuts import redirect
from django.urls import reverse

from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from accounts.serializers import UserSerializer, RegisterSerializer, LoginSerializer

# View to get user details
class UserDetailView(generics.RetrieveAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class RegisterView(generics.CreateAPIView):
    
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(request=request, username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        
        if user:
            login(request, user)
            return redirect(reverse('profile', kwargs={'username': user.username}))
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)