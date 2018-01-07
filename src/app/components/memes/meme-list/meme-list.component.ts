import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';
import { StorageService } from '../../../services/storage-service.service';


@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {
  memes: Object;

  constructor(private ms: MemeServiceService,
    private ss: StorageService) {
    this.ss.searchedMemes.subscribe(data => { 

      this.memes = data
      
     })
  }

  ngOnInit() {
    this.getFreshMemes();
  }

  getFreshMemes() {
    this.memes = this.ms.getFreshMemes().subscribe(
      data => {
        this.memes = data
        this.creationSuccess(data)
      },
      error => { this.creationError(error) }
    );
  }


  getHotMemes() {
    this.memes = this.ms.getHotMemes().subscribe(
      data => {
        this.memes = data
        this.creationSuccess(data)
      },
      error => { this.creationError(error) }
    );
  }

  getMemesByCategory(e, category) {
    console.log(category)
    this.memes = this.ms.getMemesByCategory(category).subscribe(
      data => {
        this.memes = data
        this.creationSuccess(data)
      },
      error => { this.creationError(error) }
    );
  }

  creationSuccess(data) {
    console.log(data);
  }

  creationError(error) {
    console.log(error);
  }
}
