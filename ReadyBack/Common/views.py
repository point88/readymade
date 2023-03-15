from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework import status

def handle_uploaded_file(f):
    with open(f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

class FileUploadView(APIView):
    parser_classes = [FileUploadParser]

    def put(self, request, filename, format=None):
        if 'file' not in request.FILES:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            handle_uploaded_file(request.FILES['file'])

            return Response(status=204)
