from django.conf.urls import patterns, include, url
from sebastienbarbier.home.views import home_page
from sebastienbarbier.views import loader_page
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.views.generic.base import TemplateView

admin.autodiscover()

from .sitemaps import StaticViewSitemap
sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'sebastienbarbier.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='home.html')),

    # url(r'^home/$', home_page, name='index'),
    # url(r'^resume/$', resume_page, name='resume'),
    # url(r'^projects/$', projects_page, name='projects'),
    # url(r'^contact/$', contact_page, name='contact'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
