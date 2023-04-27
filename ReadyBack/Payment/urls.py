from django.urls import path
from Payment import views

urlpatterns = [
    path('payment/create', views.MakePaymentApi),
    path('payments', views.PaymentsApi),
    path('payment/<int:pk>', views.PaymentDetailApi),
    path('payment_types', views.PaymentTypesApi),
    path('payment_type/<int:pk>', views.PaymentTypeDetailApi)
]
