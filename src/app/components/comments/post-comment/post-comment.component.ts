import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
  @Output() submittedComment: EventEmitter<Object> = new EventEmitter<Object>();

  postForm: FormGroup;
  post: any;

  content: string = "";

  constructor(private fb: FormBuilder,
     private cs: CommentService, 
     private route: ActivatedRoute,
     private _service: NotificationsService) {
    this.postForm = fb.group({
      'content': [null, Validators.required]
    })
  }

  onSubmit(post) {
    this.content = post.content;

    let model = {
      content: post.content,
      author: localStorage.getItem('username'),
      memeId: this.route.snapshot.paramMap.get('id'),
    }
    this.cs.create(model).subscribe(
      data => { this.creationSuccess(data) },
      error => { this.creationError(error) }
    );
  }

  creationSuccess(data) {
    this.postForm.reset();
    this.submittedComment.emit();
  }

  creationError(error) {
    this._service.error('Error', 'Failed to post comment')
  }

  ngOnInit() {
  }

}
