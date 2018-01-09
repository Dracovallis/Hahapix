import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';
import { StorageService } from '../../../services/storage-service.service';
import { AuthenticationService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {
  memes: Object;
  currentUser: Object;

  constructor(private ms: MemeServiceService,
    private ss: StorageService,
    private as: AuthenticationService) {
  }



  ngOnInit() {
    this.memes = this.ms.getFreshMemes().subscribe(
      data => {
        this.memes = data
        this.creationSuccess(data)
      },
      error => { this.creationError(error) }
    );
    
    if (localStorage.getItem('username')) {
      this.as.getUser(localStorage.getItem('username')).subscribe(
        data => {
          this.currentUser = data[0];

        }
      )
    }
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
