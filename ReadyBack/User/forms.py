from django import forms

from allauth.account.forms import ResetPasswordForm

class ResetPasswordForm(ResetPasswordForm):

    def _send_password_reset_mail(self, request, email, users, **kwargs):
        return