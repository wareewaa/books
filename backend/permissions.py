from rest_framework import permissions


class IsModeratorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a moderator
        return request.user and request.user.is_authenticated and request.user.is_moderator


class IsModeratorOrReadOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow GET requests without authentication
        if request.method in permissions.SAFE_METHODS:
            return True
        # Check if the user is a moderator for other methods
        return request.user and request.user.is_authenticated and request.user.is_moderator
