from django.urls import re_path
from Job import views

urlpatterns = [
    re_path(r'^jobs$', views.JobsApi),
    re_path(r'^job/(?P<pk>[0-9]+)', views.JobDetailApi),
]
