import json

from allauth.account import app_settings as allauth_account_settings
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import mail
from django.core.exceptions import ImproperlyConfigured
from django.test import TestCase, modify_settings, override_settings
from django.utils.encoding import force_str
from rest_framework import status
from rest_framework.test import APIRequestFactory
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.models import get_token_model
from .mixins import TestsMixin
from .utils import override_api_settings

try:
    from django.urls import reverse
except ImportError:  # pragma: no cover
    from django.core.urlresolvers import reverse

from jwt import decode as decode_jwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TESTTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['name'] = user.username
        token['email'] = user.email

        return token


@override_settings(ROOT_URLCONF='tests.urls')
class APIBasicTests(TestsMixin, TestCase):
    """
    Case #1:
    - user profile: defined
    - custom registration: backend defined
    """

    # urls = 'tests.urls'

    PASS = 'person'
    EMAIL = 'person1@world.com'
    REGISTRATION_VIEW = 'rest_auth.runtests.RegistrationView'

    # data without user profile
    REGISTRATION_DATA = {
        'email': EMAIL,
        'password': PASS
    }

    def setUp(self):
        self.init()

    @override_settings(
        ACCOUNT_AUTHENTICATION_METHOD=allauth_account_settings.AuthenticationMethod.EMAIL
    )
    def test_allauth_login_with_email(self):
        payload = {
            'email': self.EMAIL,
            'password': self.PASS,
        }
        # there is no users in db so it should throw error (400)
        self.post(self.login_url, data=payload, status_code=400)

        self.post(self.password_change_url, status_code=403)

        # create user
    def test_password_change(self):
        login_payload = {
            'username': self.USERNAME,
            'password': self.PASS,
        }
        get_user_model().objects.create_user(self.USERNAME, '', self.PASS)
        self.post(self.login_url, data=login_payload, status_code=200)
        self.token = self.response.json['key']

        new_password_payload = {
            'new_password1': 'new_person',
            'new_password2': 'new_person',
        }
        self.post(
            self.password_change_url,
            data=new_password_payload,
            status_code=200,
        )

        # user should not be able to login using old password
        self.post(self.login_url, data=login_payload, status_code=400)

        # new password should work
        login_payload['password'] = new_password_payload['new_password1']
        self.post(self.login_url, data=login_payload, status_code=200)

        # pass1 and pass2 are not equal
        new_password_payload = {
            'new_password1': 'new_person1',
            'new_password2': 'new_person',
        }
        self.post(
            self.password_change_url,
            data=new_password_payload,
            status_code=400,
        )

        # send empty payload
        self.post(self.password_change_url, data={}, status_code=400)
    @override_api_settings(OLD_PASSWORD_FIELD_ENABLED=True)
    def test_password_change_with_old_password(self):
        login_payload = {
            'username': self.USERNAME,
            'password': self.PASS,
        }
        get_user_model().objects.create_user(self.USERNAME, '', self.PASS)
        self.post(self.login_url, data=login_payload, status_code=200)
        self.token = self.response.json['key']

        new_password_payload = {
            'old_password': f'{self.PASS}!',  # wrong password
            'new_password1': 'new_person',
            'new_password2': 'new_person',
        }
        self.post(
            self.password_change_url,
            data=new_password_payload,
            status_code=400,
        )

        new_password_payload = {
            'old_password': self.PASS,
            'new_password1': 'new_person',
            'new_password2': 'new_person',
        }
        self.post(
            self.password_change_url,
            data=new_password_payload,
            status_code=200,
        )

        # user should not be able to login using old password
        self.post(self.login_url, data=login_payload, status_code=400)

        # new password should work
        login_payload['password'] = new_password_payload['new_password1']
        self.post(self.login_url, data=login_payload, status_code=200)

    def _password_reset(self):
        user = get_user_model().objects.create_user(self.USERNAME, self.EMAIL, self.PASS)

        # call password reset
        mail_count = len(mail.outbox)
        payload = {'email': self.EMAIL}
        self.post(self.password_reset_url, data=payload, status_code=200)
        self.assertEqual(len(mail.outbox), mail_count + 1)

        url_kwargs = self._generate_uid_and_token(user)
        url = reverse('rest_password_reset_confirm')

        # wrong token
        data = {
            'new_password1': self.NEW_PASS,
            'new_password2': self.NEW_PASS,
            'uid': force_str(url_kwargs['uid']),
            'token': '-wrong-token-',
        }
        self.post(url, data=data, status_code=400)

        # wrong uid
        data = {
            'new_password1': self.NEW_PASS,
            'new_password2': self.NEW_PASS,
            'uid': '-wrong-uid-',
            'token': url_kwargs['token'],
        }
        self.post(url, data=data, status_code=400)

        # wrong token and uid
        data = {
            'new_password1': self.NEW_PASS,
            'new_password2': self.NEW_PASS,
            'uid': '-wrong-uid-',
            'token': '-wrong-token-',
        }
        self.post(url, data=data, status_code=400)

        # valid payload
        data = {
            'new_password1': self.NEW_PASS,
            'new_password2': self.NEW_PASS,
            'uid': force_str(url_kwargs['uid']),
            'token': url_kwargs['token'],
        }
        url = reverse('rest_password_reset_confirm')
        self.post(url, data=data, status_code=200)

        payload = {
            'username': self.USERNAME,
            'password': self.NEW_PASS,
        }
        self.post(self.login_url, data=payload, status_code=200)
        self.post(self.register_url, data=self.REGISTRATION_DATA)

        self.post(self.login_url, data=payload, status_code=200)

