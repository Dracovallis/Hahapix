import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserInfo: Object;
  createForm: FormGroup;
  post: any;

  username: string = "";
  address: string = "";
  email: string = "";
  avatar: string = "";
  firstName: string = "";
  lastName: string = "";
  twitter: string = "";
  facebook: string = "";
  google: string = "";

  regexPatterns = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    imageUrl: /https?:\/\/.*\.(?:png|jpg)[?]?[\w=&]*/i,
    facebook: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/i,
    twitter: /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i,
    google: /http(?:s)?:\/\/(?:www\.)?plus.google\.com\/([a-zA-Z0-9_]+)/i
  }


  constructor(private as: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private _service: NotificationsService
  ) {
    this.createForm = this.fb.group({
      'avatar': [null, Validators.pattern(this.regexPatterns.imageUrl)],
      'address': [null],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.regexPatterns.email)])],
      'firstName': [null],
      'lastName': [null],
      'facebook': [null, Validators.pattern(this.regexPatterns.facebook)],
      'twitter': [null, Validators.pattern(this.regexPatterns.twitter)],
      'google': [null, Validators.pattern(this.regexPatterns.google)]
    })
  }

  ngOnInit() {
    let editUserName = this.route.snapshot.paramMap.get('username');

    this.as.getUser(editUserName).subscribe(
      data => {
        this.editUserInfo = data[0]
        this.getUserSuccess(data)
      },
      error => {
        this.creationError(error)
      }
    )


  }

  onSubmit(post) {
    this.username = post.username;
    this.address = post.address;
    this.email = post.email;
    this.firstName = post.firstName;
    this.lastName = post.lastName;
    this.facebook = post.facebook;
    this.twitter = post.twitter;
    this.google = post.google;
    this.avatar = post.avatar;


    let id = (this.editUserInfo['_id']);

    let user = {
      username: post.username,
      address: post.address,
      email: post.email,
      avatar: post.avatar,
      firstName: post.firstName,
      lastName: post.lastName,
      facebook: post.facebook,
      twitter: post.twitter,
      google: post.google,
      isAdmin: this.editUserInfo['isAdmin']
    }
    this.as.editUser(id, user).subscribe(
      data => { this.editSuccess(data) },
      error => { this.creationError(error) }
    )
  }

  getUserSuccess(data) {

    this.createForm.patchValue(
      {
        username: data[0].username,
        avatar: data[0].avatar,
        address: data[0].address,
        email: data[0].email,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        facebook: data[0].facebook,
        twitter: data[0].twitter,
        google: data[0].google
      })

  }

  editSuccess(data) {
    if (this.editUserInfo['username'] == localStorage.getItem('username')) {
      this.authService.authtoken = data['_kmd']['authtoken'];
      localStorage.setItem('authtoken', data['_kmd']['authtoken']);
      localStorage.setItem('username', data.username);
      this._service.success('Success', 'User edited successfully')

    }
    this.router.navigate(['/users/' + data.username])
  }

  creationError(error) {
    this._service.error('Error', 'Cannot edit user')
  }

}
