from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status

from Contract.models import Contract
from Payment.models import Payment
from Job.models import Job
from Proposal.models import Proposal
from Contract.serializers import ContractSerialize
from rest_framework.decorators import api_view

# Create your views here.

@csrf_exempt
@api_view(['GET', 'POST'])
def ContractsApi(request):
    if request.method == "POST":
        contract = JSONParser().parse(request)
        try:
            payment = Payment(JobId=Job.objects.get(pk=contract['JobId']))
            payment.save()
            contract['PaymentId'] = payment.id
        except:
            print('message', 'The Contract does not exist')
        
        contract_serializer = ContractSerialize(data=contract)
        if contract_serializer.is_valid():
            contract_serializer.save()
            return JsonResponse(contract_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(contract_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        contracts = Contract.objects.select_related().all()
        results = []
        for contract in contracts:
            result = {}
            result['id'] = contract.id
            result['company'] = contract.ClientId.CompanyId.name
            result['freelancer'] = contract.FreelancerId.UserId.name

        return JsonResponse(results, status=status.HTTP_201_CREATED, safe=False)

@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def ContractDetailApi(request, pk):
    try:
        contract = Contract.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The Contract does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        contract_serializer = ContractSerialize(contract)
        proposal = Proposal.objects.get(pk=contract_serializer.data['ProposalId'])
        result = contract_serializer.data
        result['proposal_time'] = proposal.proposal_time
    
        return JsonResponse(result)