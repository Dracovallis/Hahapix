import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MemeServiceService } from '../../services/meme-service.service';

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


  constructor(private fb: FormBuilder, private ms: MemeServiceService) {
    this.createForm = fb.group({
      'title': [null, Validators.required],
      'imageUrl': [null, Validators.required],
      'category': [null, Validators.required],
      'nsfw': [false,""]
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
  }

  creationError(error) {
    console.log(error);
  }

  ngOnInit() {
  }

}
