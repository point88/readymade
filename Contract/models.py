from django.db import models
from User.models import Freelancer, Client
from Payment.models import Payment, Payment_Type
from Proposal.models import Proposal

import datetime

# Create your models here.
class Contract(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    start_time = models.DateField(default=datetime.date.today)
    end_time = models.DateField(default=datetime.date.today)
    budget_amount = models.DecimalField(max_digits=8, decimal_places=2)
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.DO_NOTHING,
        related_name='freelancer_contract'
    )
    ClientId = models.ForeignKey(
        Client,
        on_delete=models.DO_NOTHING,
        related_name='client_contract'
    )
    ProposalId = models.ForeignKey(
        Proposal,
        on_delete=models.DO_NOTHING,
        related_name='proposal_contract'
    )
    PaymentTypeId = models.ForeignKey(
        Payment_Type,
        on_delete=models.DO_NOTHING,
        related_name='payment_type_contract'
    )
    PaymentId = models.OneToOneField(
        Payment,
        on_delete=models.CASCADE,
        related_name='payment_contract'
    )