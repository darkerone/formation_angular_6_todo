import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private queue: Subject<string> = new Subject<string>();

  public queue$: Observable<string> = this.queue.asObservable();

  constructor() { }

  public addMessage(message: string) {
    this.queue.next(message);
  }
}
