import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MemeServiceService } from '../../../services/meme-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {

  createForm: FormGroup;
  post: any;

  title: string = "";
  imageUrl: string = "";
  category: string = "";
  nsfw: boolean = false;

  imageRegex = /https?:\/\/.*\.(?:png|jpg)[?]?[\w=&]*/i;


  constructor(private fb: FormBuilder,
    private ms: MemeServiceService,
    private router: Router) {
    this.createForm = fb.group({
      'title': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)])],
      'imageUrl': [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.imageRegex)]
      )],
      'category': ['animals', Validators.required],
      'nsfw': [false, ""]
    })

  }

  onSubmit(post) {
    this.title = post.title;
    this.imageUrl = post.imageUrl;
    this.category = post.category;
    this.nsfw = post.nsfw;

    let model = {
      title: post.title,
      imageUrl: post.imageUrl,
      category: post.category,
      nsfw: post.nsfw,
      thumbsUp: [],
      thumgsDown: [],
      viewCount: 0,
      author: localStorage.getItem('username'),
      rating: 0
    }
    this.ms.create(model).subscribe(
      data => { this.creationSuccess(data) },
      error => { this.creationError(error) }
    );
  }

  creationSuccess(data) {
    console.log(data);
    this.router.navigate(['/home'])
  }

  creationError(error) {
    console.log(error);
  }

  ngOnInit() {
  }

}
