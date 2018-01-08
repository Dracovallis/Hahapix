import { Component, OnInit, Input } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  showRatingInfoDiv = false;

  @Input() meme: Object = {
    title: "",
    imageUrl: "",
    author: "",
    _id: "",
    thumbsUp: [],
    thumgsDown: [],
    rating: 0
  }
  @Input() currentUser: Object = {};

  constructor(private ms: MemeServiceService) { }

  ngOnInit() {
 
  }

  deleteMeme(id) {
    var result = confirm("Want to delete?");
    if (result) {
      this.ms.deleteMeme(id).subscribe(
        data => {
          this.meme = data
          this.success(data)
        },
        error => { this.error(error) }
      );
    }
  }

  showRatingInfo(show) {

    this.showRatingInfoDiv = show;
  }

  success(data) {
    console.log(data)
  }

  error(error) {
    console.log(error);
  }

}
