import sys
import os
sys.path.insert(0, os.path.abspath('..'))

from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search, Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from ReadyBack.Job.serializers import JobSerializer 
from ReadyBack.User.serializers import UserSerializer
from ReadyBack.Search.Documents import JobDocument, UserDocument,OtherSkillsDocument
from django.http import HttpResponse

class SearchJobUser(APIView):
    authentication_classes = ()
    permission_classes = ()
    job_serializer = JobSerializer
    user_serializer = UserSerializer
    job_search_document = JobDocument
    user_search_document = UserDocument

    def get(self, request, query):
        try:
            # Search for jobs
            job_query = Q(
                'match_phrase_prefix',
                title=query
            ) | Q(
                'match_phrase_prefix',
                description=query
            ) | Q(
                'nested',
                path='skill_names',
                query=Q('match_phrase_prefix', skill_names__skill_name=query)
            )
            job_search = self.job_search_document.search().query(job_query)
            job_response = job_search.execute()
            job_results = list(job_response)
            job_serialized = self.job_serializer(job_results, many=True).data

            # Search for users
            user_query = Q(
                'match_phrase_prefix',
                username=query
            ) | Q(
                'match_phrase_prefix',
                first_name=query
            ) | Q(
                'match_phrase_prefix',
                last_name=query
            ) | Q(
                'nested',
                path='skill_names',
                query=Q('match_phrase_prefix', skill_names__skill_name=query)
            )

            user_search = self.user_search_document.search().query(user_query)
            user_response = user_search.execute()
            user_results = list(user_response)
            user_serialized = self.user_serializer(user_results, many=True).data

            # Return results in the desired format
            results = {
                "users": user_serialized,
                "projects": job_serialized,
            }
            return Response(results)
        except Exception as e:
            return HttpResponse(e, status=500)
