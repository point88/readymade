from rest_framework.test import APITestCase
from django.test import TestCase
from User.models import User_Account, Freelancer, Client, Certification, Test, TestResult, Skill, Company

import string
import random
import time

company_num = 200
freelancer_num = 1000
client_num = 1000
skill_num = 100
certification_num = 100
test_num = 200

def generate_str(N):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

def generate_num(N):
    return random.randrange(N)

def generate_date():
    return "2022-03-21"

# Create your tests here.
class APreparingTest(APITestCase):
    def test_setUp(self):
        # cpu time and wall time for each post api
        ## company
        st = time.process_time()
        self.client.post('/api/user/companies', {'name': generate_str(10), 'location':generate_str(10)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create company:', et - st, 'seconds')

        ## skill
        st = time.process_time()
        self.client.post('/api/user/skills', {'skill_name': generate_str(20)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create skill:', et - st, 'seconds')

        ## test
        st = time.process_time()
        self.client.post('/api/user/tests', {'test_name': generate_str(20), 'test_link':generate_str(50)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create test:', et - st, 'seconds')

        # preparing company, skill, test
        for i in range(company_num):
            self.client.post('/api/user/companies', {'name': generate_str(10), 'location':generate_str(10)}, format='json')
        
        for i in range(skill_num):
            self.client.post('/api/user/skills', {'skill_name': generate_str(20)}, format='json')
        
        for i in range(test_num):
            self.client.post('/api/user/tests', {'test_name': generate_str(20), 'test_link':generate_str(50)}, format='json')

class BFreelancerTest(APITestCase):
    def test_freelancer_latency(self):
        # cpu time and wall time for each post api
        ## freelancer
        st = time.process_time()
        self.client.post('/api/user/freelancers', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create freelancer:', et - st, 'seconds')

        # tests for freelancer post api
        for i in range(freelancer_num):
            self.client.post('/api/user/freelancers', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5)}, format='json')

        # tests for freelancer get api
        ## latency of detailed freelancer
        st = time.process_time()
        self.client.get('/api/user/freelancer/3')
        et = time.process_time()
        print('CPU Execution time for get detailed freelancer:', et - st, 'seconds')

        ## latency of detailed freelancer
        st = time.process_time()
        self.client.get('/api/user/freelancers')
        et = time.process_time()
        print('CPU Execution time for get freelancers:', et - st, 'seconds')


class CertificationTest(APITestCase):
    def test_setup(self):
        # cpu time and wall time for each post api
        ## certification
        st = time.process_time()
        self.client.post('/api/user/certifications', {'FreelancerId': generate_num(freelancer_num), 'certification_name':generate_str(20), 'description':generate_str(20), 'date_earned':generate_date(), 'certification_link':generate_str(20)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create certification:', et - st, 'seconds')

        for i in range(certification_num):
            self.client.post('/api/user/certifications', {'FreelancerId': generate_num(freelancer_num), 'certification_name':generate_str(20), 'description':generate_str(20), 'date_earned':generate_date(), 'certification_link':generate_str(20)}, format='json')

class ClientTest(APITestCase):

    def test_client_latency(self):
        # cpu time and wall time for each post api
        ## client
        st = time.process_time()
        self.client.post('/api/user/clients', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5), 'CompanyId':generate_num(company_num)}, format='json')
        et = time.process_time()
        print('CPU Execution time for create client:', et - st, 'seconds')

        # tests for client post api
        for i in range(client_num):
            self.client.post('/api/user/clients', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5), 'CompanyId':generate_num(company_num)}, format='json')


        # tests for client get api
        ## latency of detailed client
        st = time.process_time()
        self.client.get('/api/user/client/3')
        et = time.process_time()
        print('CPU Execution time for get detailed client:', et - st, 'seconds')

        ## latency of detailed client
        st = time.process_time()
        self.client.get('/api/user/clients')
        et = time.process_time()
        print('CPU Execution time for get clients:', et - st, 'seconds')
"""
class TestResultTest(APITestCase):
    def test_setup(self):
        # cpu time and wall time for each post api
        ## test result
        st = time.process_time()
        self.client.post('/api/certifications', {'FreelancerId': generate_num(10000000), 'TestId':generate_num(1000), 'start_time':'22:23:00', 'end_time':'22:23:00', 'result_link':generate_str(50), 'score':55.2, 'display_on_profile':True}, format='json')
        et = time.process_time()
        print('CPU Execution time for create test_result:', et - st, 'seconds')

        # tests for test_result post api
        for i in range(50000):
            self.client.post('/api/certifications', {'FreelancerId': generate_num(10000000), 'TestId':generate_num(1000), 'start_time':'22:23:00', 'end_time':'22:23:00', 'result_link':generate_str(50), 'score':55.2, 'display_on_profile':True}, format='json')
    
    def test_result_latency(self):
        # tests for test_result get api
        return
"""