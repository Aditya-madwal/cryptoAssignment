from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('showme/', views.showMe.as_view(), name="showme"),
    path('showmycrypto/', views.ShowMyCrypto.as_view(), name="show my crypto"),
    path('crypto/', views.cryptoOperations.as_view(), name="crypto"),
    path('delete_crypto/<slug:ticker>', views.cryptoOperations.as_view(), name="delete crypto"),
]