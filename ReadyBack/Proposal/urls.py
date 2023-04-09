from django.urls import include, re_path
from Proposal import views

urlpatterns = [
    re_path(r'^proposals$', views.ProposalsApi),
    re_path(r'^proposal/(?P<pk>[0-9]+)', views.ProposalDetailApi),
    re_path(r'^proposal/proposal_status_catalogs$', views.ProposalStatusCatalogsApi),
    re_path(r'^proposal/proposal_status_catalog/(?P<pk>[0-9]+)', views.ProposalStatusCatalogDetailApi)
]
