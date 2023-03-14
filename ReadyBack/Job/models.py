from django.db import models
from User.models import Client, Skill


# Create your models here.

class Expected_Duration(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    duration_text = models.CharField(max_length=255)

class Job(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    title = models.CharField(max_length=255, default="")
    description = models.TextField()
    is_contest = models.BooleanField(default=False)
    is_hourly = models.BooleanField(default=False)
    is_recruiter_project = models.BooleanField(default=False)
    currency_type = models.CharField(max_length=3, default="USD")
    payment_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    ExpectedDurationId = models.ForeignKey(
        Expected_Duration,
        on_delete=models.DO_NOTHING,
        related_name='exptected_duration_job'
    )
    
    ClientId = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='client_job'
    )
    MainSkillId = models.ForeignKey(
        Skill, 
        on_delete=models.SET_DEFAULT,
        default=0,
        related_name='skill_job'
    )
    PaymentTypeId = models.ForeignKey(
        'Payment.Payment_Type',
        on_delete=models.SET_DEFAULT,
        default=0,
        related_name='payment_type_job'
    )

class Other_Skills(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    SkillId = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name='skill_other_skill'
    )
    JobId = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='job_other_skill'
    )
    
class Job_Attachment(models.Model):
    id  = models.BigAutoField(auto_created=True, primary_key=True)
    JobId = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='job_job_attachement'
    )
    attachment_link = models.CharField(max_length=255, default="")