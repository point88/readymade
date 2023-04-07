from django.urls import include, re_path, path
from User import views
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView, ResendEmailVerificationView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView, UserDetailsView, ActivationCodeVerifyView

from rest_framework_simplejwt.views import TokenVerifyView
from dj_rest_auth.jwt_auth import get_refresh_view

urlpatterns=[
    path('send-sms', views.SendOrResendSMSAPI.as_view(), name='send_resend_sms'),
    path('verify-phone', views.VerifyPhoneNumberAPI.as_view(), name='verify_phone_number'),

    path('user', UserDetailsView.as_view()),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('verify-email', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('verify-code', ActivationCodeVerifyView.as_view(), name='rest_verify_code'),
    path('resend-email', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh', get_refresh_view().as_view(), name='token_refresh'),
    path('password/reset', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('facebook', views.FacebookLogin.as_view(), name='fb_login'),
    path('google', views.GoogleLogin.as_view(), name='google_login'),
    path('apple', views.AppleLogin.as_view(), name='apple_login'),

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
    re_path(r'^api/user/skill/(?P<pk>[0-9]+)', views.SkillDetailApi),
    re_path(r'^api/user/hasskills$', views.HasSkillsApi),
    re_path(r'^api/user/testresults$', views.TestResultsApi),
    re_path(r'^api/user/testresult/(?P<pk>[0-9]+)', views.TestResultDetailApi),
    re_path(r'^api/user/categories$', views.CategoryApi)
]