import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommentService } from '../../../services/comment.service';
import { AuthenticationService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Output() deletedComment: EventEmitter<Object> = new EventEmitter<Object>();

  user: Object;
  checked = true;
  currentUsername = localStorage.getItem('username');
  currentUser = Object;
  
  @Input() comment: Object = {
    content: "",
    author: "",
    _kmd: "",
    images: []
  }

  constructor(private us: UserService,private as: AuthenticationService, private cs: CommentService) { }

  ngOnInit() {
    this.extractImages();
    this.user = this.us.getUser(this.comment['author']).subscribe(
      data => {
        this.user = data
        this.success(data)
      },
      error => { this.creationError(error) }
    );

    this.as.getUser(this.currentUsername).subscribe(
      data => {
        this.currentUser = data[0];
      }
    )
    
  }

  extractImages() {
    this.comment['images'] = []

    let m,
      rex = /https?:\/\/.*\.(?:png|jpg)[?]?[\w=&]*/g;

    while (m = rex.exec(this.comment['content'])) {
      this.comment['images'].push(m[0]);   
    }

    this.comment['filteredContent'] = this.comment['content'].replace(rex, "")

  }

  deleteComment(id) {
    var result = confirm("Want to delete?");
    if (result) {
        this.cs.deleteComment(id).subscribe(
          data => {
            this.deletedComment.emit()
            this.comment = data
            this.success(data)
          },
          error => { this.error(error) }
        );
    }
  }

  success(data) {
   
  }

  error(error) {

  }

  creationError(error) {

  }
}
