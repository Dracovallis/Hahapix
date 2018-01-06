import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userInfo: Object;
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

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$;/

  constructor(private as: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.createForm = this.fb.group({      
      'address': [null, Validators.required],
      'email': [null, Validators.compose([
        Validators.required, Validators.pattern(this.emailRegex)])],
      'firstName': [null],
      'lastName': [null],
      'facebook': [null],
      'twitter': [null],
      'avatar': [null]
    })
  }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get('username');
    this.userInfo = this.as.getUser(username).subscribe(
      data => {
        this.userInfo = data
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
    this.avatar = post.avatar;

    let id = localStorage.getItem('userId');

    let user = {
      username: post.username,
      address: post.address,
      email: post.email,
      avatar: post.avatar,
      firstName: post.firstName,
      lastName: post.lastName,
      facebook: post.facebook,
      twitter: post.twitter
    }
    this.as.editUser(id, user).subscribe(
      data => { this.editSuccess(data) },
      error => { this.creationError(error) }
    )
  }

  getUserSuccess(data) {
    console.log(data);
    this.createForm.patchValue(
      {         
          username: data[0].username,
          avatar: data[0].avatar,
          address: data[0].address,
          email: data[0].email,
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          facebook: data[0].facebook,
          twitter: data[0].twitter
      })
   
  }

  editSuccess(data) {
    console.log(data)
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data.username);

    this.router.navigate(['/users/' + data.username])
  }

  creationError(error) {
    console.log(error);
  }

}