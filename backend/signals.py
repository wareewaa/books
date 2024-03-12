from django.db.models.functions import Round
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Avg, Count
from backend.models import BookReview


@receiver(post_save, sender=BookReview)
@receiver(post_delete, sender=BookReview)
def update_book_rating(sender, instance, **kwargs):
    book = instance.book
    reviews = BookReview.objects.filter(book=book)

    # Calculate the average rating
    total_ratings = reviews.aggregate(total_ratings=Round(Avg('rating'), 2))['total_ratings']
    total_rating_amount = reviews.aggregate(total_rating_amount=Count('rating'))['total_rating_amount']
    # Update the Book model with the new average rating
    book.rating = total_ratings if total_ratings else 0.0
    book.rating_amount = total_rating_amount
    book.save()
    