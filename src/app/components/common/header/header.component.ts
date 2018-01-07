import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/auth.service';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'HaHa Pix';
  username = "";

  constructor( private authService: AuthenticationService, private ss: StorageService) { 
    this.username = localStorage.getItem('username');

    this.ss.changeUsername.subscribe(data => {
      this.username = data;
    })
  }

  ngOnInit() {
  }

}
