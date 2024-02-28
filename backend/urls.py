from django.urls import path

from . import views
from .views import *

urlpatterns = [
    # path('api/books/<int:book_id>/', views.get_book_by_id, name='get_book_by_id'),
    path('api/books/<int:id>/reviews/', BookReviewListCreateView.as_view(), name='book-reviews'),
    path('api/user/<int:id>/reviews/', UserReviewListCreateView.as_view(), name='user-reviews'),

    path('api/books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logged-user/', LoggedUserDetail.as_view(), name='logged-user'),
    path('api/author/<int:id>/', AuthorDetailView.as_view(), name='author-detail'),
    path('api/author/<int:id>/books/', AuthorBookListCreateView.as_view(), name='author-books'),
    path('api/user/<int:id>/', ProfileView.as_view(), name='user-profile'),
    # path('api/register/', register, name='register'),
path('api/publisher/<int:id>/', PublisherDetailView.as_view(), name='publisher-detail'),
    path('api/publisher/<int:id>/books/', PublisherBookListCreateView.as_view(), name='publisher-books'),
]
