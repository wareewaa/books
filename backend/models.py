from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


class User(AbstractUser):
    is_moderator = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='user_profile_pics/', default="default-avatar-icon-of-social-media-user-vector.jpg")
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.username


class Author(models.Model):
    name = models.CharField(max_length=100)
    biography = models.TextField()
    picture = models.ImageField(upload_to='author_pics/', default="default-avatar-icon-of-social-media-user-vector.jpg")

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre)
    summary = models.TextField(null=True)
    pages = models.IntegerField(default=1)
    published_date = models.DateField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    rating = models.FloatField(default=0.0)
    rating_amount = models.IntegerField(default=0)
    cover = models.ImageField(upload_to='book_cover_pics/', default="default cover.jpg", null=True)

    def __str__(self):
        return self.title


class BookReview(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    review_text = models.TextField(blank=True)
    rating = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.book.title} Review"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'book'], name='unique_review_per_book')
        ]


class CustomList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    books = models.ManyToManyField(Book)

    def __str__(self):
        return self.name

