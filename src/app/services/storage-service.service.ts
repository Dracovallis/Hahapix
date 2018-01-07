import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class StorageServiceService {
  @Output() searchedMemes: EventEmitter<Object> = new EventEmitter<Object>();

  public memes: Object = {};

  constructor() {
  }

  public getMemes(memes: Object): void {
    this.memes = memes;
    this.searchedMemes.emit(memes)
  }

  

}
