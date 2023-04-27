from django.urls import path
from Job import views

urlpatterns = [
    path('jobs', views.JobsApi),
    path('job/<int:pk>', views.JobDetailApi),
    # need to clean up, depreated
    path('job/statistics/countbycat', views.JobStatisticsApi),
]
