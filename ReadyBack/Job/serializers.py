from django.db.models import Count

from Job.models import Job, Other_Skills, Job_Attachment
from User.models import Skill

class JobSerialize:

    def __init__(self, data):
        self.data = data
    
    def validate(self):
        if not 'skills' in self.data:
            self.data['skills'] = []
        if not 'title' in self.data:
            self.data['title'] = ""
        if not 'description' in self.data:
            self.data['description'] = ""
        if not 'is_contest' in self.data:
            self.data['is_contest'] = False
        if not 'is_hourly' in self.data:
            self.data['is_hourly'] = False
        if not 'is_recruiter_project' in self.data:
            self.data['is_recruiter_project'] = False
        if not 'currency_type' in self.data:
            self.data['currency_type'] = "USD"
        if not 'payment_amount' in self.data:
            self.data['payment_amount'] = 0.0
        
        if not 'user_id' in self.data:
            return False
        if not 'payment_type_id' in self.data:
            return False
        return True

    def save(self):
        skills = self.data.pop('skills')
        uploads = self.data.pop('uploads')
        job = Job.objects.create(
            title=self.data['title'],
            description=self.data['description'],
            is_contest=self.data['is_contest'],
            is_hourly=self.data['is_hourly'],
            is_recruiter_project=self.data['is_recruiter_project'],
            currency_type=self.data['currency_type'],
            payment_amount=self.data['payment_amount'],
            ClientId_id=self.data['user_id'],
            PaymentTypeId_id=self.data['payment_type_id']
        )

        for skill in skills:
            Other_Skills.objects.create(JobId_id=job.id, SkillId_id=1)
        
        for upload in uploads:
            Job_Attachment.objects.create(JobId_id=job.id, attachment_link=upload)

        return job
# deprecated, need to clean up
def JobStatisticsSerializer(cat_ids):
    result = Other_Skills.objects.select_related('SkillId').filter(SkillId__CategoryId__in=cat_ids).values('JobId', 'SkillId__CategoryId').distinct().order_by()
    count = [0] * (max(cat_ids)+1)
    for i in range(len(result)):
        count[result[i]['SkillId__CategoryId']] += 1
    return count