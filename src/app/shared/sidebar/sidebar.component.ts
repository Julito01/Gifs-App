import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @ViewChild('searchWord') searchWord!: ElementRef<HTMLAnchorElement>;

  constructor(private gifService: GifsService) {}

  get searchs(): string[] {
    return this.gifService.history;
  }

  searchGif(query: string): void {
    this.gifService.searchGifs(query);
  }

  ngOnInit(): void {}
}
