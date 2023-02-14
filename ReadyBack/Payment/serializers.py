from rest_framework import serializers
from Payment.models import Payment, Payment_Type

class PaymentSerialize(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'paid_amount' , 'pay_status', 'work_status' , 'recieve_status', 'JobId')

class Payment_TypeSerialize(serializers.ModelSerializer):
    class Meta:
        model = Payment_Type
        fields = ('id', 'type_name')