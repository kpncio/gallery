import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  template: '<video #target class="video-js" controls playsinline preload="metadata"></video>',
  styleUrl: './video.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target!: ElementRef;

  // https://videojs.com/guides/options
  @Input() options!: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      sources: {
          src: string,
          type: string,
      }[]
  };

  player!: videojs.Player;

  constructor() { }

  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady');
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}