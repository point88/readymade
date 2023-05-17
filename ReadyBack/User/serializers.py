from django.conf import settings
from django.utils.translation import gettext as _
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from phonenumber_field.serializerfields import PhoneNumberField
from User.models import User, Freelancer, Certification, Test, Test_Result, Has_Skill, Company, Client, Skill, PhoneNumber, Category
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from django_elasticsearch_dsl import Document, fields, IntegerField
from Search.Documents import UserDocument,SkillDocument,HasSkillDocument
from User.exceptions import (AccountNotRegisteredException,
                             InvalidCredentialsException,
                             AccountDisabledException)

UserModel = get_user_model()

class UserProfileSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'facebook_link', 'linkedin_link', 'profile_image')

class FreelancerSerialize(serializers.ModelSerializer):
    attrs = None

    class Meta:
        model = Freelancer
        fields = ('id', 'UserId', 'registration_date')
    
    def validate(self, attrs):
        self.attrs = attrs
        return attrs
    
    def save(self):
        return Freelancer.objects.create(registration_date=self.attrs["registration_date"], UserId_id=self.attrs['UserId'].id)
        

class ClientSerialize(serializers.ModelSerializer):
    attrs = None

    class Meta:
        model = Client
        fields = ('id', 'UserId', 'registration_date')

    def validate(self, attrs):
        self.attrs = attrs
        return attrs
    
    def save(self):
        return Client.objects.create(registration_date=self.attrs["registration_date"], UserId_id=self.attrs['UserId'].id)
        

class CompanySerialize(serializers.ModelSerializer):
    attrs = None
    
    class Meta:
        model = Company
        fields = ('id', 'name', 'UserId')
    
    def validate(self, attrs):
        self.attrs = attrs
        return attrs
    
    def save(self):
        return Company.objects.create(name=self.attrs["name"], UserId_id=self.attrs['UserId'].id)

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

def TopFreelancerSerializer(numbers):
    top_lancers = Freelancer.objects.all().order_by('-UserId__rating')

    user_ids = [top_lancers[i].UserId.id for i in range(min(numbers, len(top_lancers)))]

    cats = Has_Skill.objects.filter(UserId__in=user_ids).select_related("SkillId").select_related("SkillId__CategoryId").values('UserId', 'SkillId__CategoryId', 'SkillId__CategoryId__category_name').distinct().all()

    result = []
    for i in range(min(numbers, len(top_lancers))):
        lancer = {}
        lancer['rating']        = top_lancers[i].UserId.rating
        lancer['first_name']    = top_lancers[i].UserId.first_name
        lancer['last_name']     = top_lancers[i].UserId.last_name
        lancer['profile_image'] = top_lancers[i].UserId.profile_image
        lancer['hourly']        = top_lancers[i].hourly
        lancer['bio']           = top_lancers[i].overview
        categories = []
        
        for j in range(len(cats)):
            if cats[j]['UserId'] == top_lancers[i].UserId.id:
                categories.append(cats[j]['SkillId__CategoryId__category_name'])
        lancer['category']      = categories
        
        result.append(lancer)
    
    return result

class SkillSerializer(DocumentSerializer):
    
    class Meta:
        model = Skill
        document = SkillDocument
        fields = ["name"]
        read_only = True

class HasSkillSerializer(DocumentSerializer):
    skill_name = SkillSerializer(read_only=True)

    class Meta:
        model = Has_Skill
        document = HasSkillDocument
        fields = ["SkillId", "UserId", "skill_name"]  
        read_only = True

class SkillNameSerializer(serializers.Serializer):
    skill_name = serializers.CharField()

class UserSerializer(DocumentSerializer):
    skill_names = serializers.SerializerMethodField()

    class Meta:
        model = User
        document = UserDocument
        fields = [
            'id',
            "username",
            "first_name",
            "last_name",
            "skill_names",
        ]
        read_only_fields = fields

    def get_skill_names(self, obj):
        return [skill['skill_name'] for skill in obj.skill_names]