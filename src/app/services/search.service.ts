import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  messages: Message[];

  constructor() { }

  filterItems(searchTerm) {
    return this.messages.filter(msg => {
      return msg.body.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
