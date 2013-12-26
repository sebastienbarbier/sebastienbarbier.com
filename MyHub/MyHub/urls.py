from django.conf.urls import patterns, include, url
from MyHub.home.views import home_page
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'MyHub.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', home_page, name='index'),
    url(r'^admin/', include(admin.site.urls)),
)
