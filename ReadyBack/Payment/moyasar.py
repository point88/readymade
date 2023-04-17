import subprocess
import json

from django.conf import settings

CURL = "curl "
HTTP_METHOD = lambda method : f"-X {method} "
MOYASAR_URL = "https://api.moyasar.com/v1/"
ENDPOINT = lambda id, transaction, action : f"{transaction} " if not id else f"{transaction}/{id} " if not action else f"{transaction}/{id}/{action} "
BULK_INVOICE_ENDPOINT = "invoices/bulk "
AUTH = lambda key : f"-u {key}: "

class Moyasar:
    def __init__(self):
        self.EMPTY = ""
        self.PUT_METHOD = "PUT"
        self.POST_METHOD = "POST"

        self.CANCEL_ACTION = "cancel"
        self.REFUND_ACTION = "refund"
        self.VOID_ACTION = "void"
        self.CAPTURE_ACTION = "capture"

        self.INVOICE_TRANSACTION = "invoices"
        self.PAYMENT_TRANSACTION = "payments"
        self.TOKEN_TRANSACTION = "tokens"
    
    def execute(self):
        result = subprocess.run(self.command, shell=True, check=True, capture_output=True)
        output = result.stdout.decode("utf-8")
        return json.loads(output)
    
    def prepareCreatePayment(self, data):
        data['amount'] = int(data['amount'] * 100)
        self.command = CURL + \
            HTTP_METHOD(self.POST_METHOD) + \
            MOYASAR_URL + \
            ENDPOINT(self.EMPTY, self.PAYMENT_TRANSACTION, self.EMPTY) + \
            AUTH(settings.SECRET_KEY)
        self.command = self.command + '-d amount=' + \
            str(data['amount']) + ' -d currency=' + \
            data['currency'] + ' -d callback_url="' + \
            data['callback_url'] + '" -d source[type]="creditcard"' + \
            ' -d source[name]="' + data['cardholder_name'] + '" -d source[number]="' + data['card_number'] +\
            '" -d source[cvc]=' + str(data['cvc']) + ' -d source[month]=' + str(data['expire_month']) +\
            ' -d source[year]=' + str(data['expire_year'])