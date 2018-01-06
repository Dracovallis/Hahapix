import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user: Object;

  @Input() comment: Object = {
    content: "",
    author: "",
    _kmd: ""    
  }

  constructor(private us: UserService) { }

  ngOnInit() {
    this.user = this.us.getUser(this.comment['author']).subscribe(
      data => {
        this.user = data
        this.success(data)
      },
      error => { this.creationError(error) }
    );
  }

  success(data) {
    console.log(data)
  }

  creationError(error) {
    console.log(error);
  }
}
