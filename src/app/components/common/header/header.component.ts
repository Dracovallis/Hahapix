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
  isAdmin = false;

  constructor(private authService: AuthenticationService, private ss: StorageService) {
    this.username = localStorage.getItem('username');

    this.ss.changeUsername.subscribe(data => {
      this.username = data;
      this.isAdmin = false;

      if (this.username) {
        this.authService.getUser(this.username).subscribe(data => {
          this.isAdmin = data[0]['isAdmin']
        }, error => { })
      }
    })
  }

  ngOnInit() {
    if (this.username) {
      this.authService.getUser(this.username).subscribe(data => {
        this.isAdmin = data[0]['isAdmin']
      })
    }
  }

}
