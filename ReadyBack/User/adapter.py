from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        if 'activate_url' in context:
            context['activate_url'] = settings.URL_FRONT + 'new/email-verified/' + context['key']
            otp = context['key']
            context['otp'] = otp[len(otp)-6:len(otp)]
        elif 'password_reset_url' in context:
            link = context['password_reset_url']
            context['password_reset_url'] = settings.URL_FRONT + 'verifyreset/' + link.split("confirm/")[1]
        print(context)
        msg = self.render_mail(template_prefix, email, context)
        msg.send()