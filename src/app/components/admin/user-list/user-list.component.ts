import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() user: Object = {};

  constructor(private us: UserService) { }

  ngOnInit() {
  }

  deleteUser(id) {
    this.us.deleteUser(id).subscribe(data => {
      this.success(data)
    }, error => {
      this.error(error)
    })
  }

  success(data) {

  }

  error(data) {

  }
}


