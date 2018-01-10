import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  memes: Object = {}

  constructor(private ss: StorageService
  ) {
    this.ss.searchedMemes.subscribe(data => {

      this.memes = data

    })
  }

  ngOnInit() {

  }


  creationSuccess(data) {

  }

  creationError(error) {

  }
}
