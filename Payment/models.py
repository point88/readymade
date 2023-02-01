from django.db import models
from Job.models import Job

# Create your models here.
class Payment(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    paid_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    pay_status = models.CharField(max_length=255, default="")
    work_status = models.CharField(max_length=255, default="")
    recieve_status = models.CharField(max_length=255, default="")
    JobId = models.ForeignKey(
        Job, 
        on_delete=models.DO_NOTHING,
        related_name='job_payment'
    )


class Payment_Type(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    type_name = models.CharField(max_length=128)