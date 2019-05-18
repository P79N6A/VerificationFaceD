import { TestBed } from '@angular/core/testing';

import { RxSpeechRecognitionService } from './rx-speech-recognition.service';

describe('RxSpeechRecognitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxSpeechRecognitionService = TestBed.get(RxSpeechRecognitionService);
    expect(service).toBeTruthy();
  });
});
