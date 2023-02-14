from rest_framework import serializers
from Proposal.models import Proposal, Proposal_Status_Catalog


class ProposalSerialize(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ('id', 'proposal_time', 'proposed_payment_amount', 'client_grade', 'client_comment', 'freelancer_grade', 'freelancer_comment', 'JobId', 'FreelancerId', 'PaymentTypeId', 'ProposalStatusId')

class ProposalStatusCatalogSerialize(serializers.ModelSerializer):
    class Meta:
        model = Proposal_Status_Catalog
        fields = ('id', 'status_name')