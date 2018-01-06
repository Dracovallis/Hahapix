import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userInfo: Object;
  currentUser = localStorage.getItem('username');

  constructor(private as: AuthenticationService,private route: ActivatedRoute) { }

  ngOnInit() {
    let username  = this.route.snapshot.paramMap.get('username');
    this.userInfo = this.as.getUser(username).subscribe(
      data => {
        this.userInfo = data
        this.success(data)
      },
      error => {
        this.creationError(error) 
      }
    )
  }


  success(data) {
    console.log(data)
  }

  creationError(error) {
    console.log(error);
  }

}
