from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from Proposal.serializers import ProposalSerialize, ProposalStatusCatalogSerialize
from Proposal.models import Proposal, Proposal_Status_Catalog
from User.models import Freelancer

# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def ProposalsApi(request):
    if request.method == 'POST':
        proposal = JSONParser().parse(request)
        proposal_serializer = ProposalSerialize(data=proposal)
        if proposal_serializer.is_valid():
            proposal_serializer.save()
            return JsonResponse(proposal_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(proposal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        proposals = Proposal.objects.select_related().all()
        results = []
        for proposal in proposals:
            result = {}
            result['id'] = proposal.id
            result['company'] = proposal.FreelancerId.UserId.name
            result['freelancer'] = proposal.FreelancerId.UserId.name

        return JsonResponse(results, safe=False)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def ProposalDetailApi(request, pk):
    try:
        proposal = Proposal.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The Proposal does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        proposal_serializer = ProposalSerialize(proposal)
        freelancer = Freelancer.objects.get(pk=proposal_serializer.data['FreelancerId'])
        result = proposal_serializer.data
        result['freelancer_name'] = freelancer.UserId.name
    
        return JsonResponse(result)

@csrf_exempt
@api_view(['GET', 'POST'])
def ProposalStatusCatalogsApi(request):
    if request.method == 'GET':
        proposal_status_catalogs = Proposal_Status_Catalog.objects.all()
        proposal_status_catalogs_serializer = ProposalStatusCatalogSerialize(data=proposal_status_catalogs)
        return JsonResponse(proposal_status_catalogs_serializer.data, status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        proposal_status_catalog = JSONParser().parse(request)
        proposal_status_catalog_serializer = ProposalStatusCatalogSerialize(data=proposal_status_catalog)
        if proposal_status_catalog_serializer.is_valid():
            proposal_status_catalog_serializer.save()
            return JsonResponse(proposal_status_catalog_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(proposal_status_catalog_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def ProposalStatusCatalogDetailApi(request, pk):
    if request.method == 'GET':
        proposal_status_catalog = Proposal_Status_Catalog.objects.get(pk=pk)
        proposal_status_catalog_serializer = ProposalStatusCatalogSerialize(data=proposal_status_catalog)
        return JsonResponse(proposal_status_catalog_serializer.data, status=status.HTTP_200_OK)