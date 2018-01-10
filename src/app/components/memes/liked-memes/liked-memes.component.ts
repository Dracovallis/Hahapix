import { Component, OnInit } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liked-memes',
  templateUrl: './liked-memes.component.html',
  styleUrls: ['./liked-memes.component.css']
})
export class LikedMemesComponent implements OnInit {
  memes: Object;

  constructor(private ms: MemeServiceService,private route: ActivatedRoute) { }

  ngOnInit() {
   
    let user = this.route.snapshot.paramMap.get('username');
    this.memes = this.ms.getMemesByUser(user).subscribe(
      data => {     
        this.memes = data     
         this.creationSuccess(data)
         },
      error => { this.creationError(error) }
    );
  }

  creationSuccess(data) {

  }

  creationError(error) {
  
  }

}
