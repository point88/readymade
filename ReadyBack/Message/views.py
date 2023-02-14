from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
import datetime

from Message.serializers import MessageSerialize, AttachmentSerialize
from Message.models import Message, Attachment
# Create your views here.

@csrf_exempt
@api_view(['GET', 'POST'])
def MessagesApi(request):
    if request.method == 'POST':
        message = JSONParser().parse(request)
        message_serializer = MessageSerialize(data=message)
        if message_serializer.is_valid():
            message_serializer.save()
            return JsonResponse(message_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        messages = Message.objects.select_related().all()

        results = []
        for message in messages:
            result={}
            result['id'] = message.id
            result['freelancer_name'] = message.FreelancerId.UserId.name
            result['client_name'] = message.ClientId.UserId.name
            results.append(result)
        return JsonResponse(results, status=status.HTTP_201_CREATED, safe=False)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def MessageDetailApi(request, pk):
    try:
        message = Message.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The message does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result = {}
        result['id'] = message.id
        result['message'] = message.message_text
        result['freelancer_name'] = message.FreelancerId.UserId.name
        return JsonResponse(result)