
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.response import Response

from User.models import User, Freelancer, Client, Company, Test, Has_Skill, Test_Result, Skill, Certification, PhoneNumber, Category
from User.serializers import UserSerialize, FreelancerSerialize, ClientSerialize, CompanySerialize, TestSerialize, CertificationSerialize, SkillSerialize, HasSkillSerialize, TestResultSerialize, PhoneNumberSerializer, VerifyPhoneNumberSerializer, UserProfileSerialize, CategorySerialize
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import GenericAPIView
import datetime

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client

def today_string():
    return datetime.date.today().strftime("%Y-%m-%d")

class SendOrResendSMSAPI(GenericAPIView):
    serializer_class = PhoneNumberSerializer

    authentication_classes = ()
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            phone_number = str(serializer.validated_data['phone_number'])

            user = User.objects.filter(phone__phone_number=phone_number).first()
            sms_verification = PhoneNumber.objects.filter(user=user, is_verified=False).first()
            sms_verification.send_confirmation()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyPhoneNumberAPI(GenericAPIView):
    serializer_class = VerifyPhoneNumberSerializer

    authentication_classes = ()
    permission_classes = ()
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            message = {'detail': _('Phone number successfully verified')}
            return Response(message, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://18.185.108.243:8000/dashboard/"
    client_class = OAuth2Client

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    callback_url = "http://18.185.108.243:8000/dashboard/"
    client_class = AppleOAuth2Client

@api_view(['GET', 'POST'])
def UsersApi(request):
    if request.method == 'POST':
        user = JSONParser().parse(request)
        user_serializer = UserSerialize(data=user)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == "GET":
        user_data = User.objects.all()
        user_ser = UserSerialize(user_data, many=True)
        return JsonResponse(user_ser.data, safe=False, status=status.HTTP_201_CREATED)        


@api_view(['GET', 'PUT', 'DELETE'])
def UserDetailApi(request, pk):
    
    try:
        user = User.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        user_serializer = UserSerialize(user)
        return JsonResponse(user_serializer.data)
    elif request.method == 'PUT':
        
        data = JSONParser().parse(request)
        if 'account_type' in data:
            data['registration_date'] = today_string()
            if data['account_type'] == 0:
                freelancer_serializer = FreelancerSerialize(data=data)
                if freelancer_serializer.is_valid():
                    freelancer_serializer.save()
            else:
                client_serializer = ClientSerialize(data=data)
                if client_serializer.is_valid():
                    client_serializer.save()

        user_serializer = UserProfileSerialize(user, data=data)

        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data) 
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def FreelancersApi(request):
    if request.method == 'POST':
        freelancer = JSONParser().parse(request)
        freelancer['registration_date'] = today_string()
        freelancer_serializer = FreelancerSerialize(data=freelancer)
        if freelancer_serializer.is_valid():
            freelancer_serializer.save()
            return JsonResponse(freelancer_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(freelancer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        freelancers = Freelancer.objects.select_related().all()
        
        results = []
        for lancer in freelancers[0:50]:
            result = {}
            result['id'] = lancer.id
            result['name'] = lancer.UserId.name
            result['email'] = lancer.UserId.email
            result['phone'] = lancer.UserId.phone
            result['registration_date'] = lancer.registration_date
            result['country'] = lancer.country
            results.append(result)

        return JsonResponse(results, status=status.HTTP_201_CREATED, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def FreelancerDetailApi(request, pk):
    try:
        freelancer = Freelancer.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The freelancer does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        freelancer_serializer = FreelancerSerialize(freelancer)
        user = User.objects.get(pk=freelancer_serializer.data['UserId'])
        
        user_serializer = UserSerialize(user)
        result = user_serializer.data
        result['id'] = freelancer_serializer.data['id']
        result['registration_date'] = freelancer_serializer.data['registration_date']
        result['country'] = freelancer_serializer.data['country']
        result['overview'] = freelancer_serializer.data['overview']
        return JsonResponse(result)

@api_view(['GET'])
@permission_classes([])
def CategoryApi(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        category_ser = CategorySerialize(categories, many=True)
        return JsonResponse(category_ser.data, safe=False, status=status.HTTP_201_CREATED)        

@api_view(['GET', 'POST'])
def ClientsApi(request):
    if request.method == 'POST':
        client = JSONParser().parse(request)
        client['registration_date'] = today_string()
        client_serializer = ClientSerialize(data=client)
        if client_serializer.is_valid():
            client_serializer.save()
            return JsonResponse(client_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        clients = Client.objects.select_related().all()
        
        results = []
        for lancer in clients[0:50]:
            result = {}
            result['id'] = lancer.id
            result['name'] = lancer.UserId.name
            result['email'] = lancer.UserId.email
            result['phone'] = lancer.UserId.phone
            result['registration_date'] = lancer.registration_date
            result['country'] = lancer.country
            results.append(result)
        
        return JsonResponse(results, status=status.HTTP_200_OK, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def ClientDetailApi(request, pk):
    try:
        client = Client.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The client does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        client_serializer = ClientSerialize(client)
        user = User.objects.get(pk=client_serializer.data['UserId'])
        company = Company.objects.get(pk=client_serializer.data['CompanyId'])
        
        user_serializer = UserSerialize(user)
        company_serializer = CompanySerialize(company)
        result = user_serializer.data
        result['id'] = client_serializer.data['id']
        result['company_name'] = company_serializer.data['name']
        result['company_location'] = company_serializer.data['location']
        result['registration_date'] = client_serializer.data['registration_date']
        result['country'] = client_serializer.data['country']
        return JsonResponse(result)


@api_view(['GET', 'POST'])
def CompaniesApi(request):
    if request.method == 'GET':
        companies = Company.objects.all()
        return JsonResponse(companies, status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        company = JSONParser().parse(request)
        company_serializer = CompanySerialize(data=company)
        if company_serializer.is_valid():
            company_serializer.save()
            return JsonResponse(company_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def CompanyDetailApi(request, pk):
    if request.method == 'GET':
        try:
            company = Company.objects.get(pk=pk)
        except:
            return JsonResponse({'message': 'The company does not exist'}, status=status.HTTP_404_NOT_FOUND)

        company_serializer = CompanySerialize(data=company)
        return JsonResponse(company_serializer.data)


@api_view(['GET', 'POST'])
def TestsApi(request):
    if request.method == 'GET':
        tests = Test.objects.all()
        return JsonResponse(tests, status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        test = JSONParser().parse(request)
        test_serializer = TestSerialize(data=test)
        if test_serializer.is_valid():
            test_serializer.save()
            return JsonResponse(test_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def TestDetailApi(request, pk):
    if request.method == 'GET':
        try:
            test = Test.objects.get(pk=pk)
        except:
            return JsonResponse({'message': 'The test does not exist'}, status=status.HTTP_404_NOT_FOUND)

        test_serializer = TestSerialize(data=test)
        return JsonResponse(test_serializer.data)


@api_view(['GET', 'POST'])
def CertificationsApi(request):
    if request.method == 'GET':
        certifications = Certification.objects.all()
        return JsonResponse(certifications, status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        certification = JSONParser().parse(request)
        certification_serializer = CertificationSerialize(data=certification)
        if certification_serializer.is_valid():
            certification_serializer.save()
            return JsonResponse(certification_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(certification_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def CertificationDetailApi(request, pk):
    if request.method == 'GET':
        try:
            certification = Certification.objects.get(pk=pk)
        except:
            return JsonResponse({'message': 'The certification does not exist'}, status=status.HTTP_404_NOT_FOUND)

        certification_serializer = CertificationSerialize(data=certification)
        return JsonResponse(certification_serializer.data)


@api_view(['GET', 'POST'])
def SkillsApi(request):
    if request.method == 'GET':
        skills = Skill.objects.all()
        skill_serializer = SkillSerialize(skills, many=True)
        return JsonResponse(skill_serializer.data, status=status.HTTP_200_OK, safe=False)
        
    if request.method == 'POST':
        skill = JSONParser().parse(request)
        skill_serializer = SkillSerialize(data=skill)
        if skill_serializer.is_valid():
            skill_serializer.save()
            return JsonResponse(skill_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(skill_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def SkillDetailApi(request, pk):
    if request.method == 'GET':
        skills = Skill.objects.filter(CategoryId=pk).all()
        user_ser = SkillSerialize(skills, many=True)
        return JsonResponse(user_ser.data, safe=False, status=status.HTTP_201_CREATED)        
        

@api_view(['GET', 'POST'])
def HasSkillsApi(request):
    if request.method == 'POST':
        has_skill = JSONParser().parse(request)
        for skill in has_skill['skills']:
            has_skill_serializer = HasSkillSerialize(data=skill)
            if has_skill_serializer.is_valid():
                has_skill_serializer.save()
        return JsonResponse(has_skill_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def TestResultsApi(request):
    if request.method == 'GET':
        test_results = Test_Result.objects.select_related().all()

        results = []
        for test_result in test_results[0:50]:
            result = {}
            result['freelancer_name'] = test_result.FreelancerId.UserId.name
            result['test_title'] = test_result.TestId.test_name
            result['result_link'] = test_result.result_link
            results.append(result)

        return JsonResponse(results, status=status.HTTP_200_OK, safe=False)

    if request.method == 'POST':
        test_result = JSONParser().parse(request)
        test_result_serializer = TestResultSerialize(data=test_result)
        if test_result_serializer.is_valid():
            test_result_serializer.save()
            return JsonResponse(test_result_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(test_result_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def TestResultDetailApi(request, pk):
    if request.method == 'GET':
        try:
            test_result = Test_Result.objects.get(pk=pk)
        except:
            return JsonResponse({'message': 'The testresult does not exist'}, status=status.HTTP_404_NOT_FOUND)
        test_result_serializer = TestResultSerialize(test_result)

        result = test_result_serializer.data
        result['freelancer_name'] = test_result.FreelancerId.UserId.name
        result['test_title'] = test_result.TestId.test_name
        result['result_link'] = test_result.result_link
        
        return JsonResponse(result, status=status.HTTP_200_OK)