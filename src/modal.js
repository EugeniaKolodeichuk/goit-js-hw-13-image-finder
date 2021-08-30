import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


export function onGalleryClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const imgSrc = e.target.src;
    const instance = basicLightbox.create(`<img src=${imgSrc} width="800" height="600">`);
    instance.show();
  }