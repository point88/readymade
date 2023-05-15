from django_elasticsearch_dsl import fields, Document
from django_elasticsearch_dsl.registries import registry
from Job.models import Job, Other_Skills
from User.models import Skill,User,Has_Skill
from django_elasticsearch_dsl import Index

custom_analyzer = {
    "filter": ["lowercase"],
    "tokenizer": "custom_edge_ngram_tokenizer",
}

ngram_index = Index("ngram_autocomplete")
ngram_index.settings(
    number_of_shards=1,
    number_of_replicas=0,
    analysis={
        "analyzer": {
            "custom_edge_ngram_analyzer": {"type": "custom", **custom_analyzer}
        },
        "tokenizer": {
            "custom_edge_ngram_tokenizer": {
                "type": "edge_ngram",
                "min_gram": 3,
                "max_gram": 20,
                "token_chars": ["letter", "digit"],
            }
        },
    },
)


@registry.register_document
class SkillDocument(Document):
    name = fields.TextField(attr='skill_name')

    class Index:
        name = "skill"

    class Django:
        model = Skill


@registry.register_document
class OtherSkillsDocument(Document):
    skill_name = fields.TextField(attr='SkillId__skill_name')

    class Index:
        name = "other_skills"

    class Django:
        model = Other_Skills


@registry.register_document
class JobDocument(Document):
    skill_names = fields.NestedField(properties={
        'skill_name': fields.TextField(attr='SkillId__skill_name')
    }, attr='job_other_skill')
    job = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'title': fields.TextField(),
        'description': fields.TextField(),
        'payment_amount': fields.FloatField(),
    })

    class Index:
        name = "job"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            "analysis": {
                "analyzer": {
                    "custom_edge_ngram_analyzer": {"type": "custom", **custom_analyzer}
                },
                "tokenizer": {
                    "custom_edge_ngram_tokenizer": {
                        "type": "edge_ngram",
                        "min_gram": 3,
                        "max_gram": 20,
                        "token_chars": ["letter", "digit"],
                    }
                },
            },
        }

    class Django:
        model = Job

        fields = [
            "id",
            "title",
            "description",
            "payment_amount"
        ]

    def get_queryset(self):
        return super().get_queryset().prefetch_related('job_other_skill__SkillId')

    def prepare_skill_names(self, instance):
        return [{'skill_name': obj.SkillId.skill_name} for obj in instance.job_other_skill.all()]


@registry.register_document
class HasSkillDocument(Document):
    skill_name = fields.TextField(attr='SkillId__skill_name')

    class Index:
        name = "has_skill"

    class Django:
        model = Has_Skill

@registry.register_document
class UserDocument(Document):
    skill_names = fields.NestedField(properties={
        'skill_name': fields.TextField(attr='SkillId__skill_name')
    }, attr='freelancer_has_skill')
    user = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'username': fields.TextField(),
        'first_name': fields.TextField(),
        'last_name': fields.TextField()  # Change this to TextField
    })

    class Index:
        name = 'user'
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            "analysis": {
                "analyzer": {
                    "custom_edge_ngram_analyzer": {"type": "custom", **custom_analyzer}
                },
                "tokenizer": {
                    "custom_edge_ngram_tokenizer": {
                        "type": "edge_ngram",
                        "min_gram": 3,
                        "max_gram": 20,
                        "token_chars": ["letter", "digit"],
                    }
                },
            },
        }

    class Django:
        model = User

        fields = [
            'id',
            "username",
            "first_name",
            "last_name"
        ]

    def get_queryset(self):
        return super().get_queryset().prefetch_related('freelancer_has_skill__SkillId')

    def prepare_skill_names(self, instance):
        return [{'skill_name': obj.SkillId.skill_name} for obj in instance.freelancer_has_skill.all()]
