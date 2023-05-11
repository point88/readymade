import pycurl
import io
from urllib.parse import urlencode
import json

from django.conf import settings

MOYASAR_URL = "https://api.moyasar.com/v1/"
ENDPOINT = lambda id, transaction, action : f"{transaction}" if not id else f"{transaction}/{id}" if not action else f"{transaction}/{id}/{action}"
BULK_INVOICE_ENDPOINT = "invoices/bulk"

class Moyasar:
    def __init__(self):
        self.EMPTY = ""

        self.CANCEL_ACTION = "cancel"
        self.REFUND_ACTION = "refund"
        self.VOID_ACTION = "void"
        self.CAPTURE_ACTION = "capture"

        self.INVOICE_TRANSACTION = "invoices"
        self.PAYMENT_TRANSACTION = "payments"
        self.TOKEN_TRANSACTION = "tokens"

        self.ENCODE = 'iso-8859-1'
    
    def createPayment(self, data):
        status = 200
        data['amount'] = int(data['amount'] * 100)
        buffer = io.BytesIO()
        post_data = {'amount': data['amount'],
                     'currency': data['currency'],
                     'callback_url': data['callback_url'],
                     'source[type]': 'creditcard',
                     'source[name]': data['cardholder_name'],
                     'source[number]': data['card_number'],
                     'source[cvc]': data['cvc'],
                     'source[month]': data['expire_month'],
                     'source[year]': data['expire_year']}
        postfields = urlencode(post_data)

        crl = pycurl.Curl()

        crl.setopt(crl.URL, MOYASAR_URL+ENDPOINT(self.EMPTY, self.PAYMENT_TRANSACTION, self.EMPTY))
        crl.setopt(crl.USERPWD, settings.SECRET_KEY)
        crl.setopt(crl.WRITEDATA, buffer)
        crl.setopt(crl.POSTFIELDS, postfields)
 
        crl.perform()
        status = crl.getinfo(pycurl.HTTP_CODE)
        crl.close()

        return json.loads(buffer.getvalue().decode(self.ENCODE)), status
