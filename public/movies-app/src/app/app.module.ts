import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt'
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HeaderComponent } from './header/header.component';
import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    LoginComponent,
    MoviesComponent,
    HeaderComponent,
    RegisterComponent,
    MovieFormComponent,
    PageNotFoundComponent,
    FooterComponent,
    MoviesSearchComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'search',
        component: MoviesSearchComponent,
      },
      {
        path: 'movie/:movieId',
        component: MovieComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'newMovie',
        component: MovieFormComponent,
      },
      {
        path: 'updateMovie/:movieId',
        component: MovieFormComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ])
  ],
  providers: [
    {
      provide: JwtHelperService, useValue: JWT_OPTIONS
    },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
