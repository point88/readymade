from django.urls import path
from Search import views
from Search.views import SearchJobUser

urlpatterns = [
    path('search/<str:query>/', SearchJobUser.as_view())
]
