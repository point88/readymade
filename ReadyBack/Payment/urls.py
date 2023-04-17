from django.urls import re_path
from Payment import views

urlpatterns = [
    re_path(r'^payment/create', views.MakePaymentApi),
    re_path(r'^payments$', views.PaymentsApi),
    re_path(r'^payment/(?P<pk>[0-9]+)', views.PaymentDetailApi),
    re_path(r'^payment_types$', views.PaymentTypesApi),
    re_path(r'^payment_type/(?P<pk>[0-9]+)', views.PaymentTypeDetailApi)
]
