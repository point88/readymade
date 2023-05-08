from django.contrib.sites.shortcuts import get_current_site
from allauth.account.adapter import DefaultAccountAdapter

from django.conf import settings

class DefaultAccountAdapter(DefaultAccountAdapter):
    
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": settings.URL_FRONT + 'new/email-verified/' + emailconfirmation.email_address.email + "-" + emailconfirmation.key,
            "current_site": current_site
        }
        if signup:
            email_template = "account/email/email_confirmation_signup"
        else:
            email_template = "account/email/email_confirmation"
        
        self.send_mail(email_template, emailconfirmation.email_address.email, ctx)


    def send_mail(self, template_prefix, email, context):
        msg = self.render_mail(template_prefix, email, context)
        msg.send()

    #def generate_emailconfirmation_key(self, email):
    #    key = str(randint(100000, 999999))
    #    return key