from django.conf.urls import patterns, include, url
from sebastienbarbier.home.views import home_page
from sebastienbarbier.views import loader_page
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'sebastienbarbier.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', home_page, name='loader'),
    # url(r'^home/$', home_page, name='index'),
    # url(r'^resume/$', resume_page, name='resume'),
    # url(r'^projects/$', projects_page, name='projects'),
    # url(r'^contact/$', contact_page, name='contact'),
    # url(r'^admin/', include(admin.site.urls)),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
