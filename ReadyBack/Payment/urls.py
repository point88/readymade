from django.urls import re_path
from Payment import views

urlpatterns = [
    re_path(r'^api/payments$', views.PaymentsApi),
    re_path(r'^api/payment/(?P<pk>[0-9]+)', views.PaymentDetailApi),
    re_path(r'^api/payment_types$', views.PaymentTypesApi),
    re_path(r'^api/payment_type/(?P<pk>[0-9]+)', views.PaymentTypeDetailApi)
]
