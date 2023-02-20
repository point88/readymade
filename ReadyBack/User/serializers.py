from rest_framework import serializers
from User.models import User, Freelancer, Certification, Test, Test_Result, Has_Skill, Company, Client, Skill


class UserSerialize(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password', 'phone', 'firstname', 'secondname', 'verified', 'rating', 'role')


class FreelancerSerialize(serializers.ModelSerializer):
    class Meta:
        model = Freelancer
        fields = ('id', 'UserId', 'registration_date', 'country', 'overview')

class ClientSerialize(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'UserId', 'registration_date', 'country', 'CompanyId')

class CompanySerialize(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'location')

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
        fields = ('id', 'skill_name')

class HasSkillSerialize(serializers.ModelSerializer):
    class Meta:
        model = Has_Skill
        fields = ('id', 'FreelancerId', 'SkillId')

class TestResultSerialize(serializers.ModelSerializer):
    class Meta:
        model = Test_Result
        fields = ('id', 'FreelancerId', 'TestId', 'start_time', 'end_time', 'result_link', 'score', 'display_on_profile')