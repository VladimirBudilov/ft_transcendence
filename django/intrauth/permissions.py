from rest_framework.permissions import BasePermission

class IsAuthToken(BasePermission):
    def has_permission(self, request, view):
        if (request.get('Authorization') != None):
            return True
        return False
