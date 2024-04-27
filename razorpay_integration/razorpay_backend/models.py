import uuid

from django.db import models

# Create your models here.
class Transaction(models.Model):
    payment_id = models.CharField(max_length=100, verbose_name="Payment ID")
    order_id = models.CharField(max_length=100, verbose_name="Order ID")
    signature = models.CharField(max_length=200, verbose_name="Signature")
    amount = models.IntegerField(verbose_name="Amount")
    date = models.DateField(auto_now_add=True,verbose_name="Date")

    def __str__(self):
        return str(self.id)