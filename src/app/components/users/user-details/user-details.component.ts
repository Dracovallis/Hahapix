import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userInfo: Object = {};
  currentUser: Object = [];

  constructor(private as: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get('username');
    this.as.getUser(username).subscribe(
      data => {
        this.userInfo = data
        this.success(data)
      },
      error => {
        this.creationError(error)
      }
    )

    this.as.getUser(localStorage.getItem('username')).subscribe(
      data => {
        this.currentUser = data;
        this.success(data)
      },
      error => {
        this.creationError(error)
      }
    )
  }


  success(data) {

  }

  creationError(error) {
 
  }

}
