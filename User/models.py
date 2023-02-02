from django.db import models


# Create your models here.

class User_Account(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    firstname = models.CharField(max_length=128)
    secondname = models.CharField(max_length=128)
    verified = models.BooleanField(default=False)
    rating = models.SmallIntegerField(default=0)
    role = models.SmallIntegerField(default=1)

class Freelancer(models.Model):
    id = models.BigAutoField(auto_created=True,primary_key=True)
    UserId = models.OneToOneField(
        User_Account,
        on_delete = models.CASCADE,
        related_name='user_freelancer',
    )
    registration_date = models.DateField(auto_created=True)
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
    date_earned = models.DateField(auto_created=True)
    certification_link = models.TextField()

class Test(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    test_name = models.CharField(max_length=128)
    test_link = models.TextField(default="")

class TestResult(models.Model):
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


class Skill(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    skill_name = models.CharField(max_length=128)

class HasSkill(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.CASCADE,
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
    name = models.CharField(max_length=128)
    location = models.CharField(max_length=255)

class Client(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    UserId = models.OneToOneField(
        User_Account,
        on_delete = models.CASCADE,
        related_name='user_client',
    )
    registration_date = models.DateField(auto_created=True)
    country = models.CharField(max_length=255)
    CompanyId = models.OneToOneField(
        Company,
        on_delete = models.SET_DEFAULT,
        default = 0,
        related_name='company_client'
    )
