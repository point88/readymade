from rest_framework import serializers
from Job.models import Expected_Duration, Job, Other_Skills, Job_Attachment


class JobSerialize(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'title', 'description', 'is_contest', 'is_hourly', 'is_recruiter_project', 'currency_type', 'payment_amount', 'ExpectedDurationId', 'ClientId', 'MainSkillId', 'PaymentTypeId')

class ExpectedDurationSerialize(serializers.ModelSerializer):
    class Meta:
        model = Expected_Duration
        fields = ('id', 'duration_text')

class OtherSkillsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Other_Skills
        fields = ('id', 'SkillId', 'JobId')

class JobAttachmentSerialize(serializers.ModelSerializer):
    class Meta:
        model = Job_Attachment
        fields = ('id', 'attachment_link', 'JobId')