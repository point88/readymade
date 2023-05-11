import os

from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from Job.serializers import JobSerialize, JobStatisticsSerializer
from Job.models import Job

from django_drf_filepond.api import store_upload
from django_drf_filepond.models import TemporaryUpload
# Create your views here.

# deprecated need to clean up
@api_view(['POST'])
@permission_classes([])
def JobStatisticsApi(request):
    if request.method == "POST":
        cats = JSONParser().parse(request)
        cat_ids = cats['categories']
        result = JobStatisticsSerializer(cat_ids)
        return JsonResponse(list(result), status=status.HTTP_200_OK, safe=False)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def JobsApi(request):
    if request.method == 'POST':
        job = JSONParser().parse(request)
        try:
            filepond_ids = job['filepond']
        except KeyError:
            filepond_ids = []
        
        stored_uploads = []
        for upload_id in filepond_ids:
            tu = TemporaryUpload.objects.get(upload_id=upload_id)
            store_upload(upload_id, os.path.join(upload_id, tu.upload_name))
            stored_uploads.append(upload_id)

        job['uploads'] = stored_uploads
        
        serializer = JobSerialize(job)
        if not serializer.validate():
            return Response({'UserId or PaymetTypeId': 'Not existing'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        
        return Response({'detail': serializer.save()}, status=status.HTTP_200_OK)

    
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

@api_view(['GET', 'PUT', 'DELTE'])
@permission_classes([IsAuthenticated])
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
