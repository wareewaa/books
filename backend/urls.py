from django.urls import path

from . import views
from .views import *

urlpatterns = [
    path("", views.index, name="index"),
    path('list/', views.list_view, name='list_view'),
    path('home/', views.list_view, name='home'),
    path('top100/', views.list_view, name='top100'),
    path('profile/', views.list_view, name='profile'),
    # path('api/books/<int:book_id>/', views.get_book_by_id, name='get_book_by_id'),
    path('api/books/<int:id>/reviews/', BookReviewListCreateView.as_view(), name='book-reviews'),
    path('api/books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    # path('api/register/', register, name='register'),
]

