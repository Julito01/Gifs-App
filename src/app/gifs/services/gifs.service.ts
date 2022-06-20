import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'fqgHzpm4wej3elMG8SN1Gj1310NuTqB2';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
    // if (localStorage.getItem('history')) {
    //   this._history = JSON.parse(localStorage.getItem('history')!);
    // }
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 7);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '30');

    console.log(params.toString());

    this.http
      .get<GifsResponse>(`${this.apiUrl}/search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
