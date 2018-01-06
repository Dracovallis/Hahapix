import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  comments: Object;

  id;
  constructor(private cs: CommentService,  private route: ActivatedRoute) { }

  ngOnInit() {   
    this.getComments();
  }

  getComments() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.comments = this.cs.getComments(this.id).subscribe(
      data => {     
        this.comments = data     
         this.creationSuccess(data)
         },
      error => { this.creationError(error) }
    );
  }

  handleCommentSubmit(e) {
    this.getComments();
  }

  creationSuccess(data) {
    console.log(data);
  }

  creationError(error) {
    console.log(error);
  }

}
