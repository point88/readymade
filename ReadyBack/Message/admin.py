from django.contrib import admin
from .models import Message, Attachment

# Register your models here.
admin.site.register(Message)
admin.site.register(Attachment)
