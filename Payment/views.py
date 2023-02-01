from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
import datetime

from Payment.models import Payment, Payment_Type
from Payment.serializers import PaymentSerialize, Payment_TypeSerialize

# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def PaymentsApi(request):
    if request.method == 'GET':
        payments = Payment.objects.select_related().all()
        
        results = []
        for payment in payments:
            result = {}
            result['id'] = payment.id
            result['paid_amount'] = str(payment.paid_amount)
            result['pay_status'] = payment.pay_status
            result['work_status'] = payment.work_status
            result['recieve_status'] = payment.recieve_status
            result['payment_amount'] = str(payment.JobId.payment_amount)
            results.append(result)
            
        return JsonResponse(results, safe=False)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def PaymentDetailApi(request, pk):
    if request.method == 'GET':
        payment = Payment.objects.get(pk=pk)
        payment_serializer = PaymentSerialize(data=payment)
        return JsonResponse(payment_serializer.data, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def PaymentTypesApi(request):
    if request.method == 'GET':
        payment_types = Payment_Type.objects.all()
        payment_types_serializer = Payment_TypeSerialize(data=payment_types)
        return JsonResponse(payment_types_serializer.data, safe=False)

    if request.method == 'POST':
        payment_type = JSONParser().parse(request)
        print(payment_type)
        payment_type_serializer = Payment_TypeSerialize(data=payment_type)
        if payment_type_serializer.is_valid():
            payment_type_serializer.save()
            return JsonResponse(payment_type_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(payment_type_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def PaymentTypeDetailApi(request, pk):
    if request.method == 'GET':
        payment_type = Payment_Type.objects.get(pk=pk)
        payment_type_serializer = Payment_TypeSerialize(data=payment_type)
        return JsonResponse(payment_type_serializer.data, status=status.HTTP_200_OK)