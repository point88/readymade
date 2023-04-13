from rest_framework import serializers
from Job.models import Expected_Duration, Job, Other_Skills, Job_Attachment

class OtherSkillsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Other_Skills
        fields = ['id', 'SkillId']

class JobSerialize(serializers.ModelSerializer):
    skills = OtherSkillsSerialize(many=True)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'is_contest', 'is_hourly', 'is_recruiter_project', 'currency_type', 'payment_amount', 'skills', 'UserId', 'PaymentTypeId']
    
    def create(self, validated_data):
        skills = validated_data.pop('skills')
        job = Job.objects.create(**validated_data)
        for skill in skills:
            Other_Skills.objects.create(JobId_id=job.id, **skill)
        return job

class ExpectedDurationSerialize(serializers.ModelSerializer):
    class Meta:
        model = Expected_Duration
        fields = ('id', 'duration_text')


class JobAttachmentSerialize(serializers.ModelSerializer):
    class Meta:
        model = Job_Attachment
        fields = ('id', 'attachment_link', 'JobId')