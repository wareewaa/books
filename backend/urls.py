from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('list/', views.list_view, name='list_view'),
]