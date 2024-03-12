from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(BookReview)
admin.site.register(User)
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(CustomList)
