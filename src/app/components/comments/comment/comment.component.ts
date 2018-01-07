import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Output() deletedComment: EventEmitter<Object> = new EventEmitter<Object>();

  user: Object;
  checked = true;
  currentUser = localStorage.getItem('username');
  
  @Input() comment: Object = {
    content: "",
    author: "",
    _kmd: "",
    images: []
  }

  constructor(private us: UserService, private cs: CommentService) { }

  ngOnInit() {
    this.extractImages();
    this.user = this.us.getUser(this.comment['author']).subscribe(
      data => {
        this.user = data
        this.success(data)
      },
      error => { this.creationError(error) }
    );
  }

  extractImages() {
    this.comment['images'] = []

    let m,
      rex = /https?:\/\/.*\.(?:png|jpg)[?]?[\w=&]*/g;

    while (m = rex.exec(this.comment['content'])) {
      this.comment['images'].push(m[0]);   
    }

    this.comment['filteredContent'] = this.comment['content'].replace(rex, "")
    //for (let url of this.comment['images']) {
    //  this.comment['content'] = this.comment['content'].replace(url, `<a target="_Blank" href="${url}">${url}<a/>`)
   // }
    

    console.log(this.comment['content'])
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
    console.log(error);
  }

  creationError(error) {
    console.log(error);
  }
}
