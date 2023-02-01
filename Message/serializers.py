from rest_framework import serializers
from Message.models import Message, Attachment

class MessageSerialize(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'message_time', 'message_text', 'ProposalId', 'ClientId', 'FreelancerId')

class AttachmentSerialize(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'attachment_link', 'MessageId')