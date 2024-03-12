from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsModeratorPermission, IsModeratorOrReadOnlyPermission
from .serializers import *


class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=user)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            Token.objects.filter(user=user).delete()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': UserSerializer(user).data})
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class LoggedUserDetail(RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        # Override get_object to return the current user
        return self.request.user


class CustomUserEditViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserEditSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class CustomUserUpdate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    # parser_classes = [FileUploadParser]  # Add the FileUploadParser for handling file uploads

    def perform_update(self, serializer):
        profile_picture = self.request.data.get('profile_picture')
        if profile_picture:
            filename = self.request.data.get('profile_picture').name
            serializer.save(profile_picture=(filename, profile_picture))
        else:
            serializer.save()


class BookReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = BookReviewListSerializer

    def get_queryset(self):
        # Retrieve the book_id from the URL parameter
        book_id = self.kwargs.get('id')

        # Filter reviews based on the book_id
        return BookReview.objects.filter(book__id=book_id)

    def perform_create(self, serializer):
        # Set the book instance when creating a new review
        book_id = self.kwargs.get('id')
        serializer.save(book_id=book_id)


class UserReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = BookReviewListSerializer

    def get_queryset(self):
        # Retrieve the book_id from the URL parameter
        user_id = self.kwargs.get('id')

        # Filter reviews based on the book_id
        return BookReview.objects.filter(user__id=user_id)

    # def perform_create(self, serializer):
    #     # Set the book instance when creating a new review
    #     book_id = self.kwargs.get('id')
    #     serializer.save(book_id=book_id)


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'


class AuthorDetailView(generics.RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    lookup_field = 'id'


class AuthorBookListCreateView(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        # Retrieve the book_id from the URL parameter
        author_id = self.kwargs.get('id')

        # Filter reviews based on the book_id
        return Book.objects.filter(author__id=author_id)


class PublisherDetailView(generics.RetrieveAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    lookup_field = 'id'


class PublisherBookListCreateView(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        # Retrieve the book_id from the URL parameter
        publisher_id = self.kwargs.get('id')

        # Filter reviews based on the book_id
        return Book.objects.filter(publisher__id=publisher_id)


class BookTop100ViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.order_by('-rating')[:100]
    serializer_class = BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filterset_fields = ['genres']
    ordering_fields = ['rating', 'published_date', 'rating_amount']
    search_fields = ['title', 'author__name']


class AddBookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = AddBookSerializer

    # parser_classes = [MultiPartParser, FormParser]
    def perform_create(self, serializer):
        # Check if 'cover' is explicitly set to null in the request data
        cover_value = self.request.data.get('cover', None)
        if cover_value is None:
            # Set default cover image path
            default_cover_path = "book_cover_pics/default_cover.jpg"
            serializer.validated_data['cover'] = default_cover_path

        # Continue with the normal create process
        serializer.save()

class AddBookCoverViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = AddBookCoverSerializer
    parser_classes = [MultiPartParser, FormParser]


class BookQuickSearchViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']
    parser_classes = [MultiPartParser, FormParser]
    def get_permissions(self):
        # Apply IsModeratorPermission for all actions except list and retrieve
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsModeratorOrReadOnlyPermission]
        else:
            permission_classes = [IsAuthenticated, IsModeratorPermission]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Check if 'cover' is explicitly set to null in the request data
        picture_value = self.request.data.get('picture', None)
        if picture_value is None:
            # Set default cover image path
            default_picture_path = "default-avatar-icon-of-social-media-user-vector.jpg"
            serializer.validated_data['picture'] = default_picture_path

        # Continue with the normal create process
        serializer.save()


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsModeratorOrReadOnlyPermission]
        else:
            permission_classes = [IsAuthenticated, IsModeratorPermission]
        return [permission() for permission in permission_classes]


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

    def get_permissions(self):
        # Apply IsModeratorPermission for all actions except list and retrieve
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsModeratorOrReadOnlyPermission]
        else:
            permission_classes = [IsAuthenticated, IsModeratorPermission]
        return [permission() for permission in permission_classes]


class ReviewIdByBookIdView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, book_id):
        user = request.user
        review = BookReview.objects.filter(user=user, book=book_id).first()

        if review:
            serializer = BookReviewSerializer(review)  # Use your serializer
            review_data = serializer.data
            return Response(review_data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Review not found.'}, status=status.HTTP_404_NOT_FOUND)


class BookReviewViewSet(viewsets.ModelViewSet):
    queryset = BookReview.objects.all()
    serializer_class = BookReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.is_valid()
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        user = self.request.user
        book_id = request.data.get('book', None)  # Assuming the book ID is provided in the request data

        # Ensure book ID is provided in the request
        if not book_id:
            return Response({'detail': 'Book ID is required in the request data.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check if a review exists for the given user and book
        review = BookReview.objects.filter(user=user, book=book_id).first()

        if not review:
            return Response({'detail': 'Review not found.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # If a review exists, update it
        serializer = self.get_serializer(review, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        review = self.get_object()
        user = self.request.user

        # Check if the user is the author of the review or a moderator
        if user.is_moderator or review.user == user:
            self.perform_destroy(review)
            return Response({'detail': 'Review deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You do not have permission to delete this review.'},
                            status=status.HTTP_403_FORBIDDEN)
