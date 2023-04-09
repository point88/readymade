from django.urls import include, re_path
from Contract import views

urlpatterns = [
    re_path(r'^contracts$', views.ContractsApi),
    re_path(r'^contract/(?P<pk>[0-9]+)', views.ContractDetailApi)
]
