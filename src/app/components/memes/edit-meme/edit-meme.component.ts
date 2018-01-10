import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemeServiceService } from '../../../services/meme-service.service';

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.css']
})
export class EditMemeComponent implements OnInit {
  meme: Object;
  createForm: FormGroup;
  post: any;

  title: string = "";
  imageUrl: string = "";
  category: string = "";
  nsfw: boolean = false;

  imageRegex = /https?:\/\/.*\.(?:png|jpg)[?]?[\w=&]*/i;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ms: MemeServiceService) {
    this.createForm = fb.group({
      'title': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)])],
      'imageUrl': [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.imageRegex)]
      )],
      'category': [null, Validators.required],
      'nsfw': [false, ""]
    })
  }

  ngOnInit() {
    let memeId = this.route.snapshot.paramMap.get('id');    
    this.meme = this.ms.getMeme(memeId).subscribe(
      data => {
        this.meme = data
        this.getMemeSuccess(data)
      },
      error => {
        this.creationError(error)
      }
    )
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
      thumbsUp: this.meme['thumbsUp'],
      thumgsDown: this.meme['thumgsDown'],
      viewCount: this.meme['viewCount'],
      author: this.meme['author'],
      rating: this.meme['rating']
    }
    this.ms.edit(model, this.meme['_id']).subscribe(
      data => { this.editSuccess(data) },
      error => { this.creationError(error) }
    );
  }

  getMemeSuccess(data) {

    this.createForm.patchValue({
      title: data.title,
      imageUrl: data.imageUrl,
      category: data.category,
      nsfw: data.nsfw
    })

  }

  editSuccess(data) {


    this.router.navigate(['/home'])
  }

  creationError(error) {
 
  }

}
