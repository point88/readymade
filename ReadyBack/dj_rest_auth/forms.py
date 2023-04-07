from allauth.account.models import EmailConfirmation, EmailAddress

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from datetime import datetime

from .app_settings import api_settings


if 'allauth' in settings.INSTALLED_APPS:
    from allauth.account import app_settings as allauth_account_settings
    from allauth.account.adapter import get_adapter
    from allauth.account.forms import ResetPasswordForm as DefaultPasswordResetForm
    from allauth.account.forms import default_token_generator
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
        token_generator = kwargs.get('token_generator', default_token_generator)

        for user in self.users:

            temp_key = token_generator.make_token(user)

            context = {
                'current_site': current_site,
                'user': user,
                'request': request,
                'code': str(hash(temp_key))[-7:-1],
            }
            if (
                allauth_account_settings.AUTHENTICATION_METHOD
                != allauth_account_settings.AuthenticationMethod.EMAIL
            ):
                context['username'] = user_username(user)
            get_adapter(request).send_mail(
                'account/email/password_reset_key', email, context
            )

            id = EmailAddress.objects.filter(email=email).first().id
            emailconfirm = EmailConfirmation.objects.filter(email_address_id=id).first()
            if emailconfirm:
                emailconfirm.key = str(hash(temp_key))[-7:-1]
                emailconfirm.save()
            else:
                EmailConfirmation.objects.create(sent=datetime.now(), key=str(hash(temp_key))[-7:-1], email_address_id=id)
        return self.cleaned_data['email']
