from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from datetime import datetime
import secrets
import string

from .app_settings import api_settings


if 'allauth' in settings.INSTALLED_APPS:
    from allauth.account import app_settings as allauth_account_settings
    from allauth.account.adapter import get_adapter
    from allauth.account.forms import ResetPasswordForm as DefaultPasswordResetForm
    from allauth.account.utils import (
        filter_users_by_email,
        user_pk_to_url_str,
        user_username,
    )
    from allauth.utils import build_absolute_uri

class AllAuthPasswordResetForm(DefaultPasswordResetForm):
    def clean_email(self):
        """
        Invalid email should not raise error, as this would leak users
        for unit test: test_password_reset_with_invalid_email
        """
        email = self.cleaned_data["email"]
        email = get_adapter().clean_email(email)
        self.users = filter_users_by_email(email, is_active=True)
        return self.cleaned_data["email"]

    def save(self, request, **kwargs):
        current_site = get_current_site(request)
        email = self.cleaned_data['email']

        new_password = ''.join(secrets.choice(string.ascii_uppercase + string.ascii_lowercase) for i in range(9))

        for user in self.users:

            context = {
                'current_site': current_site,
                'user': user,
                'request': request,
                'code': new_password
            }
            if (
                allauth_account_settings.AUTHENTICATION_METHOD
                != allauth_account_settings.AuthenticationMethod.EMAIL
            ):
                context['username'] = user_username(user)
            get_adapter(request).send_mail(
                'account/email/password_reset_key', email, context
            )

            user.set_password(new_password)
            user.save()
        return self.cleaned_data['email']
