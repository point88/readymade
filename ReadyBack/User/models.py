import datetime
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext as _
from django.utils.crypto import get_random_string
from django.contrib.auth.models import AbstractUser

from phonenumber_field.modelfields import PhoneNumberField

from rest_framework.exceptions import NotAcceptable

from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

# Create your models here.
class User(AbstractUser):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False)
    rating = models.SmallIntegerField(default=0)
    facebook_link = models.CharField(max_length=255, default="")
    linkedin_link = models.CharField(max_length=255, default="")
    profile_image = models.CharField(max_length=255, default="")
    subscription_type = models.SmallIntegerField(default=0)
    pass
class PhoneNumber(models.Model):
    user = models.OneToOneField(
        User,
        related_name='phone',
        on_delete=models.CASCADE)
    phone_number = PhoneNumberField(unique=True)
    security_code = models.CharField(max_length=120)
    is_verified = models.BooleanField(default=False)
    sent = models.DateTimeField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return self.phone_number.as_e164
    
    def generate_security_code(self):
        token_length = getattr(settings, "TOKEN_LENGTH", 6)
        return get_random_string(token_length, allowed_chars="1234567890")
    
    def is_security_code_expired(self):
        expiration_date = self.sent + datetime.timedelta(
            minutes=settings.TOKEN_EXPIRE_MINUTES
        )
        return expiration_date <= timezone.now()
    
    def send_confirmation(self):
        twilio_account_sid = settings.TWILIO_ACCOUNT_SID
        twilio_auth_token = settings.TWILIO_AUTH_TOKEN
        twilio_phone_number = settings.TWILIO_PHONE_NUMBER

        self.security_code = self.generate_security_code()

        if all([twilio_account_sid,
                twilio_auth_token,
                twilio_phone_number
                ]):
            try:
                twilio_client = Client(twilio_account_sid, twilio_auth_token)
                twilio_client.messages.create(
                    body=f'Your activation code is {self.security_code}',
                    to=str(self.phone_number),
                    from_=twilio_phone_number,
                )
                self.sent = timezone.now()
                self.save()
                return True
            except TwilioRestException as e:
                print (e)
        else:
            print("Twilio credentials are not set")
    
    def check_verification(self, security_code):
        if (not self.is_security_code_expired() and
            security_code == self.security_code and
            self.is_verified == False
            ):
            self.is_verified = True
            self.save()
        else:
            raise NotAcceptable(_("Your security code is wrong, expired or this phone is verified before."))
        
        return self.is_verified

class Subscription(models.Model):
    id = models.BigAutoField(auto_created=True,primary_key=True)
    subscription_type=models.CharField(max_length=128)

class Freelancer(models.Model):
    id = models.BigAutoField(auto_created=True,primary_key=True)
    UserId = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        related_name='user_freelancer',
    )
    hourly = models.SmallIntegerField(default=10)
    registration_date = models.DateField()
    country = models.CharField(max_length=128)
    overview = models.TextField(default="")

class Certification(models.Model):
    id = models.BigAutoField(auto_created=True,primary_key=True)
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.CASCADE,
        related_name='freelancer_certification'
    )
    certification_name = models.CharField(max_length=200)
    description = models.TextField(default="")
    date_earned = models.DateField()
    certification_link = models.TextField()

class Test(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    test_name = models.CharField(max_length=128)
    test_link = models.TextField(default="")

class Test_Result(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.CASCADE,
        related_name='freelancer_test_result'
    )
    TestId = models.ForeignKey(
        Test,
        on_delete=models.CASCADE,
        related_name='test_result'
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
    result_link = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2)
    display_on_profile = models.BooleanField()


class Category(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    category_name = models.CharField(max_length=128)

class Skill(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    CategoryId = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        default = 0,
        related_name='category_skill'
    )
    skill_name = models.CharField(max_length=128)

class Has_Skill(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    UserId = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        default=1,
        related_name='freelancer_has_skill'
    )
    SkillId = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        default=1,
        related_name='skill_has_skill'
    )

class Company(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    name = models.CharField(max_length=128, default="")
    location = models.CharField(max_length=255, default="")
    UserId = models.OneToOneField(
        User,
        default = 0,
        on_delete = models.CASCADE,
        related_name='user_company',
    )

class Client(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    UserId = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
        related_name='user_client',
    )
    registration_date = models.DateField()
    country = models.CharField(max_length=255, default="")
    #CompanyId = models.OneToOneField(
    #    Company,
    #    on_delete = models.SET_DEFAULT,
    #    default = 0,
    #    related_name='company_client'
    #)
