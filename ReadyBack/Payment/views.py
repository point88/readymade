from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from Payment.models import Payment, Payment_Type
from Payment.serializers import PaymentSerialize, Payment_TypeSerialize

from Payment.moyasar import Moyasar

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def MakePaymentApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        payment = Moyasar()
        result = payment.createPayment(data)
        return JsonResponse(result, safe=False)

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


@api_view(['GET', 'PUT', 'DELETE'])
def PaymentDetailApi(request, pk):
    if request.method == 'GET':
        payment = Payment.objects.get(pk=pk)
        payment_serializer = PaymentSerialize(data=payment)
        return JsonResponse(payment_serializer.data, safe=False)

@api_view(['GET', 'POST'])
def PaymentTypesApi(request):
    if request.method == 'GET':
        payment_types = Payment_Type.objects.all()
        payment_types_serializer = Payment_TypeSerialize(payment_types, many=True)
        return JsonResponse(payment_types_serializer.data, status=status.HTTP_200_OK, safe=False)


    if request.method == 'POST':
        payment_type = JSONParser().parse(request)
        payment_type_serializer = Payment_TypeSerialize(data=payment_type)
        if payment_type_serializer.is_valid():
            payment_type_serializer.save()
            return JsonResponse(payment_type_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(payment_type_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def PaymentTypeDetailApi(request, pk):
    if request.method == 'GET':
        payment_type = Payment_Type.objects.get(pk=pk)
        payment_type_serializer = Payment_TypeSerialize(data=payment_type)
        return JsonResponse(payment_type_serializer.data, status=status.HTTP_200_OK)