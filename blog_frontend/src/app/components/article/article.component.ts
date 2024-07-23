import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Article } from '../../models/articles/article';

import { ArticleService } from '../../services/articles/article/article.service';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SessionService } from '../../services/accounts/session/session.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './article.component.html',
})

export class ArticleComponent implements OnInit {

  /* ===================== Variables ===================== */

  articles: Article[] = [];
  newArticle: Article = { 
    title: '',
    content: '',
  };

  /* ==================== Constructor ==================== */

  constructor(
    private articleService : ArticleService,
    private sessionService: SessionService
  ) {}

  /* ====================== Methods ====================== */

  ngOnInit(): void {
    if (this.sessionService.isConnected()) {
      this.getArticles();
    } else {
      console.error('User not authenticated');
    }
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  createArticle(): void {
    if (this.sessionService.isConnected()) {
      if (this.newArticle.title && this.newArticle.content) {
        this.articleService.createArticle(this.newArticle).subscribe(
          data => {
            this.articles.push(data);
            this.newArticle = { title: '', content: '' };
          },
          error => {
            console.error('Error creating article:', error);
          }
        );
      } else {
        console.error('Please fill in both title and content fields.');
      }
    } else {
      console.error('User not authenticated');
    }
  }
  
}