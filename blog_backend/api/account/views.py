from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate, login, logout

from api.account.serializers import signUpSerializer

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