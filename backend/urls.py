from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import *

router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'top100', BookTop100ViewSet)
router.register(r'books', BookViewSet)
router.register(r'books_add', AddBookViewSet)
router.register(r'books_add_cover', AddBookCoverViewSet)

router.register(r'quick_search/book', BookQuickSearchViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'book-reviews', BookReviewViewSet, basename='book-review')
router.register(r'profile', CustomUserEditViewSet, basename='profile')
router.register(r'publisher', PublisherViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/books/<int:id>/reviews/', BookReviewListCreateView.as_view(), name='book-reviews'),
    path('api/user/<int:id>/reviews/', UserReviewListCreateView.as_view(), name='user-reviews'),
    path('api/books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logged-user/', LoggedUserDetail.as_view(), name='logged-user'),
    path('api/author/<int:id>/', AuthorDetailView.as_view(), name='author-detail'),
    path('api/author/<int:id>/books/', AuthorBookListCreateView.as_view(), name='author-books'),
    path('api/user/<int:id>/', ProfileView.as_view(), name='user-profile'),
    path('api/publisher/<int:id>/', PublisherDetailView.as_view(), name='publisher-detail'),
    path('api/publisher/<int:id>/books/', PublisherBookListCreateView.as_view(), name='publisher-books'),
    path('api/user/update/', CustomUserUpdate.as_view(), name='user-update'),
    path('api/getReviewId/<int:book_id>/', ReviewIdByBookIdView.as_view(), name='review-id')
]
