import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: Object;

  constructor(private us: UserService) { }

  ngOnInit() {
    this.us.getUsers().subscribe(data => {
      this.users = data;
    })
  }

}
