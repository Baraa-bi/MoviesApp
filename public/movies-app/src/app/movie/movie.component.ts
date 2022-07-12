import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MoviesService } from '../movies.service';

export class Award {
  _id!: string;
  title!: string;
  year!: Date
}

export class Movie {
  _id!: string;
  title!: string;
  image!: string;
  description!: string;
  numberOfDirectors!: number;
  awards!: [Award]
}


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})

export class MovieComponent implements OnInit {

  movie!: Movie;

  constructor(
    private _router: Router,
    private _authenticationService:AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _moviesService: MoviesService
  ) { }

  get movieId() {
    return this._activatedRoute.snapshot.params['movieId'];
  }

  getMovie() {
    this._moviesService.getMovie(this.movieId).subscribe({
      next: (movie: Movie) => (this.movie = movie),
    });
  }

  onDeleteMovie() {
    this._moviesService.deleteMovie(this.movieId).subscribe({
      next: () => this._router.navigate(['movies'])
    });
  }

  onUpdateMovie() {
    this._router.navigate(['updateMovie/' + this.movie._id]);
  }

  ngOnInit(): void {
    this.getMovie();
  }


  get isLoggedIn() {
    return this._authenticationService.isLoggedIn
  }
}
