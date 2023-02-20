from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Freelancer, Client, Certification, Test, Test_Result, Skill, Has_Skill, Company

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Freelancer)
admin.site.register(Client)
admin.site.register(Certification)
admin.site.register(Test)
admin.site.register(Test_Result)
admin.site.register(Skill)
admin.site.register(Has_Skill)
admin.site.register(Company)