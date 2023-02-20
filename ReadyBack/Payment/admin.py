from django.contrib import admin
from .models import Payment, Payment_Type

# Register your models here.
admin.site.register(Payment)
admin.site.register(Payment_Type)