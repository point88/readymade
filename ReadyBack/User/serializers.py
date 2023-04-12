from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from phonenumber_field.serializerfields import PhoneNumberField
from User.models import User, Freelancer, Certification, Test, Test_Result, Has_Skill, Company, Client, Skill, PhoneNumber, Category

from User.exceptions import (AccountNotRegisteredException,
                             InvalidCredentialsException,
                             AccountDisabledException)

class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'rating')

class UserProfileSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'facebook_link', 'linkedin_link')

class FreelancerSerialize(serializers.ModelSerializer):
    class Meta:
        model = Freelancer
        fields = ('id', 'UserId', 'registration_date')

class ClientSerialize(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'UserId', 'registration_date')

class CompanySerialize(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'UserId')

class TestSerialize(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('id', 'test_name', 'test_link')

class CertificationSerialize(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ('id', 'FreelancerId', 'certification_name', 'description', 'date_earned', 'certification_link')

class SkillSerialize(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'skill_name', 'CategoryId')

class CategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category_name')

class HasSkillSerialize(serializers.ModelSerializer):
    class Meta:
        model = Has_Skill
        fields = ('id', 'UserId', 'SkillId')

class TestResultSerialize(serializers.ModelSerializer):
    class Meta:
        model = Test_Result
        fields = ('id', 'FreelancerId', 'TestId', 'start_time', 'end_time', 'result_link', 'score', 'display_on_profile')

class PhoneNumberSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()

    class Meta:
        model = PhoneNumber
        fields = ('phone_number', )
    
    def validate_phone_number(self, value):
        try:
            queryset = User.objects.get(phone__phone_number=value)
            if queryset.phone.is_verified == True:
                err_message = _('Phone number is already verfied')
                raise serializers.ValidationError(err_message)
        except User.DoesNotExist:
            raise AccountDisabledException()
        
        return value

class VerifyPhoneNumberSerializer(serializers.Serializer):
    phone_number = PhoneNumberField()
    otp = serializers.CharField(max_length=settings.TOKEN_LENGTH)

    def validate_phone_number(self, value):
        queryset = User.objects.filter(phone__phone_number=value)
        if not queryset.exists():
            raise AccountNotRegisteredException()
        return value
    
    def validate(self, validated_data):
        phone_number = str(validated_data.get('phone_number'))
        otp = validated_data.get('otp')

        queryset = PhoneNumber.objects.get(phone_number=phone_number)
        queryset.check_verification(security_code=otp)

        return validated_data