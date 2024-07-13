from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from api.account.serializers import signUpSerializer, UserSerializer

# Sign Up
@api_view(['POST'])
@permission_classes([AllowAny])
def signUp(request):
    serializer = signUpSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User created successfully.'}, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# Sign In
@api_view(['POST'])
@permission_classes([AllowAny])
def signIn(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user = user)
        return Response({'token': token.key, 'message': 'Logged in successfully.'})
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)

# Sign Out
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def signOut(request):
    logout(request)
    return Response({'message': 'Logged out successfully.'}, status = status.HTTP_200_OK)

# Profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status = status.HTTP_200_OK)

# Profile Edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def profileUpdate(request):
    user = request.user
    serializer = UserSerializer(user, data = request.data, partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)