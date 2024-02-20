from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    is_moderator = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='user_profile_pics/', null=True, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.username


class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    biography = models.TextField()
    picture = models.ImageField(upload_to='author_pics/', null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre)
    published_date = models.DateField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.FloatField(default=0.0)
    cover = models.ImageField(upload_to='book_cover_pics/', null=True, blank=True)

    def __str__(self):
        return self.title


class BookReview(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.book.title} Review"

