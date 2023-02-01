from django.urls import include, re_path
from User import views

urlpatterns=[
    re_path(r'^api/users$', views.UsersApi),
    re_path(r'^api/user/(?P<pk>[0-9]+)', views.UserDetailApi),
    re_path(r'^api/user/freelancers$', views.FreelancersApi),
    re_path(r'^api/user/freelancer/(?P<pk>[0-9]+)', views.FreelancerDetailApi),
    re_path(r'^api/user/clients$', views.ClientsApi),
    re_path(r'^api/user/client/(?P<pk>[0-9]+)', views.ClientDetailApi),
    re_path(r'^api/user/companies$', views.CompaniesApi),
    re_path(r'^api/user/company/(?P<pk>[0-9]+)', views.CompanyDetailApi),
    re_path(r'^api/user/tests$', views.TestsApi),
    re_path(r'^api/user/test/(?P<pk>[0-9]+)', views.TestDetailApi),
    re_path(r'^api/user/certifications$', views.CertificationsApi),
    re_path(r'^api/user/certification/(?P<pk>[0-9]+)', views.CertificationDetailApi),
    re_path(r'^api/user/skills$', views.SkillsApi),
    re_path(r'^api/user/skill/(?P<pk>[0-9]+)', views.SkillDetailApi)
]