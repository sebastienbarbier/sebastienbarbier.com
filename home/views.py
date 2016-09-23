from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request, 'home.html')

def legal(request):
    return render(request, 'legal.html')
