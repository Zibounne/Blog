from rest_framework import viewsets

from api.articles.models import Article
from api.articles.serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer