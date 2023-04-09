from django.urls import include, re_path
from Message import views

urlpatterns = [
    re_path(r'^messages$', views.MessagesApi),
    re_path(r'^message/(?P<pk>[0-9]+)', views.MessageDetailApi),
]
