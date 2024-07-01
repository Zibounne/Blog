from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)

    class Meta:
        
        model = User
        fields = [
            'pseudo',
            'email',
            'password'
        ]

    def create(self, validated_data):
        
        user = User.objects.create_user(
            pseudo = validated_data['pseudo'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        
        return user