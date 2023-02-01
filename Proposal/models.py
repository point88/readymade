from django.db import models
from User.models import Freelancer
from Payment.models import Payment_Type
from Job.models import Job

import datetime

# Create your models here.
class Proposal_Status_Catalog(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    status_name = models.CharField(max_length=128)

class Proposal(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    proposal_time = models.DateTimeField(default=datetime.date.today)
    proposed_payment_amount = models.DecimalField(max_digits=8, decimal_places=2)
    client_grade = models.IntegerField(default=0)
    client_comment = models.TextField(default='')
    freelancer_grade = models.IntegerField(default=0)
    freelancer_comment = models.TextField(default='')
    JobId = models.ForeignKey(
        Job,
        on_delete=models.DO_NOTHING,
        related_name='job_proposal'
    )
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.DO_NOTHING,
        related_name='freelancer_proposal'
    )
    PaymentTypeId = models.ForeignKey(
        Payment_Type,
        on_delete=models.DO_NOTHING,
        related_name='payment_type_proposal'
    )
    ProposalStatusId = models.ForeignKey(
        Proposal_Status_Catalog,
        on_delete=models.DO_NOTHING,
        related_name='proposal_status_catalog_proposal'
    )
