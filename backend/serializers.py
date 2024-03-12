from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    genres = serializers.StringRelatedField(many=True)
    publisher = PublisherSerializer()

    class Meta:
        model = Book
        fields = '__all__'


class AddBookSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True)

    class Meta:
        model = Book
        fields = '__all__'


class AddBookCoverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['cover']


# def validate(self, validated_data):
#     print(validated_data)
#     return validated_data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'profile_picture', 'bio', 'is_moderator']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")
            return user
        else:
            raise serializers.ValidationError("Invalid username or password.")


class BookReviewSerializer(serializers.ModelSerializer):
    # book = BookSerializer()
    # user = UserSerializer()

    class Meta:
        model = BookReview
        fields = '__all__'
        read_only_fields = ("user",)


class BookReviewListSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    user = UserSerializer()

    class Meta:
        model = BookReview
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class CustomUserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_moderator', 'profile_picture', 'bio']
