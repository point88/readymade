from django.test import TestCase
from rest_framework.test import APITestCase

import string
import random
import time

# Create your tests here.

def generate_str(N):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

def generate_num(N):
    return random.randrange(N)

def generate_date():
    return "2022-03-21"

def generate_time():
    return "00:00:00"

class MessageTest(APITestCase):
    def test_message_latency(self):
        return