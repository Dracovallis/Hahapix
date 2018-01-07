import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MemeServiceService } from '../../../services/meme-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StorageService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {


  searchForm: FormGroup;
  post: any;

  constructor(private ms: MemeServiceService,
    private fb: FormBuilder,
    private ss: StorageService) {
    this.searchForm = fb.group({
      'search': [null]
    })
  }

  ngOnInit() {
  }

  searchMemes(post) {
    this.ms.getSearchedMemes().subscribe(
      data => {
        this.searchSuccess(data, post['search']);
      },
      error => { this.searchError(error) }
    );
  }

  searchSuccess(data, search) {
    let filteredMemes = [];

    data.forEach(element => {
      if (element['title'].toUpperCase().includes(search.toUpperCase())) {
        filteredMemes.push(element);
      }
    });
    this.ss.getMemes(filteredMemes);
  }

  searchError(error) {
    console.log(error);
  }

}
