from django.shortcuts import render

# Create your views here.
def loader_page(request):
    return render(request, 'loader.html')