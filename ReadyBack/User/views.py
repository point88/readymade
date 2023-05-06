import os
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response

from User.models import User, Skill, PhoneNumber, Category
from User.serializers import FreelancerSerialize, ClientSerialize, CompanySerialize, SkillSerialize, HasSkillSerialize, PhoneNumberSerializer, VerifyPhoneNumberSerializer, UserProfileSerialize, CategorySerialize, TopFreelancerSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import GenericAPIView
import datetime

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client

from rest_framework.permissions import IsAuthenticated

from django_drf_filepond.api import store_upload
from django_drf_filepond.models import TemporaryUpload

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
    callback_url = "http://18.185.108.243:8000/"
    client_class = OAuth2Client

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    callback_url = "http://18.185.108.243:8000/"
    client_class = AppleOAuth2Client

@api_view(['PUT'])
def UserDetailApi(request, pk):
    
    try:
        user = User.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        customer_info = None
        data = JSONParser().parse(request)
        try:
            filepond_ids = data['filepond']
        except KeyError:
            filepond_ids = []
        
        for upload_id in filepond_ids:
            tu = TemporaryUpload.objects.get(upload_id=upload_id)
            store_upload(upload_id, os.path.join(upload_id, tu.upload_name))
            data['profile_image'] = settings.STATIC_URL + os.path.join(upload_id, tu.upload_name)

        if 'account_type' in data:
            data['registration_date'] = today_string()
            if data['account_type'] == 0:
                freelancer_serializer = FreelancerSerialize(data=data)
                if freelancer_serializer.is_valid():
                    customer_info = freelancer_serializer.data
                    freelancer_serializer.save()
            elif data['account_type'] == 1:
                if not 'company_name' in data:
                    data['name'] = ""
                else:
                    data['name'] = data['company_name']
                company_serializer = CompanySerialize(data=data)
                if company_serializer.is_valid():
                    customer_info = company_serializer.data
                    company_serializer.save()
            elif data['account_type'] == 2:
                client_serializer = ClientSerialize(data=data)
                if client_serializer.is_valid():
                    customer_info = client_serializer.data
                    client_serializer.save()

        user_serializer = UserProfileSerialize(user, data=data)

        if user_serializer.is_valid():
            user_serializer.save()
            response = user_serializer.data
            response['customer_info']=customer_info
            if customer_info:
                return JsonResponse(customer_info)
            else:
                return JsonResponse(user_serializer.data)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def CategoryApi(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        category_ser = CategorySerialize(categories, many=True)
        return JsonResponse(category_ser.data, safe=False, status=status.HTTP_201_CREATED)        

@api_view(['GET'])
def SkillsApi(request):
    if request.method == 'GET':
        skills = Skill.objects.all()
        skill_serializer = SkillSerialize(skills, many=True)
        return JsonResponse(skill_serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def SkillByCategoryApi(request, pk):
    if request.method == 'GET':
        skills = Skill.objects.filter(CategoryId=pk).all()
        user_ser = SkillSerialize(skills, many=True)
        return JsonResponse(user_ser.data, safe=False, status=status.HTTP_201_CREATED)        
        

@api_view(['POST'])
def HasSkillsApi(request):
    if request.method == 'POST':
        has_skill = JSONParser().parse(request)
        for skill in has_skill['skills']:
            has_skill_serializer = HasSkillSerialize(data=skill)
            if has_skill_serializer.is_valid():
                has_skill_serializer.save()
        return JsonResponse(has_skill_serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([])
def TopFreelancerApi(request, numbers=7):
    if request.method == 'GET':
        result = TopFreelancerSerializer(numbers)
        return JsonResponse(result, safe=False)