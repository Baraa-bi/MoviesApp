import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../movie/movie.component';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService, private _router: Router) { }

  movies!: Movie[];
  #page: number = 1;
  #totalPages: number = 1;

  get page() { return this.#page }
  set page(page) { this.#page = page }

  get totalPages() { return this.#totalPages }
  set totalPages(totalPages) { this.#totalPages = totalPages }

  getTotalResults = (): number => {
    return this.totalPages * + environment.find_count
  }

  getMovies = () => {
    this.moviesService.getMovies(this.page).subscribe({
      next: (movies: Movie[]) => this.movies = movies
    })
  }

  getMoviesPageCount = () => {
    this.moviesService.getMoviesPageCount().subscribe({
      next: (totalPages: number) => this.totalPages = totalPages
    })
  }

  ngOnInit(): void {
    this.getMovies();
    this.getMoviesPageCount();
  }

  onMovieClick(movieId: string) {
    this._router.navigate(['movie/' + movieId]);
  }

  onNextPageClick() {
    if (this.page < this.totalPages) {
      this.page = this.page + 1;
      this.getMovies();
    }
  }

  onPreviousPageClick() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getMovies()
    }
  }

}
