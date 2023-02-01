from django.urls import include, re_path
from Message import views

urlpatterns = [
    re_path(r'^api/messages$', views.MessagesApi),
    re_path(r'^api/message/(?P<pk>[0-9]+)', views.MessageDetailApi),
]
