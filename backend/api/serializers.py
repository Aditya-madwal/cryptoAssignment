from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ["id","username","email","bio","first_name", "last_name"]

class CryptoSerializer(serializers.ModelSerializer) :
    user = UserSerializer(read_only = True)
    class Meta:
        model = UserCrypto
        fields = ["ticker","quantity", "user"]
