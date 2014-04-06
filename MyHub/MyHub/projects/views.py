from django.shortcuts import render

# Create your views here.
def projects_page(request):
    return render(request, 'projects.html')