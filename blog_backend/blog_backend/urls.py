from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    # Rest
    path('api-auth/', include('rest_framework.urls')),
    # Api
    path('api/', include('api.urls')),
]