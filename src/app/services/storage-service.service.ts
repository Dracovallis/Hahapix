import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class StorageService {
  @Output() searchedMemes: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() changeUsername: EventEmitter<Object> = new EventEmitter<Object>();

  public memes: Object = {};

  constructor() {
  }

  public renameUser(username) {
    this.changeUsername.emit(username)
  }

  public getMemes(memes: Object): void {
    this.memes = memes;
    this.searchedMemes.emit(memes)
  }

  

}
