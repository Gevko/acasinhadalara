// video.component.ts
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: 'video-player.html',
  styleUrls:['video-player.scss']
})
export class VideoPlayerComponent {

  constructor() { }
}