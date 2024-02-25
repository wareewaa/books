from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def list_view(request):
    objects = Book.objects.all()
    return render(request, 'list.html', {'objects': objects})


# @api_view(['POST'])
# def register(request):
#     serializer = UserRegisterSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


# @api_view(['POST'])
# def user_login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         login(request, user)
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key})
#     return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
#
# #
# @api_view(['POST'])
# def user_logout(request):
#     logout(request)
#     return Response({'message': 'Successfully logged out'})


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


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'

# def get_book_by_id(request, book_id):
#     try:
#         book = Book.objects.get(id=book_id)
#         data = {
#             'title': book.title,
#             'author': book.author.name,
#             'genres': [genre.name for genre in book.genres.all()],
#             'published_date': book.published_date,
#             'publisher': book.publisher.name,
#             'price': str(book.price),
#             'rating': book.rating,
#             'cover': book.cover.url if book.cover else None,
#             'summary': book.summary,
#             'pages': book.pages,
#             'author_bio': book.author.biography,
#             'author_pic': book.author.picture.url if book.author.picture else None,
#         }
#         response = JsonResponse(data)
#         return response
#     except Book.DoesNotExist:
#         return JsonResponse({'error': 'Book not found'}, status=404)
