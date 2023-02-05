from rest_framework.test import APITestCase
from django.test import TestCase

import string
import random
import time

company_num = 200
freelancer_num = 1000
client_num = 1000
skill_num = 100
certification_num = 100
test_num = 200
hasskill_num = 10
test_result_num = 200


expected_duration_num = 10
proposal_status_catalog_num = 10
payment_type_num = 10
job_num = 5000
proposal_num = 50000
message_num = 55000
contract_num = 1000

def generate_str(N):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))

def generate_num(N):
    return random.randrange(N)

def generate_date():
    return "2022-03-21"

# Create your tests here.
class DBTest(APITestCase):
    def test_db_prepare(self):
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

        ## expected duration
        st = time.time()
        self.client.post('/api/job/expected_durations', {'duration_text': generate_str(20)}, format='json')
        et = time.time()
        print('Execution time for create expected_duration:', et - st, 'seconds')

        ## proposal status catalog
        st = time.time()
        self.client.post('/api/proposal/proposal_status_catalogs', {'status_name': generate_str(20)}, format='json')
        et = time.time()
        print('Execution time for create expected_duration:', et - st, 'seconds')
        
        ## proposal status catalog
        st = time.time()
        self.client.post('/api/payment_types', {'type_name': generate_str(20)}, format='json')
        et = time.time()
        print('Execution time for create payment_type:', et - st, 'seconds')

        # preparing company, skill, test
        for i in range(company_num):
            self.client.post('/api/user/companies', {'name': generate_str(10), 'location':generate_str(10)}, format='json')
        
        for i in range(skill_num):
            self.client.post('/api/user/skills', {'skill_name': generate_str(20)}, format='json')
        
        for i in range(test_num):
            self.client.post('/api/user/tests', {'test_name': generate_str(20), 'test_link':generate_str(50)}, format='json')

        for i in range(expected_duration_num):
            self.client.post('/api/job/expected_durations', {'duration_text': generate_str(20)}, format='json')

        for i in range(proposal_status_catalog_num):
            self.client.post('/api/proposal/proposal_status_catalogs', {'status_name': generate_str(20)}, format='json')

        for i in range(payment_type_num):
            self.client.post('/api/payment_types', {'type_name': generate_str(10)}, format='json')
        
    def test_db_exec(self):
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

        # cpu time and wall time for each post api
        ## job
        st = time.time()
        self.client.post('/api/jobs', {'description':generate_str(20), 'ExpectedDurationId':generate_num(expected_duration_num), 'ClientId':generate_num(client_num), 'MainSkillId':generate_num(skill_num), 'PaymentTypeId':generate_num(payment_type_num)}, format='json')
        et = time.time()
        print('Execution time for create Job:', et - st, 'seconds')

        for i in range(job_num):
            self.client.post('/api/jobs', {'description':generate_str(20), 'ExpectedDurationId':generate_num(expected_duration_num), 'ClientId':generate_num(client_num), 'MainSkillId':generate_num(skill_num), 'PaymentTypeId':generate_num(payment_type_num)}, format='json')

        # tests for testresult get api
        ## latency of detailed job
        st = time.time()
        self.client.post('/api/job/1')
        et = time.time()
        print('Execution time for get detailed job:', et - st, 'seconds')

        ## latency of test results
        st = time.time()
        response = self.client.get('/api/jobs')
        et = time.time()
        print('Execution time for get job:', et - st, 'seconds')

        # cpu time and wall time for each post api
        ## proposal
        st = time.time()
        self.client.post('/api/proposals', {'proposal_time':'2022-03-26T22:23', 'proposed_payment_amount':100, 'client_grade':0, 'client_comment':'test', 'freelancer_grade':0, 'freelancer_comment':'test', 'JobId':generate_str(10), 'FreelancerId': generate_num(freelancer_num), 'PaymentTypeId':generate_num(payment_type_num), 'ProposalStatusId':generate_num(proposal_status_catalog_num)}, format='json')
        et = time.time()
        print('Execution time for create Proposal:', et - st, 'seconds')

        for i in range(proposal_num):
            self.client.post('/api/proposals', {'proposal_time':'2022-03-26T22:23', 'proposed_payment_amount':100, 'client_grade':0, 'client_comment':'test', 'freelancer_grade':0, 'freelancer_comment':'test', 'JobId':generate_str(10), 'FreelancerId': generate_num(freelancer_num), 'PaymentTypeId':generate_num(payment_type_num), 'ProposalStatusId':generate_num(proposal_status_catalog_num)}, format='json')

        # tests for proposal get api
        ## latency of detailed proposal
        st = time.time()
        self.client.post('/api/proposal/1')
        et = time.time()
        print('Execution time for get detailed proposal:', et - st, 'seconds')

        ## latency of proposals
        st = time.time()
        response = self.client.get('/api/proposals')
        et = time.time()
        print('Execution time for get proposals:', et - st, 'seconds')

        # cpu time and wall time for each post api
        ## Message
        st = time.time()
        self.client.post('/api/messages', {'message_time':'2022-03-26T22:23', 'message_text':generate_str(10), 'ProposalId':generate_num(proposal_num), 'ClientId':generate_num(client_num), 'FreelancerId':generate_num(freelancer_num)}, format='json')
        et = time.time()
        print('Execution time for create Message:', et - st, 'seconds')

        for i in range(message_num):
            self.client.post('/api/messages', {'message_time':'2022-03-26T22:23', 'message_text':generate_str(10), 'ProposalId':generate_num(proposal_num), 'ClientId':generate_num(client_num), 'FreelancerId':generate_num(freelancer_num)}, format='json')

        # tests for proposal get api
        ## latency of detailed Message
        st = time.time()
        self.client.post('/api/message/1')
        et = time.time()
        print('Execution time for get detailed message:', et - st, 'seconds')

        ## latency of messsages
        st = time.time()
        response = self.client.get('/api/messages')
        et = time.time()
        print('Execution time for get messages:', et - st, 'seconds')

        # cpu time and wall time for each post api
        ## Contract
        st = time.time()
        self.client.post('/api/contracts', {'start_time':"2022-03-21", 'end_time':"2022-03-29", 'budget_amount':100.0, 'FreelancerId':generate_num(freelancer_num), 'ClientId':generate_num(client_num), 'ProposalId':generate_num(proposal_num), 'PaymentTypeId':generate_num(payment_type_num), 'JobId':generate_num(job_num)}, format='json')
        et = time.time()
        print('Execution time for create contract:', et - st, 'seconds')

        for i in range(contract_num):
            self.client.post('/api/contracts', {'start_time':"2022-03-21", 'end_time':"2022-03-29", 'budget_amount':100.0, 'FreelancerId':generate_num(freelancer_num), 'ClientId':generate_num(client_num), 'ProposalId':generate_num(proposal_num), 'PaymentTypeId':generate_num(payment_type_num), 'JobId':generate_num(job_num)}, format='json')

        # tests for proposal get api
        ## latency of detailed Contract
        st = time.time()
        self.client.post('/api/contract/0')
        et = time.time()
        print('Execution time for get detailed contract:', et - st, 'seconds')

        ## latency of contracts
        st = time.time()
        response = self.client.get('/api/contracts')
        et = time.time()
        print('Execution time for get contracts:', et - st, 'seconds')

