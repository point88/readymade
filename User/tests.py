from rest_framework.test import APITestCase
from django.test import TestCase
from User.models import User_Account, Freelancer, Client, Certification, Test, TestResult, Skill, Company

import string
import random
import time

company_num = 200000
freelancer_num = 1000000
client_num = 1000000
skill_num = 100000
certification_num = 100000
test_num = 200000
hasskill_num = 10000
test_result_num = 200000

def generate_str(N):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

def generate_num(N):
    return random.randrange(N)

def generate_date():
    return "2022-03-21"

# Create your tests here.
class APreparingTest(APITestCase):
    def test_prepare(self):
        # cpu time and wall time for each post api
        ## company
        st = time.time()
        self.client.post('/api/user/companies', {'name': generate_str(10), 'location':generate_str(10)}, format='json')
        et = time.time()
        print('Execution time for create company:', et - st, 'seconds')

        ## skill
        st = time.time()
        self.client.post('/api/user/skills', {'skill_name': generate_str(20)}, format='json')
        et = time.time()
        print('Execution time for create skill:', et - st, 'seconds')

        ## test
        st = time.time()
        self.client.post('/api/user/tests', {'test_name': generate_str(20), 'test_link':generate_str(50)}, format='json')
        et = time.time()
        print('Execution time for create test:', et - st, 'seconds')

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
        st = time.time()
        self.client.post('/api/user/freelancers', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5)}, format='json')
        et = time.time()
        print('Execution time for create freelancer:', et - st, 'seconds')

        # tests for freelancer post api
        for i in range(freelancer_num):
            self.client.post('/api/user/freelancers', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5)}, format='json')

        # tests for freelancer has skill post api
        for i in range(hasskill_num):
            self.client.post('/api/user/hasskills', {'FreelancerId':generate_num(freelancer_num), 'SkillId':generate_num(skill_num)}, format='json')

        # cpu time and wall time for each post api
        ## certification
        st = time.time()
        self.client.post('/api/user/certifications', {'FreelancerId': generate_num(freelancer_num), 'certification_name':generate_str(20), 'description':generate_str(20), 'date_earned':generate_date(), 'certification_link':generate_str(20)}, format='json')
        et = time.time()
        print('Execution time for create certification:', et - st, 'seconds')

        for i in range(certification_num):
            self.client.post('/api/user/certifications', {'FreelancerId': generate_num(freelancer_num), 'certification_name':generate_str(20), 'description':generate_str(20), 'date_earned':generate_date(), 'certification_link':generate_str(20)}, format='json')

        # tests for freelancer get api
        ## latency of detailed freelancer
        st = time.time()
        self.client.get('/api/user/freelancer/3')
        et = time.time()
        print('Execution time for get detailed freelancer:', et - st, 'seconds')

        ## latency of detailed freelancer
        st = time.time()
        self.client.get('/api/user/freelancers')
        et = time.time()
        print('Execution time for get freelancers:', et - st, 'seconds')


class ClientTest(APITestCase):

    def test_client_latency(self):
        # cpu time and wall time for each post api
        ## client
        st = time.time()
        self.client.post('/api/user/clients', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5), 'CompanyId':generate_num(company_num)}, format='json')
        et = time.time()
        print('Execution time for create client:', et - st, 'seconds')

        # tests for client post api
        for i in range(client_num):
            self.client.post('/api/user/clients', {'name': generate_str(20), 'email':generate_str(20), 'password':generate_str(20), 'phone':generate_str(20), 'firstname':generate_str(10), 'secondname':generate_str(10), 'country':generate_str(5), 'CompanyId':generate_num(company_num)}, format='json')


        # tests for client get api
        ## latency of detailed client
        st = time.time()
        self.client.get('/api/user/client/3')
        et = time.time()
        print('Execution time for get detailed client:', et - st, 'seconds')

        ## latency of detailed client
        st = time.time()
        self.client.get('/api/user/clients')
        et = time.time()
        print('Execution time for get clients:', et - st, 'seconds')

class TestResultTest(APITestCase):
    def test_result_latency(self):
        # cpu time and wall time for each post api
        ## test result
        st = time.time()
        self.client.post('/api/user/testresults', {'FreelancerId': generate_num(freelancer_num), 'TestId':generate_num(test_num), 'start_time':'22:23:00', 'end_time':'22:23:00', 'result_link':generate_str(50), 'score':55.2, 'display_on_profile':True}, format='json')
        et = time.time()
        print('Execution time for create test_result:', et - st, 'seconds')

        # tests for test_result post api
        for i in range(test_result_num):
            self.client.post('/api/user/testresults', {'FreelancerId': generate_num(freelancer_num), 'TestId':generate_num(test_num), 'start_time':'22:23:00', 'end_time':'22:23:00', 'result_link':generate_str(50), 'score':55.2, 'display_on_profile':True}, format='json')

        # tests for testresult get api
        ## latency of detailed test result
        st = time.time()
        self.client.get('/api/user/testresult/1')
        et = time.time()
        print('Execution time for get detailed test_result:', et - st, 'seconds')

        ## latency of test results
        st = time.time()
        response = self.client.get('/api/user/testresults')
        et = time.time()
        print('Execution time for get test_result:', et - st, 'seconds')