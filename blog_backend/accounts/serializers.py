from rest_framework import serializers

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only = True)
    confirm_password = serializers.CharField(write_only= True)

    class Meta:
        model = User
        fields = (
            'username',
            'password',
            'confirm_password',
            'email'
            )
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        validate_password(data['password'])
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user