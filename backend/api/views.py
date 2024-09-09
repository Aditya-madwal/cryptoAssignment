from rest_framework import status
from .logic import *
from django.db.models import Q
from django.conf import settings
import requests
import os

from .models import *
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import *

from dotenv import load_dotenv
load_dotenv()

class showMe(APIView) :
    def get(self, request) :
        user = self.request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

def get_crypto_data(tabs):
    url = "https://rest.coinapi.io/v1/assets"
    headers = {
        'X-CoinAPI-Key': "YOUR-API-KEY FROM https://www.coinapi.io/get-free-api-key?product_id=market-data-api"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()  # returns a list of all cryptocurrencies
        crypto_data = [item for item in data if item['type_is_crypto'] == 1]
        if tabs == "all":
            return crypto_data
        else :
            tabs = int(tabs)
            return crypto_data[0:tabs]
    else:
        return None  # handle errors in real use case


class cryptoOperations(APIView) :
    
    def get(self, request) :
        items = request.query_params.get('items')
        return Response(get_crypto_data(tabs="all"), status=status.HTTP_200_OK)
    
    def post(self, request) :
        ticker = request.data["ticker"]
        price = request.data["price"]
        user = self.request.user
        user.balance += int(price)
        user.save()

        if UserCrypto.objects.filter(ticker = ticker, user = self.request.user).exists() :
            x = UserCrypto.objects.get(ticker = ticker, user = self.request.user)
            x.quantity += 1
            x.save()
        else :
            x = UserCrypto.objects.create(ticker = ticker, user = self.request.user)
        serializer = CryptoSerializer(x, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, ticker) :
        x = UserCrypto.objects.get(ticker = ticker, user = self.request.user)
        # price = request.data["price"]
        user = self.request.user
        price = next((asset['price_usd'] for asset in get_crypto_data(tabs="all") if asset['asset_id'] == ticker))
        user.balance -= int(price)
        user.save()
        serializer = CryptoSerializer(x, many=False)
        x.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowMyCrypto(APIView):
    def get(self, request) :
        cryptos = UserCrypto.objects.filter(user = request.user)
        serializer = CryptoSerializer(cryptos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)