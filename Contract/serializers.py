from rest_framework import serializers
from Contract.models import Contract

class ContractSerialize(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ('id', 'start_time', 'end_time', 'budget_amount', 'FreelancerId', 'ClientId', 'ProposalId', 'PaymentTypeId', 'PaymentId')