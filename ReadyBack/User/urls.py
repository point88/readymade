from django.urls import include, re_path, path
from User import views
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ResendEmailVerificationView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, UserDetailsView

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
    path('resend-email', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh', get_refresh_view().as_view(), name='token_refresh'),
    path('password/reset', PasswordResetView.as_view(), name='rest_password_reset'),

    path('facebook', views.FacebookLogin.as_view(), name='fb_login'),
    path('google', views.GoogleLogin.as_view(), name='google_login'),
    path('apple', views.AppleLogin.as_view(), name='apple_login'),

    re_path(r'^user/(?P<pk>[0-9]+)', views.UserDetailApi),
    re_path(r'^user/skills$', views.SkillsApi),
    re_path(r'^user/skill/(?P<pk>[0-9]+)', views.SkillByCategoryApi),
    re_path(r'^user/hasskills$', views.HasSkillsApi),
    re_path(r'^user/categories$', views.CategoryApi)
]