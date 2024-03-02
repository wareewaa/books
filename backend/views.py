from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
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

        # Check if both username and password are provided
        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(username=username, password=password)

        # Check if authentication is successful
        if user:
            # Delete existing tokens for the user
            Token.objects.filter(user=user).delete()
            # Generate a new token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': UserSerializer(user).data})
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class LoggedUserDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # request.user will be the authenticated user
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class BookReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = BookReviewSerializer

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
    serializer_class = BookReviewSerializer

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


class ProfileView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'


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
    ordering_fields = ['rating', 'published_date']
    search_fields = ['title', 'author__name']


class BookQuickSearchViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    filter_backends = [SearchFilter]
    search_fields = ['title']


class AuthorQuickSearchViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    filter_backends = [SearchFilter]
    search_fields = ['name']


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
# def perform_create(self, serializer):
#     # Set the book instance when creating a new review
#     book_id = self.kwargs.get('id')
#     serializer.save(author_id=author_id)
