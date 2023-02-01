from django.db import models
from User.models import Freelancer, Client
from Proposal.models import Proposal

# Create your models here.
class Message(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    message_time = models.DateTimeField()
    message_text = models.TextField()
    ProposalId = models.ForeignKey(
        Proposal,
        on_delete=models.DO_NOTHING,
        related_name='proposal_message'
    )
    ClientId = models.ForeignKey(
        Client,
        on_delete=models.DO_NOTHING,
        related_name='client_message'
    )
    FreelancerId = models.ForeignKey(
        Freelancer,
        on_delete=models.DO_NOTHING,
        related_name='freelancer_message'
    )

class Attachment(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True)
    attachment_link = models.TextField()
    MessageId = models.ForeignKey(
        Message, 
        on_delete=models.CASCADE,
        related_name='message_attachment'
    )
