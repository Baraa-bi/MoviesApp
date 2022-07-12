import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './movie/movie.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _http: HttpClient) { }

  getMovies(page: number) {
    const url = environment.movies_base_url + `?page=${page}`;
    return this._http.get<Movie[]>(url);
  }
  getMoviesPageCount() {
    const url = environment.movies_base_url + '/count'
    return this._http.get<number>(url);
  }
  getMovie(movieId: String) {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.get<Movie>(url);
  }
  addMovie(data: String) {
    const url = environment.movies_base_url;
    return this._http.post<Movie>(url, data);
  }
  updateMovie(movieId: string, data: String) {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.patch<Movie>(url, data);
  }
  deleteMovie(movieId: String) {
    const url = `${environment.movies_base_url}/${movieId}`;
    return this._http.delete(url);
  }
}
