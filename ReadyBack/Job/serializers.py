from rest_framework import serializers
from Job.models import Expected_Duration, Job, Other_Skills


class JobSerialize(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'description', 'payment_amount', 'ExpectedDurationId', 'ClientId', 'MainSkillId', 'PaymentTypeId')

class ExpectedDurationSerialize(serializers.ModelSerializer):
    class Meta:
        model = Expected_Duration
        fields = ('id', 'duration_text')

class OtherSkillsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Other_Skills
        fields = ('id', 'SkillId', 'JobId')