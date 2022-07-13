import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Movie } from '../movie/movie.component';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.css']
})
export class MoviesSearchComponent implements OnInit {

  #searchForm!: FormGroup;

  movies!: Movie[];
  #page: number = 1;
  #totalPages: number = 1;

  constructor(private moviesService: MoviesService, private _router: Router, private _formBuilder: FormBuilder) { }

  get page() { return this.#page }
  set page(page) { this.#page = page }

  get totalPages() { return this.#totalPages }
  set totalPages(totalPages) { this.#totalPages = totalPages }


  get searchForm() {
    return this.#searchForm
  }

  get movieTitle() {
    return this.#searchForm.value['movieTitle']
  }

  getTotalResults = (): number => {
    return this.totalPages * +environment.find_count
  }

  getMovies = () => {
    this.moviesService.getMovies(this.page, this.movieTitle).subscribe({
      next: (movies: Movie[]) => this.movies = movies
    })
  }

  getMoviesPageCount = () => {
    this.moviesService.getMoviesPageCount(this.movieTitle).subscribe({
      next: (totalPages: number) => this.totalPages = totalPages
    })
  }

  ngOnInit(): void {
    this.#searchForm = this._formBuilder.group({
      movieTitle: ''
    })
  }

  onMovieClick(movieId: string) {
    this._router.navigate(['movie/' + movieId]);
  }

  onSearchClick() {
    this.getMoviesPageCount();
    this.getMovies();
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
      this.getMovies();
    }
  }

}
