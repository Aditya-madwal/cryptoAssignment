from django.db import models
from users.models import CustomUser

class UserCrypto(models.Model) :
    ticker = models.CharField(max_length=10)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user}-->{self.ticker}"
    
