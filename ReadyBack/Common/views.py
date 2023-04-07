from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os

from django_drf_filepond.api import store_upload, delete_stored_upload
from django_drf_filepond.models import TemporaryUpload, StoredUpload

class FileUploadView(APIView):
    def post(self, request):
        # Get the post request and extract the IDs of the temporary upload(s)
        # to be permanently stored.
        data = request.POST
        try:
            filepond_ids = data.getlist('filepond')
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(filepond_ids, list):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Go through the list of IDs. For each, look up the associated temp
        # upload and call django-drf-filepond's API function store_upload.
        # This stores the file to a local or remote file store depending on
        # how the library is configured.
        stored_uploads = []
        for upload_id in filepond_ids:
            tu = TemporaryUpload.objects.get(upload_id=upload_id)
            store_upload(upload_id, os.path.join(upload_id, tu.upload_name))
            stored_uploads.append(upload_id)

        # Return the list of uploads that were stored.
        return Response(status=status.HTTP_200_OK)

    # Handle request to delete a stored upload
    def delete(self, request):
        # Get the ID of the stored upload to be deleted and look it up in
        # the database.
        upload_id = request.GET.get('id', None)
        try:
            su = StoredUpload.objects.get(upload_id=upload_id)
        except StoredUpload.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # If we found the StoredUpload record, call the django-drf-filepond
        # API function delete_stored_upload to delete the record from the
        # database and delete the corresponding file on the local or remote
        # filesystem (delete_file=True).
        try:
            delete_stored_upload(su.upload_id, delete_file=True)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
