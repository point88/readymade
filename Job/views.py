from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view

from Job.serializers import JobSerialize, ExpectedDurationSerialize
import Job.models
# Create your views here.

@csrf_exempt
@api_view(['GET', 'POST'])
def JobsApi(request):
    if request.method == 'POST':
        job = JSONParser().parse(request)
        job_serializer = JobSerialize(data = job)
        if job_serializer.is_valid():
            job_serializer.save()
            return JsonResponse(job_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(job_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        jobs = Job.models.Job.objects.select_related().all()
        results = []
        for job in jobs:
            result = {}
            result['id'] = job.id
            result['description'] = job.description
            result['payment_amount'] = str(job.payment_amount)
            result['expected_duration'] = job.ExpectedDurationId.duration_text
            result['main_skill'] = job.MainSkillId.skill_name
            result['payment_type'] = job.PaymentTypeId.type_name
            result['client_name'] = job.ClientId.UserId.name
            results.append(result)
            
        return JsonResponse(results, status=status.HTTP_201_CREATED, safe=False)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELTE'])
def JobDetailApi(request, pk):
    if request.method == 'GET':
        try:
            job = Job.models.Job.objects.select_related().get(pk=pk)
        except:
            return JsonResponse({'message': 'The Job does not exist'}, status=status.HTTP_404_NOT_FOUND)
        result = {}
        result['id'] = job.id
        result['description'] = job.description
        result['payment_amount'] = job.payment_amount
        result['expected_duration'] = job.ExpectedDurationId.duration_text
        result['main_skill'] = job.MainSkillId.skill_name
        result['payment_type'] = job.PaymentTypeId.type_name
        result['client_name'] = job.ClientId.UserId.name
        return JsonResponse(result)

@csrf_exempt
@api_view(['GET', 'POST'])
def ExpectedDurationsApi(request):
    if request.method == 'GET':
        expected_durations = Job.models.Expected_Duration.objects.all()
        expected_durations_serializer = ExpectedDurationSerialize(data=expected_durations)
        return JsonResponse(expected_durations_serializer.data, safe=False)
    if request.method == 'POST':
        expected_duration = JSONParser().parse(request)
        expected_duration_serializer = ExpectedDurationSerialize(data=expected_duration)
        if expected_duration_serializer.is_valid():
            expected_duration_serializer.save()
            return JsonResponse(expected_duration_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(expected_duration_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def ExpectedDurationDetailApi(request, pk):
    if request.method == 'GET':
        try:
            expected_duration = Job.models.Expected_Duration.objects.get(pk=pk)
        except:
            return JsonResponse({'message': 'The Except_Duration does not exist'}, status=status.HTTP_404_NOT_FOUND)
        expected_duration_serializer = ExpectedDurationSerialize(data=expected_duration)
        return JsonResponse(expected_duration_serializer.data, status=status.HTTP_200_OK)
