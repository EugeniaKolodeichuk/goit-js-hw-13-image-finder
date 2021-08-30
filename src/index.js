import './sass/main.scss';
import photoCardsTpl from './template.hbs';
import { alert, error, defaultModules, success } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import refs from "./refs.js";
//import '../node_modules/basiclightbox/dist/basiclightbox.min.css'
import { onGalleryClick } from './modal.js'
let currentPage = 1;
const KEY_API = '23070790-299ad5e8dfdc75cc527267990';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'


const handlerSubmit = (e) => {
  e.preventDefault();
  const value = refs.input.value;
  
  fetch(`${BASE_URL}&q=${value}&page=${currentPage}&per_page=12&key=${KEY_API}`)
  .then(response => response.json())
  .then(photo =>
    {
    if (photo.hits.length === 0) {
      return  error({
        text: 'Incorrect data. Please enter your request again',
        delay: 2000,
      });
    } else renderPhoto(photo.hits);
    //refs.loadMore.scrollIntoView({behavior: 'smooth',block: 'end'});
    loadMoreSkroll()
    
    
    })
  .then(() => currentPage++)
      .catch(err => {
          defaultModules.set(PNotifyMobile, {});
      clearPhotoUl ()
  error({
  text: '404 Not found'
});})
}

function loadMoreSkroll() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 200);
  } catch (error) {
      clearPhotoUl ()
    console.log(error);
  }
}

refs.searchForm.addEventListener('submit', handlerSubmit)
refs.loadMore.addEventListener('click', handlerSubmit)



function renderPhoto (photo) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardsTpl(photo))
    refs.loadMore.classList.replace("load-more_hide", "load-more_visible");
    refs.gallery.addEventListener('click', onGalleryClick);
  }
  
function clearPhotoUl () {
      refs.gallery.innerHTML = '';
  }

