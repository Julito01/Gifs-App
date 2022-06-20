import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

  search(): void {
    const value = this.txtSearch.nativeElement.value;
    this.gifService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
