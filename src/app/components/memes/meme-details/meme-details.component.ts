import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MemeServiceService } from '../../../services/meme-service.service';

@Component({
  selector: 'app-meme-details',
  templateUrl: './meme-details.component.html',
  styleUrls: ['./meme-details.component.css']
})
export class MemeDetailsComponent implements OnInit {
  meme: Object;
  showRatingInfoDiv = false;

  id;
  username = localStorage.getItem('username');

  constructor(private ms: MemeServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');


    this.meme = this.ms.getMeme(this.id).subscribe(
      data => {
        this.meme = data
        this.success(data)
      },
      error => { this.creationError(error) }
    );
  }

  showRatingInfo(show) {
    
        this.showRatingInfoDiv = show;
      }

  like() {
    let memeModel = this.meme;

    this.ensureArraysExist(memeModel);


    if (memeModel['thumbsUp'].indexOf(this.username) == -1) {
      memeModel['thumbsUp'].push(this.username);
    }
    memeModel['thumgsDown'] = this.remove(memeModel['thumgsDown'], this.username)

    this.updateMemeRating(memeModel);

    this.ms.likeMeme(this.id, memeModel).subscribe(
      data => {
        this.success(data)
      },
      error => { this.creationError(error) }
    );

  }

  dislike() {
    let memeModel = this.meme;

    this.ensureArraysExist(memeModel);

    if (memeModel['thumgsDown'].indexOf(this.username) == -1) {
      memeModel['thumgsDown'].push(this.username);
    }
    memeModel['thumbsUp'] = this.remove(memeModel['thumbsUp'], this.username);
    this.updateMemeRating(memeModel);

    this.ms.dislikeMeme(this.id, memeModel).subscribe(
      data => {
        this.success(data)
      },
      error => { this.creationError(error) }
    );

  }

  updateMemeRating(memeModel) {
    memeModel['rating'] = memeModel['thumbsUp'].length - memeModel['thumgsDown'].length;
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }

    return array;
  }

  success(data) {
    console.log(data)
  }

  creationError(error) {
    console.log(error);
  }


  ensureArraysExist(memeModel) {
    if (!memeModel['thumbsUp']) {
      memeModel['thumbsUp'] = [];
    }

    if (!memeModel['thumgsDown']) {
      memeModel['thumgsDown'] = [];
    }
  }

}
