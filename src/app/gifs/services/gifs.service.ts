import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'fqgHzpm4wej3elMG8SN1Gj1310NuTqB2';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 7);
    }

    this.http
      .get<GifsResponse>(
        `${this.apiUrl}?api_key=${this.apiKey}&q=${query}&limit=30`
      )
      .subscribe((response) => {
        console.log(response.data);
        this.results = response.data;
      });

    console.log(this._history);
  }
}
