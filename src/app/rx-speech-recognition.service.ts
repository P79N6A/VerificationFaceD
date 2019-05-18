import { Component } from '@angular/core';
import {
  RxSpeechRecognitionService,
  resultList,
} from '@kamiazya/ngx-speech-recognition';

@Component({
  selector: 'demo-rx',
  template: `
  <p>RxCompoent.message: {{message}}</p>
  <button
    [disabled]="service.started$ | async"
    (click)="listen()"
  >listen</button>
  <p>lang: ja</p>
  <p>grammars: none</p>
  `,
  styleUrls: ['./rx.component.css'],
  providers: [
    RxSpeechRecognitionService,
  ],
})
export class RxComponent {

  message = '';

  constructor(
    public service: RxSpeechRecognitionService,
  ) { }

  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

}