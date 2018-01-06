import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'HaHa Pix';
  username = "";

  constructor( private authService: AuthenticationService) { 
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
  }

}
