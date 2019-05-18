import { Component, ViewChild, AfterViewInit, Injector, Inject, PLATFORM_ID, Renderer2, } from '@angular/core';
declare var require: any;
import * as RecordRTC from 'recordrtc';
let RecordRTC = require('recordrtc/RecordRTC.min');
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');
declare var webkitSpeechRecognition: any;
// import * as faceDetection from 'faceDetection';
declare var jQuery:any;
declare var $ :any;
// const path = require('path')?
// const fs = require('fs')
// const fr = require('face-recognition')

// import * as fr = require('face-recognition');

// const detector = new fr.FrontalFaceDetector();
// const face5LandmarkPredictor = fr.FaceLandmark5Predictor();
// const face68LandmarkPredictor = fr.FaceLandmark68Predictor();

// const img = fr.loadImage('../../data/Lenna.png');
// const faceRects = detector.detect(img);
// const shapes5 = faceRects.map((rect) => face5LandmarkPredictor.predict(img, rect));
// console.log('5 face landmarks:');
// console.log(shapes5);

// const win1 = new fr.ImageWindow();
// win1.setImage(img);
// win1.renderFaceDetections(shapes5);

// const shapes68 = faceRects.map((rect) => face68LandmarkPredictor.predict(img, rect));
// console.log('68 face landmarks:');
// console.log(shapes68);

// const win2 = new fr.ImageWindow();
// win2.setImage(img);
// win2.renderFaceDetections(shapes68);

// fr.hitEnterToContinue();

@Component({
  selector: 'record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss'],
})

export class RecordRTCComponent implements AfterViewInit{

  private stream: MediaStream;
  private recordRTC: any;
  @ViewChild('video') video:any;
  @ViewChild('gSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;

  constructor() {
    // Do stuff
  
    this.startRecording();
    // this.speech.start();
    // this.voiceSearch()
    
  }

  // const image1 = fr.loadImage('./src/assets/images/image1.jpg');
  

  voiceSearch(){
  // alert(1);
  if('webkitSpeechRecognition' in window){
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = true;
      vSearch.interimresults = true;
      vSearch.lang = 'en-US';
  
      const voiceSearchForm = this.formSearch.nativeElement;
      var voiceHandler = this.hiddenSearchHandler.nativeElement;
      vSearch.start();
      vSearch.onresult = function(e){
        voiceHandler.value += e.results[0][0].transcript;
        // console.log(voiceSearchForm);
        // if (typeof(e.results) == 'undefined') {
        //   vSearch.onend = null;
        //   vSearch.stop();
        //   // upgrade();
        //   return;
        // }
      //   for (var i = e.resultsIndex; i < e.results.length; ++i){
      //     if(e.results[i].isFinal){
      //       voiceHandler.value += e.results[i][0].transcript;
      //       console.log(voiceHandler.value);
      //        }
      //         else{
      //       voiceHandler.value = e.results[i][0].transcript;
      //       }
      // }
          // vSearch.stop();

          console.log(voiceHandler);
          // voiceSearchForm.submit();
      }

      vSearch.onerror = function(e){
          console.log(e);
          vSearch.stop();
      }
  } else {
    // console.log(this.state.get(configKey, undefined as any));
    }
  }
  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = true;
    video.controls = false;
    video.autoplay = true;
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }
  
  
  errorCallback() {
    //handle error here
  }
  startRecording() {
    let mediaConstraints = {
      video: {}, audio: true
    };
    // alert(123);
    
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));      
  }
  successCallback(stream: MediaStream) { 
      
    var options = {
      mimeType: 'video/webm\;codecs=vp9',//;codecs=h264 //or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      // bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    // this.toggleControls();
  }

  
  stopRecording(blobURL) {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    console.log("audio",stream.getAudioTracks());
    stream.getVideoTracks().forEach(track => track.stop());
    console.log("video",stream.getVideoTracks())
    let blob = recordRTC.getBlob();

    console.log("blob",blob);
    
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    console.log("video SRC",video.src);
    var recordedBlob = recordRTC.getBlob();
    console.log("video blob",recordedBlob);
    var reader = new FileReader();
    reader.readAsDataURL(recordedBlob); 
    reader.onloadend = function() {
    let base64data = reader.result;                
    console.log("base64data",base64data);
    }
    recordRTC.getDataURL(function (dataURL) {
      // console.log("data url",dataURL);
      
     });
  }

  download() {
    this.recordRTC.save('video.webm');
  }
  
}
// window.onload = function() {
//   jQuery("video").each(function() {
//     var img = this;
//     // Get faces cooridnates
//     var coordinates = jQuery(img).faceDetection();
//     // Make boxes if faces are found
//     if(coordinates.length) {
//       coordinates.forEach(function(coord) {
//         jQuery("<div>", {
//           css: {
//             position: "absolute",
//             left: coord.positionX + 5 + "px",
//             top: coord.positionY + 5 + "px",
//             width: coord.width + "px",
//             height: coord.height + "px",
//             border: "3px solid red"
//           }
//         }).appendTo(img.parentNode);
//       });
//     }
//   });
// };

// let coords = $("#picture").faceDetection({
// 	complete: function(image, coords) {
// 		// Do something
// 	},
// 	error: function() {
// 		console.warn("Could not process image");
// 	}
// });
// $('#picture').faceDetection({
//   complete: function (faces) {
//       console.log(faces);
//   }
// })
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);
} 
function displayLocationInfo(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;
  console.log(`longitude: ${ lng } | latitude: ${ lat }`);
}
// voice command
export class voicecommand {
  public title : string;
  // @ViewChild('gSearch') formSearch;
  // @ViewChild('searchKey') hiddenSearchHandler;
  constructor(
    
    private injector: Injector,
    private state : TransferState,
    @Inject(PLATFORM_ID) private platformid: Object,
    private renderer: Renderer2
    
  ){
    if(isPlatformServer(this.platformid)){
      const envJson = this.injector.get('CONFIG')? this.injector.get('CONFIG'): {};
      this.state.set(configKey, envJson as any);
      console.log("platform",this.platformid);
  }
}

}