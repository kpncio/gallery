import { Directive, Input, OnInit } from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

@Directive({
  selector: '[ngTrip]'
})
export class TripDirective implements OnInit {
  lightboxHead = new PhotoSwipeLightbox({
    gallery: '#gallery--head a',
    pswpModule: PhotoSwipe
  });

  lightboxMain = new PhotoSwipeLightbox({
    gallery: '#gallery--main',
    children: 'a',
    pswpModule: PhotoSwipe
  });
  
  @Input() ngTrip: boolean = false;

  ngOnInit() {
    if (this.ngTrip) {
      this.lightboxHead.init();
    } else {
      this.lightboxMain.init();
    }
  }
}
