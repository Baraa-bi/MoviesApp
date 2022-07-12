import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Award, Movie } from '../movie/movie.component';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  #movieForm!: FormGroup;
  submitted: boolean = false;

  get movieId() {
    return this._activatedRoute.snapshot.params['movieId'];
  }

  get movieForm() {
    return this.#movieForm;
  }

  get awards(): FormArray {
    return this.#movieForm.get('awards') as FormArray;
  }

  get movieFormControls() {
    return this.#movieForm.controls
  }

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _moviesService: MoviesService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  getMovie() {
    if (this.movieId?.length)
      this._moviesService.getMovie(this.movieId).subscribe({
        next: (movie: Movie) => {
          movie.awards.forEach((award: Award) => {
            this.awards.push(this._formBuilder.group({
              title: award.title,
              year: award.year
            }))
          })
          this.#movieForm = this._formBuilder.group({
            title: [movie.title, Validators.required],
            image: [movie.image, Validators.required],
            description: [movie.description, Validators.required],
            numberOfDirectors: [movie.numberOfDirectors, Validators.required],
            awards: this.awards
          });
        },
      });
  }

  ngOnInit(): void {
    this.getMovie();
    this.#movieForm = this._formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      description: ['The lorem ipsum is based on De finibus bonorum et malorum, a Latin text written by Cicero in 45 BC. Typographers and printers have used passages from this work for formatting since the 16th century. Many words have been added or modified over the centuries. As a result, the lorem ipsum is no longer considered Latin, even though it looks a lot like it.', Validators.required],
      numberOfDirectors: [null, Validators.required],
      awards: this._formBuilder.array([]),
    });
  }


  onAddMovie(): void {
    this.submitted = true
    if (this.#movieForm.valid) {
      if (this.movieId) {
        this._moviesService
          .updateMovie(this.movieId, this.#movieForm.value)
          .subscribe({
            next: () => {
              this._router.navigate(['movie/' + this.movieId]);
            },
          });
      } else
        this._moviesService.addMovie(this.#movieForm.value).subscribe({
          next: (movie: Movie) => {
            this._router.navigate(['movie/' + movie._id]);
          },
        });
    }
  }

  addAward() {
    const awardForm = this._formBuilder.group({
      title: 'Oscar award',
      year: '2021',
    });
    this.awards.push(awardForm);
  }

  deleteAward(awardIndex: number) {
    this.awards.removeAt(awardIndex);
  }
}
