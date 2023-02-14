from django.urls import re_path
from Job import views

urlpatterns = [
    re_path(r'^api/jobs$', views.JobsApi),
    re_path(r'^api/job/(?P<pk>[0-9]+)', views.JobDetailApi),
    re_path(r'^api/job/expected_durations$', views.ExpectedDurationsApi),
    re_path(r'^api/job/expected_duration/(?P<pk>[0-9]+)', views.ExpectedDurationDetailApi)
]
